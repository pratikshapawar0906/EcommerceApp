import React, { useState } from 'react'
import AccountSidebar from '../../Component/AccountSidebar'
import Button from '@mui/material/Button'
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../Component/Badge';
import { FaAngleUp } from 'react-icons/fa';

const Orders = () => {
    const [isOpenOrderdProduct, setIsOpenedOrderdProduct]=useState(null);

    const isShowOrderedProduct=(index)=>{
        setIsOpenedOrderdProduct(  isOpenOrderdProduct === index ? null : index)
    }

  return (
    <>
     <section className="py-10 w-full">
        <div className="container  flex  gap-5">
            <div className="col1 w-[20%]">
              <AccountSidebar/>
            </div>

            <div className="col2 w-[80%]">
                <div className="shadow-md rounded-md  bg-white">
                  <div className="py-3 px-3 boder-b-1 border-[rgba(0,0,0,0.1)]">
                    <h2 className="font-[600]">My Orders</h2>
                    <p className="mt-0">There are <span className="font-bold text-[#ff5252]">2</span>{" "}Orders in your List</p>

                    <div className="relative overflow-x-auto mt-5">
                         <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gary-400 ">
                                 <tr>
                                     <th scope="col" className="px-6 py-3 font-medium">
                                            &nbsp;
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Order Id
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Payment Id
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Product
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Name
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Phone Number
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Address
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Pincode
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap" >
                                        Total Amount
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Email
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        user Id
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Order  Status
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Date
                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr className="bg-neutral-primary border-b border-default">
                                    <th  className="px-6 py-4 font-[500]">
                                     
                                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]'onClick={()=>isShowOrderedProduct(0)}>
                                            {
                                                isOpenOrderdProduct === 0 ?  <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : 
                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            }
                                            </Button>
                                     </th>
                                     <th  className="px-6 py-4 font-[500]">
                                         <span className="text-[#ff5252]">5379464hdy78bd689hf74 </span> 
                                     </th>
                                     <td className="px-6 py-4 font-[500]">
                                         pay_PtubdhExThx
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         Click here to view
                                     </td>
                                     <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                        ABC XYZ
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         9737927987
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="block w-[400px]">hjjjdbdh jujfm ieiikee india</span> 
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         493076
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        3000
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         abc@example.com
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-[#ff5252]"> 23163h7d747db47</span>
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                       <Badge status="pending"/>
                                     </td>
                                      <td className="px-6 py-4 font-[500]  whitespace-nowrap ">
                                         2024-12-04
                                     </td>
                                 </tr>
                                 {
                                    isOpenOrderdProduct === 0 &&  (
                                     <tr className="bg-gray-50">
                                       <td colSpan="6" className='p-0'>
                                         <div className="relative overflow-x-auto">
                                             <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                                                 <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                                     <tr>
                                                        
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                             Product Id
                                                         </th>
                                                   
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Product Title
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Image
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                           Quantity
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Price
                                                         </th>
                                                          <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            SubTotal
                                                         </th>
                                                         
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>

                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>
                                                   
                                                 </tbody >
                                             </table>
                                         </div>
                                         </td>
                                     </tr>
                                 )}
                                 
                              
                               
                             </tbody >
                         </table>
                     </div>
                  </div>
                
               
               </div>
            </div>
        </div>
      </section>
      
    </>
  )
}

export default Orders
