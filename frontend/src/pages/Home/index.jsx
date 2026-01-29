import React from 'react'
import Homeslider from '../../Component/Homeslider'
import Catslider from '../../Component/catSlider'
import { TbTruckDelivery } from "react-icons/tb";
import AdsBannerSlider from '../../Component/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductSlider from '../../Component/ProductSlider';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,Navigation } from 'swiper/modules';
import BlogItem from '../../Component/BlogItem';

import AdsBannerSliderV2 from '../../Component/AdsBannerSliderv2';


const Home = () => {
   const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Homeslider/>

      


      <Catslider/>

      <section className='bg-white py-8'>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className='text-[20px] font-[600]'>Popular Products</h2>
              <p className='text-[14px] font-[400]'> Do not miss the current offers until the end of March.</p>
            </div>
            <div className="rightSec w-[60%]">
              
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="fashion" />
                  <Tab label="Electronic" />
                  <Tab label="Bags" />
                  <Tab label="Footwear" />
                  <Tab label="Groceries" />
                  <Tab label="Beauty" />
                  <Tab label="wellness" />
                  <Tab label="Jewellery"/>
                </Tabs>
              
            </div>
          </div>

          <ProductSlider  items={6}/>

        </div>
      </section>

      
      <section className='py-4 pt-2 bg-white '>
       <div className="container">
          <div className="FreeShipping w-[80%] m-auto  py-2 p-4  border-2 border-[#ff5252] flex items-center justify-between
          rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <TbTruckDelivery className='text-[50px]'/>
              <span  className='text-[20px] font-[600] uppercase'>Free Shipping</span>
            </div>

            <div className="col2">
              <p className='mb-0 font-[500]'>Free Delivery Now on Your First order and over $200</p>
            </div>

            <div className="col3">
              <p className='font-bold text-[30px]'> -Only $200</p>
            </div>
          </div>

          <AdsBannerSlider items={4}/>
       </div>
      </section>


      <section className='py-5 pt-0 bg-white'>
          <div className="container">
            <h2 className='text-[20px] font-[600]'>Latest Products</h2>
            <ProductSlider  items={6}/>

             <AdsBannerSliderV2 items={3}/>
          </div>
      </section>

      <section className='py-5 pt-0 bg-white'>
          <div className="container">
            <h2 className='text-[20px] font-[600]'>Featured Products</h2>
            <ProductSlider  items={6}/>

             <AdsBannerSlider items={3}/>
          </div>
      </section>

      <section className='py-5 pb-8 pt-0 bg-white blogSection'>
        <div className=" container ">
          <h2 className='text-[20px] font-[600] mb-4'>From the Blog</h2>
         <Swiper
           navigation={true}
           modules={[Navigation]}
           spaceBetween={30}
           slidesPerView={3}  
           className='blogSwiper'         
         >
          <SwiperSlide><BlogItem/></SwiperSlide>
          <SwiperSlide><BlogItem/></SwiperSlide>
          <SwiperSlide><BlogItem/></SwiperSlide>
          <SwiperSlide><BlogItem/></SwiperSlide>
          <SwiperSlide><BlogItem/></SwiperSlide>
          <SwiperSlide><BlogItem/></SwiperSlide>
         </Swiper>
        </div>
      </section>
      <br/>
       
      
    </>
  )
}

export default Home
