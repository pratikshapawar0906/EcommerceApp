import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,Navigation } from 'swiper/modules';




const  HomeSlider = () => {
  return (
    <>
       <div className="homeSlider py-4">
          <div className="container">
            <Swiper 
            loop={true}
            spaceBetween={10} 
                    autoplay={{
                       delay: 2500,
                       disableOnInteraction: false,
                     }}
                    navigation={true} 
                    modules={[Navigation,Autoplay]} 
                    className="sliderhome">
              <SwiperSlide>
                 <div className="item rounded-[20px] overflow-hidden">
                   <img src="../Img/Banner_Img1.jpg"
                  alt="Banner image"/>
                 </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                   <img src="../Img/Banner_Img2.jpg" alt="Banner image" className="w-full"/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                   <img src="../Img/Banner_Img3.jpg" alt="Banner image" className="w-full"/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                  <img src="../Img/Banner_Img4.jpg" alt="Banner image" className="w-full"/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                  <img src="../Img/Banner_Img5.jpg" alt="Banner image" className="w-full"/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                   <img src="../Img/Banner_Img6.jpg" alt="Banner image" className="w-full"/>
                 </div>
              </SwiperSlide>   
              
            </Swiper>
          </div>
       </div>
    </>
  )
}

export default  HomeSlider
