import React from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";
import Button from '@mui/material/Button';

const CartPanel = () => {
  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden
      py-3 px-4">
        <div className="cartItem w-full flex items-center gap-4 border-b-1 border-[rgba(0,0,0,0.1)] 
        pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
             <Link to='/product/45567' className='block group'>
                <img src='../Img/Shirt1.jpg ' className='w-full group-hover:scale-105 '/>
             </Link>
          </div>  
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[14px] font-[500]">
              <Link to='/product/5856'className='link transition-all'>Men Alias-N Regular Fit Spread Collar Shirt </Link>
            </h4>
            <p className="flex item-center gap-5 mt-2 mb-2">
              <span className="">  Qty : <span className="">1</span></span>
              <span className="text-[#ff5252] font-bold">Price : $25</span>
            </p>

            <MdDeleteOutline className='absolute top-[10px] right-[10px] cursur-pointer text-[25px] link transition-all'/>
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b-1 border-[rgba(0,0,0,0.1)] 
        pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
             <Link to='/product/45567' className='block group'>
                <img src='../Img/Shirt1.jpg ' className='w-full group-hover:scale-105 '/>
             </Link>
          </div>  
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[14px] font-[500]">
              <Link to='/product/5856'className='link transition-all'>Men Alias-N Regular Fit Spread Collar Shirt </Link>
            </h4>
            <p className="flex item-center gap-5 mt-2 mb-2">
              <span className="">  Qty : <span className="">1</span></span>
              <span className="text-[#ff5252] font-bold">Price : $25</span>
            </p>

            <MdDeleteOutline className='absolute top-[10px] right-[10px] cursur-pointer text-[25px] link transition-all'/>
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b-1 border-[rgba(0,0,0,0.1)] 
        pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
             <Link to='/product/45567' className='block group'>
                <img src='../Img/Shirt1.jpg ' className='w-full group-hover:scale-105 '/>
             </Link>
          </div>  
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[14px] font-[500]">
              <Link to='/product/5856'className='link transition-all'>Men Alias-N Regular Fit Spread Collar Shirt </Link>
            </h4>
            <p className="flex item-center gap-5 mt-2 mb-2">
              <span className="">  Qty : <span className="">1</span></span>
              <span className="text-[#ff5252] font-bold">Price : $25</span>
            </p>

            <MdDeleteOutline className='absolute top-[10px] right-[10px] cursur-pointer text-[25px] link transition-all'/>
          </div>
        </div>
        
        <div className="cartItem w-full flex items-center gap-4 border-b-1 border-[rgba(0,0,0,0.1)] 
        pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
             <Link to='/product/45567' className='block group'>
                <img src='../Img/Shirt1.jpg ' className='w-full group-hover:scale-105 '/>
             </Link>
          </div>  
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[14px] font-[500]">
              <Link to='/product/5856'className='link transition-all'>Men Alias-N Regular Fit Spread Collar Shirt </Link>
            </h4>
            <p className="flex item-center gap-5 mt-2 mb-2">
              <span className="">  Qty : <span className="">1</span></span>
              <span className="text-[#ff5252] font-bold">Price : $25</span>
            </p>

            <MdDeleteOutline className='absolute top-[10px] right-[10px] cursur-pointer text-[25px] link transition-all'/>
          </div>
        </div>

         
      </div>
      <br/>

      <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">

        <div className="bottomInfo py-3 px-4 w-full border-t-1 border-[rgba(0,0,0,0.1)]
        flex items-center justify-between flex-col">
            <div className="flex items-center justify-between w-full">
              <span className="text-[14px] font-[600]">1 item</span>
              <span className="text-[#ff5252] font-bold">$86.00</span>
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="text-[14px] font-[600]">Shipping</span>
              <span className="text-[#ff5252] font-bold">$8.00</span>
            </div>
        </div>

        <div className="bottomInfo py-3 px-4 w-full border-t-1 border-[rgba(0,0,0,0.1)]
        flex items-center justify-between flex-col">
            <div className="flex items-center justify-between w-full">
              <span className="text-[14px] font-[600]">Total (tax excl.)</span>
              <span className="text-[#ff5252] font-bold">$93.00</span>
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="text-[14px] font-[600]">Total (tax Incl.)</span>
              <span className="text-[#ff5252] font-bold">$93.00</span>
            </div>

             <div className="flex items-center justify-between w-full">
              <span className="text-[14px] font-[600]">Total </span>
              <span className="text-[#ff5252] font-bold">$93.00</span>
            </div>

            <br/>
            <div className="flex items-center justify-between w-full gap-5">
              <Link to='/cart' className='w-[50%] d-block'><Button className='btn-org btn-lg w-full'>View cart</Button></Link>
              <Link to='/checkout' className='w-[50%] d-block'><Button className='btn-org btn-border btn-lg w-full '>Check out</Button></Link>
            </div>
        </div>
      </div>

      
    </>
  )
}

export default CartPanel
