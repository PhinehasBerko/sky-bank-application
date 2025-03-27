import React from 'react'

import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'

const Home = () => {
  const loggedIn = {firstName:"Phinehas",lastName:"Berko", email:"contact@skybank.org"}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
        <HeaderBox 
        title='Welcome'
        type='greeting'
        user='Phiny'
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
      banks ={[{},{}]} />

    </section>
  )
}

export default Home