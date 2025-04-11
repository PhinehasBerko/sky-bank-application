import React from 'react'

import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { getLoggedInUser } from '@/lib/Actions/user.actions'
import { getAccount, getAccounts } from '@/lib/Actions/bank.action'
import RecentTransactions from '@/components/RecentTransactions'

const Home = async({searchParams:{id, page}}:SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id})

  const currentPage = Number(page as string) || 1;
  
  if(!accounts) return; // don't return the home page
  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId})
  console.log({
    accountsData,
    account,
    accounts
  })
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
        <HeaderBox 
        title='Welcome'
        type='greeting'
        user={loggedIn?.firstName || "Guest"}
        subtext='Access and Management your Finance Effortlessly'
         />

         <TotalBalanceBox
          accounts ={accountsData}
          totalBanks ={accounts?.totalBanks}
          totalCurrentBalance ={accounts?.totalCurrentBalance} />
        </header>
        {/* RECENT TRANSACTIONS */}
        <RecentTransactions 
          accounts ={accountsData}
          transactions = {account?.transactions}
          appwriteItemId ={appwriteItemId}
          page = {currentPage}
          />
      </div>

      {/* RIGHT-SIDE NAVIGATIONS  */}
      <RightSideBar
        user ={loggedIn} 
        transactions ={accounts?.transactions}
        banks ={accountsData?.slice(0,2)} 
      />

    </section>
  )
}

export default Home