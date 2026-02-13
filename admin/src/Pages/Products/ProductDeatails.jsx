import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MdBrandingWatermark,  MdOutlineFilterVintage, MdRateReview } from 'react-icons/md';
import {BiSolidCategoryAlt} from 'react-icons/bi'
import { BsPatchCheckFill } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

const ProductDeatails = () => {
    const [slideIndex, setSlideIndex]=useState(0);
    const[product,setProduct]=useState();
    
    const ZoomSliderBig =useRef();
    const ZoomSlidersml =useRef();

    const {id}=useParams();

    const goto=(index)=>{
      setSlideIndex(index);
      ZoomSlidersml.current.swiper.slideTo(index);
      ZoomSliderBig.current.swiper.slideTo(index)
    }

    useEffect(()=>{
        fetchDataFromApi(`/api/product/getProduct/${id}`)
         .then((res)=>{
         setTimeout(()=>{
           setProduct(res?.product)
         },2000)
         })
    },[])
    
  return (
    <>
    <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[700]">Products Details </h2>
    </div>

    {
        product?._id !== "" &&  product?._id !== undefined &&  product?._id !== null  ? 
        <> 
        <div className="flex gap-3 productDetails">
            <div className=" w-[40%] ">
                {
                    product?.images?.length !==0 && 
                    <div className="flex gap-3 ">
                        <div className="slider w-[15%] ">
                            <Swiper
                               ref={ZoomSlidersml}
                               direction={'vertical'}
                               navigation={true}
                               modules={[Navigation]}
                               spaceBetween={0}
                               slidesPerView={3}
                              className={` ZoomProductSliderThumbs h-[500px] overflow-hidden  ${product?.images?.length > 5 && 'space' } `}>
                            {
                                product?.images?.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index}>
                                            <div className={`item rounded-md overflow-hidden cursor-pointer group 
                                              ${slideIndex === 0 ? '!opacity-30' : '!opacity-60'}`} onClick={()=>goto(index)}>
                                                <img src={item} className='w-full transition-all group-hover:scale-105'/>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            </Swiper>
                        </div>
                        <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
                            <Swiper
                               ref={ZoomSliderBig}
                               navigation={false}
                               spaceBetween={0}
                               slidesPerView={1}
                            >
                            {
                                product?.images?.map((item,index)=>{
                                    return(
                                      <SwiperSlide key={index}>
                                          <InnerImageZoom zoomType="hover" zoomScale={1} src={item}  />
                                      </SwiperSlide>
                                   )
                                })
                            }
                            
                            </Swiper>
                        </div>
                   </div>
                }
                
            </div>
    
            <div className=" w-[60%] ">
                <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>
    
                <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                        <MdBrandingWatermark className='opacity-65'/>Brand:</span>
                    <span className=" text-[14px]">{product?.brand}</span>
                </div>
    
                <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                        <BiSolidCategoryAlt className='opacity-65'/>Category:</span>
                    <span className=" text-[14px]">{product?.catName}</span>
                </div>
                {
                    product?.productRam?.length !== 0 &&  
                    <div className="flex items-center py-1">
                        <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                            <MdOutlineFilterVintage className='opacity-65'/>RAM:</span>
    
                            <div className="flex items-center gap-2 ">
                                {
                                   product?.productRam?.map((index)=>{
                                      return(
                                             <span className="inline-block shadow-sm p-1 bg-[#fff] text-[12px] font-[500]"key={index} >{product?.productRam}</span>
                                      )
                                   }) 
                                        
                                }
                            </div>
                        
                    </div>
                }
    
                {
                    product?.size?.length !== 0 &&  
                    <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                        <MdBrandingWatermark className='opacity-65'/>Size:</span>
    
                           <div className="flex items-center gap-2 ">
                                {
                                   product?.size?.map((index)=>{
                                      return(
                                        <span className=" inline-block shadow-sm p-1 bg-[#fff] text-[12px] font-[500]"key={index} >{product?.size}</span>
                                         )
                                   }) 
                                        
                                }
                            </div>
                    </div>
                }
    
                {
                    product?.productWeight?.length !== 0 &&  
                    <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                        <MdBrandingWatermark className='opacity-65'/>Weight:</span>
    
                           <div className="flex items-center gap-2 ">
                                {
                                   product?.productWeight?.map((index)=>{
                                      return(
                                        <span className=" inline-block shadow-sm p-1 bg-[#fff] text-[12px] font-[500]"key={index} >{product?.productWeight}</span>
                                         )
                                   }) 
                                        
                                }
                            </div>
                    </div>
                }
                
                <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                        <MdRateReview className='opacity-65'/>Review:</span>
                    <span className=" text-[14px]">({product?.review?.length > 0 ? product?.review?.length : 0 }) Review</span>
                </div>
    
                <div className="flex items-center py-1">
                    <span className="w-[20%] font-[500] flex items-center gap-2  text-[14px]">
                        <BsPatchCheckFill className='opacity-65'/>Published:</span>
                    <span className=" text-[14px]">{product?.createdAt?.split("T")[0]}</span>
                </div>
    
                <br/>
                <h2 className="text-[25px] font-[500] mb-3">Product Description</h2>
                {
                    product?.description &&
                     <p className="text-[14px] w-[75%]">{product?.description}</p>
                }
            </div>
        
        </div> 

         <br/>
            <h2 className="text-[18px] font-[500]">Customer Reviews</h2>
        
            <div className="reviewrap mt-3">
                 <div className="review w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                       <div className="flex items-center gap-8 ">
                          <div className="img w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-[#2b62c6]">
                            <img src='./thumb-1.jpg' className='w-full h-full object-cover' alt='customerImg'/>
                          </div>
        
                          <div className="info w-[80%]">
                            <div className=" flex items-center justify-between">
                                  <h4 className="text-[16px] font-[500]">Naveen Kumar</h4>
                                 <Rating  name='read-only' value={4} readOnly size='small'/>
                            </div>
                            <span className="text-[13px]">2026-02-15</span>
                            <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus, provident sint harum nobis alias quidem facere repudiandae quibusdam sapiente accusamus tenetur qui excepturi inventore modi hic soluta voluptatum exercitationem!</p>
                          </div>
                       </div>
                 </div>
        
                  <div className="review w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                       <div className="flex items-center gap-8 ">
                          <div className="img w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-[#2b62c6]">
                            <img src='./thumb-1.jpg' className='w-full h-full object-cover' alt='customerImg'/>
                          </div>
        
                          <div className="info w-[80%]">
                            <div className=" flex items-center justify-between">
                                  <h4 className="text-[16px] font-[500]">Naveen Kumar</h4>
                                 <Rating  name='read-only' value={4} readOnly size='small'/>
                            </div>
                            <span className="text-[13px]">2026-02-15</span>
                            <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus, provident sint harum nobis alias quidem facere repudiandae quibusdam sapiente accusamus tenetur qui excepturi inventore modi hic soluta voluptatum exercitationem!</p>
                          </div>
                       </div>
                 </div>
        
                  <div className="review w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                       <div className="flex items-center gap-8 ">
                          <div className="img w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-[#2b62c6]">
                            <img src='./thumb-1.jpg' className='w-full h-full object-cover' alt='customerImg'/>
                          </div>
        
                          <div className="info w-[80%]">
                            <div className=" flex items-center justify-between">
                                  <h4 className="text-[16px] font-[500]">Naveen Kumar</h4>
                                 <Rating  name='read-only' value={4} readOnly size='small'/>
                            </div>
                            <span className="text-[13px]">2026-02-15</span>
                            <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus, provident sint harum nobis alias quidem facere repudiandae quibusdam sapiente accusamus tenetur qui excepturi inventore modi hic soluta voluptatum exercitationem!</p>
                          </div>
                       </div>
                 </div>
        
                  <div className="review w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                       <div className="flex items-center gap-8 ">
                          <div className="img w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-[#2b62c6]">
                            <img src='./thumb-1.jpg' className='w-full h-full object-cover' alt='customerImg'/>
                          </div>
        
                          <div className="info w-[80%]">
                            <div className=" flex items-center justify-between">
                                  <h4 className="text-[16px] font-[500]">Naveen Kumar</h4>
                                 <Rating  name='read-only' value={4} readOnly size='small'/>
                            </div>
                            <span className="text-[13px]">2026-02-15</span>
                            <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus, provident sint harum nobis alias quidem facere repudiandae quibusdam sapiente accusamus tenetur qui excepturi inventore modi hic soluta voluptatum exercitationem!</p>
                          </div>
                       </div>
                 </div>
                 
            </div>
        
            <br/><br/>
        </>

        :

         <div className="flex items-center justify-center h-96">
             <CircularProgress color='inherit'/>
         </div>

    }

   

       

   
   
    
    </>
  )
}

export default ProductDeatails
