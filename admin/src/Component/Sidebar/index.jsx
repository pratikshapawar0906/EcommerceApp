import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { RxDashboard } from "react-icons/rx";
import {FaRegImage} from "react-icons/fa"
import { FaUserFriends } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import Collapse from '@mui/material/Collapse';
import { MyContext } from '../../App';

const Sidebar = () => {
  const  Context=useContext(MyContext)
  const[subMenuIndex,setSubMenuIndex]=useState(null)

  const isOpenSubMenu =(index)=>{
    if(subMenuIndex === index){
        setSubMenuIndex(null)
    }else{
      setSubMenuIndex(index)
    }
  }
  return (
    <>
      <div className={`sidebar fixed top-0 left-0 bg-[#fff] h-full border-r
          border-[rgba(0,0,0,0.1)] py-2 px-4 transition-all duration-300
          ${Context.isSidebarOpen ? 'w-[16%]' : 'w-0 overflow-hidden px-0'}`}>
         

         {
          Context.isSidebarOpen && (
            <div className="py-2 w-full">
              <Link to='/'>
                <img src='./logo.a795e14a.svg' className='w-[200px]' />
              </Link>
            </div>
          )}

        <ul className='mt-4'>
          <li className="">
            <Link to='/'>
              <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
              !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                <RxDashboard className='text-[18px] ' /><span className=""> Dashboard</span></Button>
            </Link>
          </li>
          <li className="">
            
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={()=>isOpenSubMenu(1)}>
              <FaRegImage className='text-[18px] ' /><span className=""> Home Slider</span>
              <span className="ml-auto block w-[30px] h-[30px] flex items-center justify-center" 
              ><FaAngleDown className={` transition-all ${subMenuIndex === 1 ? 'rotate-180' :''}`}/></span> </Button>

              <Collapse in={subMenuIndex === 1 ? true : false}>
                <ul className='w-full'>
                  <li className="w-full">
                    
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                    !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add Home Slider'
                     })}> <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span> Add Home banner Slide</Button>
                    
                  </li>
                  <li className="w-full">
                     <Link to='/homeSlider/list'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                     !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span> Home  Slide List</Button>
                     </Link>
                  </li>
                </ul>
              </Collapse>
         

          </li>
          <li className="">
            <Link to='/users'>
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
              <FaUserFriends className='text-[18px] ' /><span className=""> Users</span></Button>
              </Link>
          </li>
          <li className="">
            
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'  onClick={()=>isOpenSubMenu(2)}>
              <RiProductHuntLine className='text-[20px] ' /><span className=""> Products</span>
              <span className="ml-auto block w-[30px] h-[30px] flex items-center justify-center"
                ><FaAngleDown className={` transition-all ${subMenuIndex === 2 ? 'rotate-180' :''}`}/></span></Button>

                <Collapse in={subMenuIndex === 2 ? true : false}>
                <ul className='w-full'>
                  <li className="w-full">
                    
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                    !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add Product'
                     })}> <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span>Product Upload</Button>
                    
                  </li>
                  <li className="w-full">
                    <Link to='/products'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                     !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span> Product List</Button>
                     </Link>
                  </li>

                   <li className="w-full">
                    <Link to='/productDetail/addRAMS'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                    !text-[13px] !font-[500] !pl-9 flex gap-3' >
                       <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span>Add Product RAMS</Button>
                    </Link>
                    
                  </li>
                </ul>
              </Collapse>
            
          </li>
          <li className="">
            
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'  onClick={()=>isOpenSubMenu(3)}>
              <TbCategory className='text-[18px] ' /><span className=""> Category</span>
              <span className="ml-auto block w-[30px] h-[30px] flex items-center justify-center"
                ><FaAngleDown className={` transition-all ${subMenuIndex === 3 ? 'rotate-180' :''}`}/></span></Button>

                <Collapse in={subMenuIndex === 3 ? true : false}>
                  <ul className='w-full'>
                    <li className="w-full">
                      <Link to='/category/list'>
                      <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                      !text-[13px] !font-[500] !pl-9 flex gap-3'> <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span> Category List</Button>
                      </Link>
                    </li>
                    <li className="w-full">
                     
                      <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                       !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add New Category'
                     })}><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span>Add New Category </Button>
                       
                    </li>
                    <li className="w-full">
                      <Link to='/SubCategory/list'>
                      <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                       !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span> Subcategory List </Button>
                       </Link>
                    </li>
                    <li className="w-full">
                      
                      <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full
                       !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add New Subcategory'
                     })}><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.8)]'></span>Add New Subcategory </Button>
                       
                    </li>
                  </ul>
                </Collapse>
             
          </li>
          <li className="">
            <Link to='/orders'>
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
              <FaShoppingBag className='text-[20px] ' /><span className=""> Orders </span></Button>
              </Link>
          </li>
          <li className="">
            <Link to='/logout'>
            <Button className='text-[14px] w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)]
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
              <MdLogout className='text-[18px] ' /><span className=""> Logout</span></Button>
              </Link>
          </li>

        </ul>
      </div>
    </>
  )
}

export default Sidebar
