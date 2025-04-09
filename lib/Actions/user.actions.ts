"use server"

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
import { CountryCode, Products } from "plaid"
import { plaidClient } from "../plaid"

export  const signIn = async({email,password}:signInProps) =>{
    try {
        // Mutation / Database / data fetch
        const {account} = await createAdminClient()
        const response = await account.createEmailPasswordSession(email,password)
        
        return parseStringify(response)
    } catch (error) {
        console.error("Error",error)
    }
}

export  const signUp = async(userData:SignUpParams) =>{
    const { email, password, firstName, lastName } = userData;
    try {
        // Mutation / Database / data fetch
         const { account } = await createAdminClient();

        const newUserAccount =await account.create(
            ID.unique(), 
            email,
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
        
    } catch (error) {
        console.error("Error",error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
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
            client_name: user.name,
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