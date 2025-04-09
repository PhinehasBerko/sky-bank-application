"use server"

import {
    ACHClass,
    CountryCode,
    TransferAuthorizationCreateRequest,
    TransferCreateRequest,
    TransferNetwork,
    TransferType
} from 'plaid'

import { plaidClient } from '../plaid'
import { parseStringify } from '../utils'

// import {getTransactionsByBankId} from "./transaction.actions";
import {getBanks, getBank} from './user.actions'

// Get multiple bank accounts
export const getAccounts = async({userId}: getAccountsProps) =>{
    try {
        // get banks from db
        const banks = await getBanks({userId});
        const accounts  = await Promise.all(
            banks?.map(async(bank:Bank) =>{
                // get each account info from plaid
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const accountData = accountsResponse.data.accounts[0];

                // get institution info from plaid
                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                const account = {
                    id: accountData.account_id,
                    availableBalance :accountData.balances.available!,
                    currentBalance :accountData.balances.current!,
                    institutionId: institution.institution_id,
                    name: accountData.name,
                    mask : accountData.mask,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    shareableId: bank.sharableId,
                };
                return account;
            })
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total,account) =>{
            return total + account.currentBalance;
        },0);
        return parseStringify({data: accounts, totalBanks, totalCurrentBalance})
    } catch (error) {
        console.error("An error occurred while getting the account: ",error)
    }
}

// Get one bank account 
export const getAccount = async({appwriteItemId}: getAccountProps) =>{

}

// Get bank info
export const getInstitution = async() =>{

}