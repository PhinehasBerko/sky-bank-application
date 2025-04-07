import React from 'react'

import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { getLoggedInUser } from '@/lib/Actions/user.actions'

const Home = async() => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
        <HeaderBox 
        title='Welcome'
        type='greeting'
        user={loggedIn?.name || "Guest"}
        subtext='Access and Management your Finance Effortlessly'
         />

         <TotalBalanceBox
          accounts ={[]}
          totalBanks ={1}
          totalCurrentBalance ={1375.00} />
        </header>
        {/* RECENT TRANSACTIONS */}
      </div>

      {/* RIGHT-SIDE NAVIGATIONS  */}
      <RightSideBar
      user ={loggedIn} 
      transactions ={[]}
      banks ={[{currentBalance:1400.50},{currentBalance:3000.60}]} />

    </section>
  )
}

export default Home