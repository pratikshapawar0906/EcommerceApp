import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,Navigation } from 'swiper/modules';
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
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
            </Swiper>
          </div>
      </section>
    </>
  )
}

export default ProductSlider
