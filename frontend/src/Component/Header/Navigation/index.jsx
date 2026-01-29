import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';
import '../Navigation/style.css'

const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel ]=useState(false);

    const openCategoryPanel=(value)=>{
      setIsOpenCatPanel(value)
    }
  return (
    <>
    <nav >
        <div className="container flex items-center justify-end">
            <div className="col_1 w-[20%]">
                <Button className='!text-black gap-2 w-full ' onClick={() => openCategoryPanel(true)}>
                    <CiMenuBurger className='text-[18px]' />shop By Categories
                    <FaAngleDown className='text-[13px] ml-auto font-bold curser-pointer' /></Button>
            </div>  

            <div className="col_2 w-[60%]">
              <ul className='flex items-center gap-3 nav'>
                <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Home</Button></Link>
                </li>
                 <li className='list-none relative'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Fashion</Button></Link>

                    <div className="submenu absolute !top-[120%] !left-[0%] min-w-[150px] bg-white
                    shadow-md opacity-0 transition-all ">
                      <ul>
                        <li className='list-none w-full relative'>
                        
                          <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Men</Button>
                               
                                <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white
                                 shadow-md opacity-0 transition-all ">
                                   <ul>
                                     <li className='list-none w-full'>
                                       
                                       <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>T-Shirt</Button>
                                       
                                     </li>
                                     <li className='list-none w-full'>
                                       
                                       <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Jeans</Button>
                                      
                                     </li>
                                     <li className='list-none w-full'>
                                      
                                       <Button  component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Footwear</Button>
                                       
                                     </li>
                                     <li className='list-none w-full'>
                                       
                                       <Button  component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Watch</Button>
                                       
                                     </li>
                                     <li className='list-none w-full'>
                                      
                                       <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Pants</Button>
                                     
                                     </li>
                                   
                                   </ul>
                                 </div>

                        
                        </li>
                        <li className='list-none w-full'>
                          <Link to='' className='w-full'>
                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Women</Button>
                          </Link>
                        </li>
                        <li className='list-none w-full'>
                          <Link to='' className='w-full'>
                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Kids</Button>
                          </Link>
                        </li>
                        <li className='list-none w-full'>
                          <Link to='' className='w-full'>
                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Girls</Button>
                          </Link>
                        </li>
                        <li className='list-nonew-full'>
                          <Link to='' className='w-full'>
                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Boys</Button>
                          </Link>
                        </li>
                      
                      </ul>
                    </div>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Electronic</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Bags</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Footwear</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Groceries</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Beauty</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>Wellness</Button></Link>
                </li>
                 <li className='list-none'>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Jewellery</Button></Link>
                </li>
              </ul>
            </div>
            
            <div className="Col_3 w-[20%]">
                <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'>
                    <GoRocket  className=' text-[18px]'/>Free International Delivery</p></div>
        </div>
    </nav>

   {/* Categories panel  */}
    <CategoryPanel openCategoryPanel={openCategoryPanel} isOpenCatPanel={isOpenCatPanel}/>
      
    </>
  )
}

export default Navigation
