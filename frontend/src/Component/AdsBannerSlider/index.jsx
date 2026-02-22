import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';


const AdsBannerSlider = (props) => {
  return (
    <>
     <div className="py-5 w-full">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="smlBtn"
        >
            {
                props?.data?.map((item, index)=>{
                     return(
                        <SwiperSlide key={index}>
                            <BannerBox info={item?.align} img={item?.images[0]}/>
                        </SwiperSlide>
                     )})
                    }
         </Swiper>
     </div>
      
    </>
  )
}

export default AdsBannerSlider
