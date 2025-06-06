import Link from 'next/link'
import React from 'react'
import BankTabItem from './BankTabItem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankInfo from './BankInfo'

const RecentTransactions = ({
    accounts,
    transactions =[],
    appwriteItemId,
    page= 1
}:RecentTransactionsProps) => {
  return (
    <section className='recent-transactions'>
      <header className="flex items-center justify-between">
        <h2 className='recent-transactions-label'>
          Recent transaction
        </h2>
        <Link href={`/transaction-history/?id${appwriteItemId}`}
         className='view-all-btn'>
          View all
        </Link>
      </header>   
      <Tabs defaultValue ={appwriteItemId} className="w-full">
        <TabsList 
        className ="recent-transactions-tablist">
          {accounts?.map((account:Account) =>(
            <TabsTrigger key={account?.id} value={account.appwriteItemId}>
              <BankTabItem 
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId} />
            </TabsTrigger>
          ))}
        </TabsList> 
        {accounts.map((account: Account)=>(
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className='space-y4'>
              <BankInfo 
                account={account}
                appwriteItemId={appwriteItemId}
                type='full'
              />
            </TabsContent>
        ))}
      </Tabs>   
    </section>
  )
}

export default RecentTransactions