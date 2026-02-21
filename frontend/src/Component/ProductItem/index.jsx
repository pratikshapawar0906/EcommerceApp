import React, { useContext } from 'react'
import '../ProductItem/style.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";
import { MyContext } from '../../App';


const ProductItem = (props) => {

  const Context=useContext( MyContext)
  
  return (
    <>
      <div className="productItem shadow-lg rounded-md overflow-hidden border-1 
      border-[rgba(0,0,0,0.1)] ">
        <div className="group imgWrapper w-[100%]  rounded-md relative">

          
            <Link to={`/productDetails/${props?.item?._id}`}>
               <div className="img h-[220px] overflow-hidden">
 
                 <img  src={props?.item?.images[0]}
                  className=' w-full '/>

                 <img  src={props?.item?.images[1]}
                 className=' w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100'/>
               </div>
            </Link>



            <span className='discount flex items-center absolute top-[10px] left-[10px] z-50
            bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]'> {props?.item?.discount}</span>

            <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 
            flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
              
                <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                  <FaRegHeart className='text-[18px] '/>
                </Button>
              

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                <IoMdGitCompare className='text-[18px]' />
              </Button>

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}
               onClick={()=>Context.handleOpenProductDetailsModel(true, props?.item)}>
                <MdOutlineZoomOutMap className='text-[18px] '/>
              </Button>

              <Button sx={{  minWidth: 30,  width: 30,  height: 30,  borderRadius: '50%',  backgroundColor: '#fff',  color: '#000',  '&:hover': {    backgroundColor: '#ff5252',    color: '#fff',  },}}>
                <FaShareFromSquare className='text-[18px] '/>
              </Button>
            </div>
        </div>
        <div className="info p-3 py-5 ">
           <h6 className='text-[20px]  title mt-1 !font-[500] text-[rgba(0,0,0,0.9)]'><Link to={`/productDetails/${props?.item?._id}`} className='link transition-all'>{props?.item?.name}</Link></h6>
           <h5 className='text-[17px] mb-1 text-[rgba(77, 173, 89, 0.1)]'> <Link to={`/productDetails/${props?.item?._id}`} className='link transition-all'>{props?.item?.brand}</Link></h5>

           
           <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />

           <div className="flex items-center gap-4">
            <span className='OldPrice line-through text-gray-500 text-[15px] font-[500]'>&#x20b9;{props?.item?.oldPrice}</span>
             <span className='Price text-[#ff5252] text-[15px] font-[600]'>&#x20b9;{props?.item?.price}</span>
           </div>


           
        </div>
      </div>
    </>
  )
}

export default ProductItem
