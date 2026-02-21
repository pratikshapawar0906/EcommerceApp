import React, { useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules';


const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex]=useState(0);

  const ZoomSliderBig =useRef();
  const ZoomSlidersml =useRef();

  const goto=(index)=>{
    setSlideIndex(index);
    ZoomSlidersml.current.swiper.slideTo(index);
    ZoomSliderBig.current.swiper.slideTo(index)
  }
  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%] ">
            <Swiper
               ref={ZoomSlidersml}
               direction={'vertical'}
               navigation={true}
               modules={[Navigation]}
               spaceBetween={0}
               slidesPerView={3}
               className='ZoomProductSliderThumbs h-[500px] overflow-hidden'
            >
              {
                props?.images?.map((item,index)=>{
                    return(
                         <SwiperSlide key={index}>
                            <div className={`item rounded-md overflow-hidden cursor-pointer group 
                              ${slideIndex === index ? 'opacity-30' : 'opacity-60'}`} onClick={()=>goto(index)}>
                                <img src={item} className='w-full transition-all group-hover:scale-105'/>
                            </div>
                        </SwiperSlide>
                    )
                })
              }
               
               
            </Swiper>
        </div>
       <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">
        <Swiper
           ref={ZoomSliderBig}
           navigation={false}
           spaceBetween={0}
           slidesPerView={1}
        >
          {
            props?.images?.map((item,index)=>{
                return(

                   <SwiperSlide key={index}>
                      <InnerImageZoom zoomType="hover" zoomScale={1} src={item}  />
                  </SwiperSlide>

          )})
        }
         

        
        </Swiper>
       </div>
      </div>
    </>
  )
}

export default ProductZoom
