import React, { useEffect, useState } from 'react'
import Homeslider from '../../Component/Homeslider'
import Catslider from '../../Component/Catslider'
import { TbTruckDelivery } from "react-icons/tb";
import AdsBannerSlider from '../../Component/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductSlider from '../../Component/ProductSlider';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import BlogItem from '../../Component/BlogItem';

import AdsBannerSliderV2 from '../../Component/AdsBannerSliderv2';
import { fetchDataFromApi } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import ProductLoading from '../../Component/ProductLoading';


const Home = () => {
   const [value, setValue] = useState(0);
   const [homeSlideData,setHomeSlideData]=useState([])
   const[popularProductData,setPopularProductData]=useState([]);
   const[allProducts,setAllProducts]=useState([]);
   const[allFeturedProducts,setAllFeturedProducts]=useState([]);
   const[allBlogData,setAllBlogData]=useState([]);
   const [bannerData,setBannerData]=useState([]);
       const Context=useContext(MyContext)
   
      
   useEffect(()=>{
      fetchDataFromApi('/api/homeSlider/get').then((res)=>{
        setHomeSlideData(res?.data)
      })

      fetchDataFromApi('/api/blog/get').then((res)=>{
        setAllBlogData(res?.data)
      })

      fetchDataFromApi('/api/banner/get').then((res)=>{
        setBannerData(res?.data)
      })

      fetchDataFromApi('/api/product/getAllProducts').then((res)=>{
        setAllProducts(res?.data)
      })

       fetchDataFromApi('/api/product/getProdFeatured').then((res)=>{
        setAllFeturedProducts(res?.product)
      })

      

   },[])

   useEffect(() => {
      if (Context?.catData?.length > 0) {
        const firstCatId = Context.catData[0]._id;
    
        fetchDataFromApi(`/api/product/getProdByCatId/${firstCatId}`)
          .then((res) => {
            if (res?.success) {
              setPopularProductData(res.data);
              setValue(0); 
            }
          });
      }
    }, [Context?.catData]);
   

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId=(id)=>{
     setPopularProductData([])
     fetchDataFromApi(`/api/product/getProdByCatId/${id}`).then((res)=>{
       if(res?.success){
          setPopularProductData(res?.data)
          
       }
      })
  }


  return (
    <>
    {
      homeSlideData?.length !==0  && <Homeslider data={homeSlideData}/>
    }
     

      {
        Context?.catData?.length !==0 &&  <Catslider data={Context?.catData}/>
      }


     

      <section className='bg-white py-8'>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className='text-[20px] font-[600]'>Popular Products</h2>
              <p className='text-[14px] font-[400] mt-0 mb-0'> Do not miss the current offers until the end of March.</p>
            </div>
            <div className="rightSec w-[60%]">
              
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {
                   Context?.catData?.map((item,index)=>{
                      return(
                        <Tab label={item?.name}
                        onClick={()=>filterByCatId(item?._id)}
                         />
                      )
                    })
                  }
                </Tabs>
              
            </div>
          </div>
           {
            popularProductData?.length === 0 && <ProductLoading/>
            }

        {
        popularProductData?.length !==0 &&  <ProductSlider  items={6} data={popularProductData}/>
         }

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
         {
           bannerData?.length !== 0 &&   <AdsBannerSlider items={4} data={bannerData}/>
         }
          
       </div>
      </section>


      <section className='py-5 pt-0 bg-white'>
          <div className="container">
            <h2 className='text-[20px] font-[600]'>Latest Products</h2>
             {
              allProducts?.length ===0 && <ProductLoading/>
             }
            {
              allProducts?.length !==0 &&   <ProductSlider  items={6} data={allProducts}/>
            }
           

             <AdsBannerSliderV2 items={3}/>
          </div>
      </section>

      <section className='py-5 pt-0 bg-white'>
          <div className="container">
            <h2 className='text-[20px] font-[600]'>Featured Products</h2>
            {
              allFeturedProducts?.length ===0 && <ProductLoading/>
             }
             
            {
              allFeturedProducts?.length !==0 &&   <ProductSlider  items={6} data={allFeturedProducts}/>
            }

             <AdsBannerSlider items={3}/>
          </div>
      </section>
     
     {
        allBlogData?.length !==0 && 
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
          {
             allBlogData?.map((item,index)=>{
              return(
                <SwiperSlide key={index}>
                  <BlogItem item={item}/>
                </SwiperSlide>
              )
             })
          }
          
         </Swiper>
        </div>
      </section>
     }
      <br/>
       
      
    </>
  )
}

export default Home
