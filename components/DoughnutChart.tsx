"use client"
import React from 'react'
import {Chart as ChartJS, ArcElement,Tooltip,Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement,Tooltip,Legend)
const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data ={
        datasets:[
            {
                label: "Banks",
                data:[1234,3214,5643],
                backgroundColor: ['#2231b3','#000ff3','#423eb1']

            }
        ],
        labels: ['Fidelity','UMB','GCB Bank']
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