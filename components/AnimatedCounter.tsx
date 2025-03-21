"use client"
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount:number})  => {
  return (
    <div className='w-full'>
        <CountUp 
    start ={0} 
    end={amount} 
    decimals={2}
    prefix='GH$'
    duration={2.75}
    delay={1}/>
    </div>
  )
}

export default AnimatedCounter