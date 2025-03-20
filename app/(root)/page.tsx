import React from 'react'

import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const Home = () => {
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
          account ={[]}
          totalBanks ={1}
          totalCurrentBalance ={1375} />
        </header>
      </div>

    </section>
  )
}

export default Home