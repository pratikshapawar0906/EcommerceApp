import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const MyListItem = () => {

    
  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b-1 border-[rgba(0,0,0,0.1)]">
                      <div className="img w-[15%] rounded-md overflow-hidden">
                        <Link to='/product/7676' className='group'>
                        <img src='../Img/Shirt1.jpg' className='w-full group-hover:scale-105 transition-all'/>
                        </Link>
                      </div>


                      <div className="info w-[85%] relative">
                        <IoMdClose className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'/>
                        <span className="text-[13px]">RARE RABBIT</span>
                        <h3 className=" text-[15px]"><Link to='' className='link transition-all'>Men Alias-N Regular Fit Spread Collar Shirt</Link></h3>
 
                        <Rating name="size-small" defaultValue={4} size="small" readOnly />

                        <div className="flex items-center gap-4 mt-2 mb-2">
                           <span className='Price  text-[14px] font-[600]'>$58.00</span>
                           <span className='OldPrice line-through text-gray-500 text-[14px] font-[500]'>$58.00</span>
                           <span className='Price text-[#ff5252] text-[14px] font-[600]'>55% Off</span>
                         </div>

                      
                         <Button className='btn-0rg btn-sm'>Add to Cart</Button>
                      </div>
                  </div>
    </>
  )
}

export default MyListItem
