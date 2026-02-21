import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,Navigation } from 'swiper/modules';




const  HomeSlider = (props) => {
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
                    className="sliderhome"
            >
              {
                props?.data?.length !==0n && props?.data?.map((item,index)=>{
                  return(
                        <SwiperSlide key={index}>
                           <div className="item rounded-[20px] overflow-hidden">
                             <img src={item?.images[0]}
                            alt="Banner image"/>
                           </div>
                        </SwiperSlide>
                  )
                })
              }
             
             
              
            </Swiper>
          </div>
       </div>
    </>
  )
}

export default  HomeSlider
