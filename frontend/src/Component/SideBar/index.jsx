import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "../SideBar/style.css"
import { Collapse } from 'react-collapse'
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import Rating from '@mui/material/Rating';

const SideBar = () => {
  const [isOpencategoryFilter, setIsOpencategoryFilter]=useState(true);

  const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter]=useState(true);

  const [isOpenSizeFilter, setIsOpenSizeFilter]=useState(true);

  return (
    <>
      
      <aside className='sidebar py-5'>
        <div className="box">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'> Shop By category
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpencategoryFilter(!isOpencategoryFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpencategoryFilter}>
              <div className="scroll px-4 relative -left-[13px]">
               <FormControlLabel control={<Checkbox size="small"/>} label="Fashion"  className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Bags" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Electronic" className='w-full' />
               <FormControlLabel control={<Checkbox size="small"/>} label="Footwear" className='w-full'/>
               <FormControlLabel  control={<Checkbox size="small" />} label="Groceries" className='w-full'/>
               <FormControlLabel  control={<Checkbox size="small" />} label="Wellness"className='w-full'/>
               <FormControlLabel control={<Checkbox size="small"/>} label="Jewellery" className='w-full'/>              
  
  
              </div>
            </Collapse>
        </div>

        <div className="box">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>  Availability
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpenAvailabilityFilter}>
              <div className="scroll px-4 relative -left-[13px]">
               <FormControlLabel control={<Checkbox size="small"/>} label="Available (17)"  className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="In Stock  (17)" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Not Available (1)" className='w-full' />
                        
  
              </div>
            </Collapse>
        </div>

        <div className="box mt-3">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'> Size
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpenSizeFilter(!isOpenSizeFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpenSizeFilter}>
              <div className="scroll px-4 relative -left-[13px]">
               <FormControlLabel control={<Checkbox size="small"/>} label="small"  className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Mediam" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" Large" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" xl" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" xxl" className='w-full' />
                        
  
              </div>
            </Collapse>
        </div>

        <div className="box mt-4 ">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>
              Filter By Price
             
            </h3>
            <RangeSlider/>
            <div className="flex pt-4 pb-2 priceRange">
              <span className='text-[13px]'>
                From: <strong className="text-dark">Rs:{0}</strong>
              </span>
               <span className='ml-auto text-[13px]'>
                From: <strong className="text-dark">Rs:{5000}</strong>
              </span>
            </div>
        </div>

         <div className="box mt-4 ">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>
              Filter By Rating
             
            </h3>
             <div className="w-full">
              <Rating name="size-small" defaultValue={5} size="small" readOnly  />
             </div>
             <div className="w-full">
              <Rating name="size-small" defaultValue={4} size="small" readOnly/>
             </div>
             <div className="w-full">
              <Rating name="size-small" defaultValue={3} size="small" readOnly/>
             </div>
             <div className="w-full">
              <Rating name="size-small" defaultValue={2} size="small" readOnly/>
             </div>
             <div className="w-full">
              <Rating name="size-small" defaultValue={1} size="small" readOnly/>
             </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar
