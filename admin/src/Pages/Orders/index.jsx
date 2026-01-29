import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import SearchBox from '../../Component/SearchBox'

const Orders = () => {
    const [isOpenOrderdProduct, setIsOpenedOrderdProduct]=useState(null);
    const isShowOrderedProduct=(index)=>{
      setIsOpenedOrderdProduct(  isOpenOrderdProduct === index ? null : index)
    }

  return (
    <>
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
       <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[700]">Recent Orders</h2>
        <div className="w-[40%]">
            <SearchBox/>
        </div>
       </div>
        

          <div className="relative overflow-x-auto mt-5 pb-5">
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
                                         <span className="text-[#3872fa] font-[600]">5379464hdy78bd689hf74 </span> 
                                     </th>
                                     <td className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">pay_PtubdhExThx</span>
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
                                        <span className="text-[#3872fa] font-[600]"> 23163h7d747db47</span>
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

                                  <tr className="bg-neutral-primary border-b border-default">
                                    <th  className="px-6 py-4 font-[500]">
                                     
                                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]'onClick={()=>isShowOrderedProduct(1)}>
                                            {
                                                isOpenOrderdProduct === 1 ?  <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : 
                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            }
                                            </Button>
                                     </th>
                                     <th  className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">5379464hdy78bd689hf74 </span> 
                                     </th>
                                     <td className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">pay_PtubdhExThx</span>
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
                                        <span className="text-[#3872fa] font-[600]"> 23163h7d747db47</span>
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                       <Badge status="pending"/>
                                     </td>
                                      <td className="px-6 py-4 font-[500]  whitespace-nowrap ">
                                         2024-12-04
                                     </td>
                                 </tr>
                                 {
                                    isOpenOrderdProduct === 1 &&  (
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
    </>
  )
}

export default Orders
