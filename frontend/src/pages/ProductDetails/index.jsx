import Breadcrumbs from '@mui/material/Breadcrumbs'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductZoom from '../../Component/ProductZoom'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import ProductSlider from '../../Component/ProductSlider'
import ProductDetailsModel from '../../Component/ProductDetailsModel'

const ProductDetails = () => {

  const[ activeTab ,setActiveTab]=useState(0)
  return (
    <>

    <div className='py-5 '>
          <div className='container'>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" className='link transition-all'>
               Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/"
                className='link transition-all text-[14px]'
              >
                Fashion
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/"
                className='link transition-all text-[14px]'
              >
                Fit Spread collar Shirt
              </Link>
            </Breadcrumbs>
          </div>

      
    </div>

    <section className="bg-[#ffffff] py-5">
      <div className="container flex gap-8 items-center">
            <div className="productZoomContainer w-[40%] ">
                <ProductZoom/>
            </div>
                
            <div className="productContent w-[60%] pr-10 pl-10">
              <ProductDetailsModel/>               

            </div>

      </div>


      <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span className={` link text-[17px] cursor-pointer font-[500]  ${activeTab === 0 && 'text-[#ff5252]'}`} onClick={()=>setActiveTab(0)}> Descripation</span>
            <span className={` link text-[17px] cursor-pointer font-[500]  ${activeTab === 1 && 'text-[#ff5252]'}`} onClick={()=>setActiveTab(1)}> Product Details</span>
            <span className={` link text-[17px] cursor-pointer font-[500]  ${activeTab === 2 && 'text-[#ff5252]'}`} onClick={()=>setActiveTab(2)}> Reviews (5)</span>
          </div>

          {
            activeTab === 0   && (
               <div className="shadow-md w-full py-5 px-8 rounded-md">
                 <p className="">
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                 </p>
                 
               </div>
            )
          }
          {
            activeTab === 1 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
                <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table class="w-full text-sm text-left rtl:text-right text-body">
                        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Color
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-neutral-primary border-b border-default">
                                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                                <td class="px-6 py-4">
                                    231
                                </td>
                            </tr>
                            <tr class="bg-neutral-primary border-b border-default">
                                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    Microsoft Surface Pro
                                </th>
                                <td class="px-6 py-4">
                                    White
                                </td>
                                <td class="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td class="px-6 py-4">
                                    $1999
                                </td>
                                <td class="px-6 py-4">
                                    423
                                </td>
                            </tr>
                            <tr class="bg-neutral-primary">
                                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    Magic Mouse 2
                                </th>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                <td class="px-6 py-4">
                                    Accessories
                                </td>
                                <td class="px-6 py-4">
                                    $99
                                </td>
                                <td class="px-6 py-4">
                                    121
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>

            )
          }
          {
            activeTab === 2 && (
              <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
                <div className="w-full productReviewConatiner">
                  <h2 className="text-[18px]">Customer questions & answers</h2>
  
                   <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden
                   mt-5 pr-5">
                     <div className="review  pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]w-full flex items-center justify-between">
                       <div className="info  w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
                           <img src="../Img/userImg.webp" className='w-full'/>
                        </div>

                        <div className="w-[80%] ">
                          <h3 className='!text-[16px] font-[500]'>Rinku Verma</h3>
                          <h5 className='text-[13px] mb-0'>2024-12-1</h5>
                          <p className='mt-0 mb-0'>Nice Product</p>
                        </div>
                       </div>
                       <Rating name="size-small" defaultValue={4}  readOnly />
                     </div>

                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                       <div className="info  w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
                           <img src="../Img/userImg.webp" className='w-full'/>
                        </div>

                        <div className="w-[80%] ">
                          <h3 className='!text-[16px] font-[500]'>Raj</h3>
                          <h5 className='text-[13px] mb-0'>2025-10-07</h5>
                          <p className='mt-0 mb-0'>well</p>
                        </div>
                       </div>
                       <Rating name="size-small" defaultValue={3}  readOnly />
                     </div>

                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                       <div className="info  w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
                           <img src="../Img/userImg.webp" className='w-full'/>
                        </div>

                        <div className="w-[80%] ">
                          <h3 className='!text-[16px] font-[500]'>Piprotar Rahul</h3>
                          <h5 className='text-[13px] mb-0'>2025-10-06</h5>
                          <p className='mt-0 mb-0'>best product i have ever seen in my life</p>
                        </div>
                       </div>
                       <Rating name="size-small" defaultValue={5}  readOnly />
                     </div>

                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                       <div className="info  w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
                           <img src="../Img/userImg.webp" className='w-full'/>
                        </div>

                        <div className="w-[80%] ">
                          <h3 className='!text-[16px] font-[500]'>Sagar Ram</h3>
                          <h5 className='text-[13px] mb-0'>2025-08-08</h5>
                          <p className='mt-0 mb-0'>good</p>
                        </div>
                       </div>
                       <Rating name="size-small" defaultValue={4}  readOnly />
                     </div>
                   </div>

                   <br/>

                   <div className="reviewForm bg-[#fafafa] p-4 rounded-md" >
                    <h2 className="text-[18px]  text-[#000]"> Add A Review</h2>
                       <form className='w-full mt-5'>
                         <TextField
                          id="outlined-multiline-static"
                          label="Write a review"
                          multiline
                          rows={6}    
                          className='w-full mb-5'       
                        />

                         <br/><br/>
                         <Rating name="size-small" defaultValue={4}  />

                         <div className="flex items-center mt-5 rounded-sm">
                          <Button className='btn-org'>Submit Review</Button>
                         </div>
                       </form>
                   </div>
                </div>
              </div>
            )
          }



         
      </div>


        <div className="container pt-8">
          <h2 className='text-[20px] font-[600] pb-3'>Related Product</h2>
            <ProductSlider  items={6}/>

        </div>
    </section> 

    
      
    </>
  )
}

export default ProductDetails
