import Button from '@mui/material/Button'
import React, { useState } from 'react'
import QtyBox from '../QtyBox'
import { FaCartShopping } from 'react-icons/fa6'
import Rating from '@mui/material/Rating'
import { FaRegHeart } from 'react-icons/fa'
import { IoMdGitCompare } from 'react-icons/io'

const ProductDetailsModel = () => {
   const [productActionIndex, setProductActionIndex]=useState(0);

  return (
    <>
         
              <h1 className='text-[22px] font-[600] mb-2'>  Men Alias-N Regular Fit Spread Collar Shirt</h1>
              <div className="flex items-center  gap-3">
                <span className="text-gray-400 font-[13px]">
                  Brands : <span className="font-[500] text-black opacity-75">RARE RABBIT</span>
                </span>
                <Rating name="size-small" defaultValue={4} size="small" readOnly />
                <span className="text-[13px] cursor-pointer color-">Review (5)</span>
              </div>
               <div className="flex items-center gap-4 mt-4">
                <span className='OldPrice line-through text-gray-5000 text-[18px] font-[500]'>$58.00</span>
                 <span className='Price text-[#ff5252] text-[18px] font-[600]'>$58.00</span>

                 <span className="text-[14px]"> Available In stocks: <span className="text-green-600 font-bold text-[14px]">147 Items</span></span>
               </div>
               <br/>

               <p className="mt-3 pr-10 mb-5">
                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
               </p>

               <div className="flex items-center gap-3">
                <span className="text-[16px]"> Size:</span>
                <div className="flex items-center gap-1">
                  <Button className={` ${productActionIndex === 0 ? '!bg-[#ff5252]  !text-[#ffffff]'  : ''} !min-w-[40px] !border-1 !border-[#000] !h-[30px] !text-[rgba(0,0,0,0.7)]`} 
                  onClick={()=>setProductActionIndex(0)}>  S</Button>
                  <Button className={` ${productActionIndex === 1 ? '!bg-[#ff5252]  !text-[#ffffff]'  : ''} !min-w-[40px] !border-1 !border-[#000] !h-[30px] !text-[rgba(0,0,0,0.7)]`} 
                  onClick={()=>setProductActionIndex(1)}>  M</Button>
                  <Button className={` ${productActionIndex === 2 ? '!bg-[#ff5252]  !text-[#ffffff]'  : ''} !min-w-[40px] !border-1 !border-[#000] !h-[30px] !text-[rgba(0,0,0,0.7)]`} 
                   onClick={()=>setProductActionIndex(2)}>  L</Button>
                  <Button className={` ${productActionIndex === 3 ? '!bg-[#ff5252]  !text-[#ffffff]'  : ''} !min-w-[40px] !border-1 !border-[#000] !h-[30px] !text-[rgba(0,0,0,0.7)]`} 
                   onClick={()=>setProductActionIndex(3)}>  Xl</Button>
                  <Button className={` ${productActionIndex === 4 ? '!bg-[#ff5252]  !text-[#ffffff]'  : ''} !min-w-[40px] !border-1 !border-[#000] !h-[30px] !text-[rgba(0,0,0,0.7)]`} 
                   onClick={()=>setProductActionIndex(4)}>  XXl</Button>

                </div>
               </div>

                <p className="text-[14px] mt-5 mb-2 text-[#000]">Free Shipping (Est. Delivery Time 2-3 days)</p>
               <div className="flex items-center mb-2 gap-4 py-4">
                  <div className="qtyBoxWrapper w-[70px]">
                    <QtyBox/>
                  </div>

                  <Button className='btn-org flex gap-2'>
                    <FaCartShopping className='text-[22px]'/> Add to Cart
                  </Button>
               </div>

                <div className="flex items-center gap-4 mt-4">
                     <span className=" flex item-center gap-2 text[15px] link cursor-pointer font-[500]">Add To Whislist    <FaRegHeart className='text-[18px]'/></span>
                     <span className=" flex item-center gap-2 text[15px] link cursor-pointer font-[500]">Add To Compare <IoMdGitCompare className='text-[18px]'/></span>
                 </div>

                 

           
    </>
  )
}

export default ProductDetailsModel
