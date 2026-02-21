import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';

const ProductSlider = (props) => {
  return (
    <>
      <section className='productSlider py-3'>
          <div className="container">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={props.items}
              className='mySwiper'
            >
              {
                props?.data?.map((item, index)=>{
                     return(
                        <SwiperSlide key={index}>
                           <ProductItem item={item} />
                         </SwiperSlide>
                     )
                })
                
              }
              
            </Swiper>
          </div>
      </section>
    </>
  )
}

export default ProductSlider
