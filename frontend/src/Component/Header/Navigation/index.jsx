import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';
import '../Navigation/style.css'
import { useContext } from 'react';
import { MyContext } from '../../../App';

const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel ]=useState(false);
    const[catData,setCatData]=useState([])
    const Context=useContext(MyContext)

    useEffect(()=>{
          setCatData(Context?.catData);
    },[Context?.catData])

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
                {
                  catData?.length !== 0 && catData?.map((item,index)=>{
                      return(
                        <li className='list-none relative'key={index}>
                    <Link to='/' className="link transition text-[14px] font-[500]">
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]  !py-4'>{item?.name}</Button></Link>

                    {
                      item?.children?.length  > 0 && 
                            <div className="submenu absolute !top-[120%] !left-[0%] min-w-[150px] bg-white
                            shadow-md opacity-0 transition-all ">
                      <ul>
                        {
                          item?.children?.map((subcat,index_)=>{
                        return(
                          <li className='list-none w-full relative' key={index_}>
                        
                          <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>{subcat?.name}</Button>
                          
                            {
                                 subcat?.children?.length  > 0 &&  <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white
                                 shadow-md opacity-0 transition-all ">
                                   <ul>
                                    {
                                      subcat?.children?.map((ThridSub,index__)=>{
                                        return(
                                             <li className='list-none w-full' key={index__}>
                                       
                                       <Button   component={Link} className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>{ThridSub?.name}</Button>
                                       
                                     </li>
                                        )
                                      })
                                    }
                                    
                                     
                                   </ul>
                                 </div>
                            }
                               
                               

                        
                        </li>

                        )})
                        }
                        
                        
                      
                      </ul>
                    </div>
                       
                    }

                 
                </li>
                      )
                  })
                }
                
              </ul>
            </div>
            
            <div className="Col_3 w-[20%]">
                <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'>
                    <GoRocket  className=' text-[18px]'/>Free International Delivery</p></div>
        </div>
    </nav>

   {/* Categories panel  */}
   {
    catData?.length !==0 &&
     <CategoryPanel openCategoryPanel={openCategoryPanel} isOpenCatPanel={isOpenCatPanel}
     data={catData}/>
     
   }
    
      
    </>
  )
}

export default Navigation
