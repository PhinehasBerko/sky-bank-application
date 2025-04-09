"use client"
import React from 'react'
import {Chart as ChartJS, ArcElement,Tooltip,Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement,Tooltip,Legend)
const DoughnutChart = ({accounts}:DoughnutChartProps) => {
  const accountNames = accounts.map((acc) => acc.name)
  const balances = accounts.map((acc) => acc.currentBalance)
    const data ={
        datasets:[
            {
                label: "Banks",
                data:balances,
                backgroundColor: ['#2231b3','#000ff3','#423eb1']

            }
        ],
        labels: accountNames
    }
  return (
    <div>
      <Doughnut 
      data={data}
      options={{
        cutout:'60%',
       
        plugins:{
            legend:{
                display: false
            }
        }}}/>  
    </div>
  )
}

export default DoughnutChart