import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';


const AdsBannerSliderV2 = (props) => {
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
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img1.webp'}/>
            </SwiperSlide>
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img2.webp'}/>
            </SwiperSlide>
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img3.webp'}/>
            </SwiperSlide>
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img1.webp'}/>
            </SwiperSlide>
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img2.webp'}/>
            </SwiperSlide>
            <SwiperSlide>
                <BannerBoxV2 img={'../Img/banner2_Img3.webp'}/>
            </SwiperSlide>
           
         </Swiper>
     </div>
      
    </>
  )
}

export default AdsBannerSliderV2
