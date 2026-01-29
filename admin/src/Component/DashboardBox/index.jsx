import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoGiftOutline } from "react-icons/io5";
import { Fa0, FaChartSimple } from "react-icons/fa6";
import { FiPieChart } from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { Navigation  } from 'swiper/modules';
import { RiProductHuntLine } from "react-icons/ri";

const DashboardBox = () => {
  return (
    <>
    
      <Swiper
        navigation={true}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide >
            <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                  <IoGiftOutline className='text-[40px] text-[#3872fa]' />

                <div className=" info w-[70%] ">
                    
                    <h3 className="">New Orders</h3>
                    <b className="">1,390</b>
                </div>
                <FaChartSimple  className='text-[50px] text-[#3872fa]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5  py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                  <FiPieChart className='text-[40px] text-[#10b981]' />

                <div className=" info  w-[70%]">
                    
                    <h3 className="">Sales</h3>
                    <b className="">$59,890</b>
                </div>
                <FaChartSimple className='text-[50px] text-[#10b981]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5  py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                  <BsBank2 className='text-[40px] text-[#7928ca]' />

                <div className=" info   w-[70%]">
                    
                    <h3 className="">Revenue</h3>
                    <b className="">$12,390</b>
                </div>
                <FaChartSimple  className='text-[40px] text-[#7928ca]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-5  py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                  <RiProductHuntLine className='text-[40px] text-[#312be1d8]' />

                <div className=" info   w-[70%]">
                    
                    <h3 className="">Total Products</h3>
                    <b className="">$12,390</b>
                </div>
                <FaChartSimple  className='text-[40px] text-[#312be1d8]'/>
            </div>
        </SwiperSlide>
       
        
        
      </Swiper>
      
    </>
  )
}

export default DashboardBox
