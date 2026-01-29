import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Linechart = () => {
      const[chart1Data, setChart1Data]=useState([{
        name: 'JAN',
        Total_Users: 4000,
        Total_Sales: 2400,
        amt: 2400,
      },
      {
        name: 'FEB',
        Total_Users: 3000,
        Total_Sales: 1398,
        amt: 2210,
      },
      {
        name: 'MARCH',
        Total_Users: 2000,
        Total_Sales: 9800,
        amt: 2290,
      },
      {
        name: 'APRIL',
        Total_Users: 2780,
        Total_Sales: 3908,
        amt: 2000,
      },
      {
        name: 'MAY',
        Total_Users: 1890,
        Total_Sales: 4800,
        amt: 2181,
      },
      {
        name: 'JUNE',
        Total_Users: 6390,
        Total_Sales: 3800,
        amt: 2500,
      },
      {
        name: 'JULE',
        Total_Users: 3490,
        Total_Sales: 1300,
        amt: 2100,
      },
      {
        name: 'AUG',
        Total_Users: 7890,
        Total_Sales: 4800,
        amt: 2181,
      },
      {
        name: 'SEP',
        Total_Users: 2390,
        Total_Sales: 3800,
        amt: 2500,
      },
      {
        name: 'OCT',
        Total_Users: 3490,
        Total_Sales: 4300,
        amt: 2100,
      },
      {
        name: 'NOV',
        Total_Users: 2000,
        Total_Sales: 9800,
        amt: 2290,
      },
      {
        name: 'DEC',
        Total_Users: 2780,
        Total_Sales: 3908,
        amt: 2000,
      },
    ]);
  return (
    <>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5 pb-0">
               <h2 className="text-[18px] font-[600]">Total Users and Sales</h2>
            </div>
            <div className="flex items-center gap-5 px-5 py-5 pt-1">
              <span className="flex items-center gap-1 text-[15px]">
                <span className="block w-[8px] h-[8px] rounded-full bg-green-600 "></span> Total Users</span>
    
                 <span className="flex items-center gap-1 text-[15px]">
                <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa] "></span> Total Sales</span>
            </div>
            <LineChart
               style={{ width: '100%', maxWidth: '1200px', height: '100%', maxHeight: '500px', aspectRatio: 1.618 }}
               responsive
               data={chart1Data}
               margin={{
                 top: 5,
                 right: 0, 
                 left: 0,
                 bottom: 5,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" stroke='none' />
               <XAxis dataKey="name" tick={{fontSize:12}} />
               <YAxis width="auto" tick={{fontSize:12}} />
               <Tooltip />
               <Legend />
               <Line type="monotone" dataKey="Total_Sales" stroke="#8884d8" activeDot={{ r: 8 }}  strokeWidth={3} />
               <Line type="monotone" dataKey="Total_Users" stroke="#82ca9d"  strokeWidth={3} />
              
            </LineChart>
        </div>
      
    </>
  )
}

export default Linechart
