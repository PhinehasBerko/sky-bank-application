"use server"

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { cookies } from "next/headers"
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils"
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid"
import { plaidClient } from "../plaid"
import { revalidatePath } from "next/cache"

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async({userId}: getUserInfoProps) =>{
    try {
        const { database} = await createAdminClient();
        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId',[userId])] // this is how we do data querying in appwrite
        )
        return parseStringify(user.documents[0])
    } catch (error) {
        console.log(error)
    }
}
export  const signIn = async({email,password}:signInProps) =>{
    try {
        // Mutation / Database / data fetch
        const {account} = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const user = await getUserInfo({userId: session.userId})
        
        return parseStringify(user)
    } catch (error) {
        console.error("Error",error)
    }
}

export  const signUp = async({password,...userData}:SignUpParams) =>{
    const { email, firstName, lastName } = userData;
    let newUserAccount;

    try {
        // Mutation / Database / data fetch
         const { account, database } = await createAdminClient();

        newUserAccount =await account.create(
            ID.unique(), 
            email,
            password, 
            `${firstName} ${lastName}`
        );
        if(!newUserAccount) throw new Error("Error creating user");
        
        const dwollaCustomerUrl  = await createDwollaCustomer({
            ...userData,
            type:'personal',

        })
        const dwollaCustomerId =extractCustomerIdFromUrl(dwollaCustomerUrl)

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl
            }
        )
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
        
    } catch (error) {
        console.error("Error",error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    const user = await getUserInfo({userId: result?.$id});
    return parseStringify(user)
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    // Handle error (e.g., user is not logged in or session has expired)
    return null;
  }
}

export const logoutAccount = async() => {
    try {
        const {account} = await createSessionClient();

    (await cookies()).delete("appwrite-session");
    await account.deleteSessions();
    } catch (error) {
        console.error("Error",error)
    }
}

export const createLinkToken = async(user: User) =>{
    try {
        const tokenParams = {
            user:{
                client_user_id: user.$id
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products:['auth'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[]

        }
        const response = await plaidClient.linkTokenCreate(tokenParams)
        return parseStringify({linkToken: response.data.link_token})
    } catch (error) {
        console.error(error)
    }
}

export const createBankAccount = async({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId,
}:createBankAccountProps) =>{
    try {
        const {database} = await createAdminClient();
        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId,
            }
        )
        return parseStringify(bankAccount)
    } catch (error) {
        console.error("Error creating bankAccount into the DB",error)
    }
}
export const exchangePublicToken = async({
    publicToken,
    user
}: exchangePublicTokenProps) =>{
    try {
        // Exchange public token for access token and item ID
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        })
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Get account information from Plaid using the access Token
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken
        })

        const accountData = accountsResponse.data.accounts[0]

        //create a proccessor token from Dwolla using the access token and account ID
        const request: ProcessorTokenCreateRequest ={
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum
        };

        const proccessorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = proccessorTokenResponse.data.processor_token;

        // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName : accountData.name
        })
        // if the funding source URL is not created, throw an error
        if(!fundingSourceUrl) throw Error;
        
        // Create a bank account using the user ID, item ID, account ID, 
        // access token, funding source URL, and sharable ID.
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id)
        })

        // Revalidate the path to reflect the changes
        revalidatePath("/")
        
        // Return a success message
        return parseStringify({
            publicTokenExchange:'complete'
        })
    } catch (error) {
        
       console.error("An error occurred while creating exchange  token",error) 
    }
}

export const getBanks = async({userId }: getBanksProps) =>{
    try {
        const { database} = await createAdminClient();
        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('userId',[userId])] // this is how we do data querying in appwrite
        )
        return parseStringify(banks.documents)
    } catch (error) {
        console.log(error)
    }
}
export const getBank = async({documentId }: getBankProps) =>{
    try {
        const { database} = await createAdminClient();
        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('$id',[documentId])] // this is how we do data querying in appwrite
        )
        return parseStringify(bank.documents[0])
    } catch (error) {
        console.log(error)
    }
}