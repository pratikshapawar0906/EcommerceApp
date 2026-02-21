import React from 'react'
import { Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

const Catslider = (props) => {

  return (
    <div className="homeCatslider py-8 pt-4">
      <div className="container">
        <Swiper
          navigation
          modules={[Navigation]}
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 },
          }}
        >
          { props?.data?.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link to={`/category/${cat.slug}`}>
                <div
                  className="item bg-white py-7 px-3 rounded-sm text-center 
                  flex flex-col items-center justify-center 
                  hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={cat.images[0]}
                    alt={cat.name}
                    className="w-[60px] mb-2 transition-transform duration-300 hover:scale-110"
                  />
                  <h3 className="text-[15px] font-medium mt-2">
                    {cat?.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Catslider
