import React, {  useContext } from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaCartShopping, FaShareFromSquare } from "react-icons/fa6";
import '../ProductItemListView/style.css'
import { MyContext } from '../../App';

const ProductItemListView = () => {
  
    const Context=useContext(MyContext)
  return (
    <>
       <div className="productItem shadow-md bg-[#f1f1f1] rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center">
        <div className="group imgWrapper w-[25%]  rounded-md relative">

          
            <Link to='/'>
               <div className="img h-[220px] overflow-hidden">
 
                 <img  src='../Img/Shirt1.jpg'
                  className=' w-full '/>

                 <img  src='../Img/Shirt2.jpg'
                 className=' w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100'/>
               </div>
            </Link>



            <span className='discount flex items-center absolute top-[10px] left-[10px] z-50
            bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]'> 10%</span>

            <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 
            flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
              
                <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                  <FaRegHeart className='text-[18px] '/>
                </Button>
              

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                <IoMdGitCompare className='text-[18px]' />
              </Button>

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}
              onClick={()=>Context.setOpenProductDetailsModel(true)}>
                <MdOutlineZoomOutMap className='text-[18px] '/>
              </Button>

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                <FaShareFromSquare className='text-[18px] '/>
              </Button>
            </div>
        </div>
        <div className="info p-3 py-5   px-8 w-[75%] ">
           <h6 className='text-[20px] text-left title mt-2 mb-3 font-[500] text-[rgba(0,0,0,0.9)]'><Link to='' className='link transition-all'>Men Alias-N Regular Fit Spread collar Shirt</Link></h6>
           <h5 className='text-[17px] mb-1 text-[rgba(77, 173, 89, 0.1)]'> <Link to='' className='link transition-all'>In Stocks</Link></h5>

           <p className="text-[14px] font-[400] mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </p>
           <Rating name="size-small" defaultValue={4} size="small" readOnly />

           <div className="flex items-center gap-4">
            <span className='OldPrice line-through text-gray-500 text-[15px] font-[500]'>$58.00</span>
             <span className='Price text-[#ff5252] text-[15px] font-[600]'>$58.00</span>
           </div>

           <div className=" mt-3">
              <Button className='btn-org flex gap-2'>
               <FaCartShopping className='text-[20px]'/>Add to Cart</Button>
            </div>
        </div>
      </div>
    </>
  )
}

export default ProductItemListView
