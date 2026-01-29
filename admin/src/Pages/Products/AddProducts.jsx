import React, { useState } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";

const AddProducts = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productRams, setProductRams] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productSize, setProductSize] = useState('');

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
  };

  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };
  return (
    <>
      <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3">
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-1 mb-3">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'/>
                </div>
            </div>
            <div className="grid grid-cols-1 mb-3">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Description</h3>
                    <textarea type='text' className='w-full h-[130px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productCat}
                      label="Category"
                      onChange={handleChangeProductCat}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={10}>Fashion</MenuItem>
                      <MenuItem value={20}>Beauty</MenuItem>
                      <MenuItem value={30}>Wellness</MenuItem>
                    </Select>
                </div>

                  <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Sub Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productSubCat}
                      label="Category"
                      onChange={handleChangeProductSubCat}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={10}>Men</MenuItem>
                      <MenuItem value={20}>Women</MenuItem>
                      <MenuItem value={30}>kids</MenuItem>
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Price</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Old Price</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>                
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productFeatured}
                      label="Category"
                      onChange={handleChangeProductFeatured}
                    >
                     
                      <MenuItem value={10}>True</MenuItem>
                      <MenuItem value={20}>False</MenuItem>
                      
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '/>
                </div>
            </div>

            <div className="grid grid-cols-4 mb-3 gap-4">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product RAMS</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productRams}
                      label="Category"
                      onChange={handleChangeProductRams}
                    >
                      <MenuItem value={'4GB'}>4GB</MenuItem>
                      <MenuItem value={'6GB'}>6GB</MenuItem>
                      <MenuItem value={'8GB'}>8GB</MenuItem>
                     
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Weight</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productWeight}
                      label="Category"
                      onChange={handleChangeProductWeight}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={10}>2kG</MenuItem>
                      <MenuItem value={20}>4kG</MenuItem>
                      <MenuItem value={30}>8kG</MenuItem>
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Size</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productSize}
                      label="Category"
                      onChange={handleChangeProductSize}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={'XS'}>XS</MenuItem>
                      <MenuItem value={'S'}>S</MenuItem>
                      <MenuItem value={'L'}>L</MenuItem>
                      <MenuItem value={'Xl'}>Xl</MenuItem>
                      <MenuItem value={'XXl'}>XXl</MenuItem>
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Rating</h3>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                    
                </div>

                             
            </div>

            <div className="col w-full p-5 px-0">
                <h3 className="font-[700] text-[18px] mb-3">Media and Images</h3>
                
                <div className="grid grid-cols-7 gap-4">
                    <div className="uploadBoxWrapper relative">
                        <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                         rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer ">
                            <IoMdClose className='text-white text-[10px]' />
                        </span>
                        <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                         border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                         flex items-center justify-center flex-col relative" >
                            
                            <LazyLoadImage  src='./product-2.webp ' alt='image'  effect='blur'
                            wrapperProps={{
                                style:{transitionDelay:'1s'}
                            }}
                            className='w-full h-full object-cover'/>
                        
                        </div>
                    </div>

                    <div className="uploadBoxWrapper relative">
                        <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                         rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer ">
                            <IoMdClose className='text-white text-[10px]' />
                        </span>
                        <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                         border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                         flex items-center justify-center flex-col relative" >
                            
                            <LazyLoadImage  src='./product-2.webp ' alt='image'  effect='blur'
                            wrapperProps={{
                                style:{transitionDelay:'1s'}
                            }}
                            className='w-full h-full object-cover'/>
                        
                        </div>
                    </div>

                    <div className="uploadBoxWrapper relative">
                        <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                         rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer ">
                            <IoMdClose className='text-white text-[10px]' />
                        </span>
                        <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                         border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                         flex items-center justify-center flex-col relative" >
                            
                            <LazyLoadImage  src='./product-2.webp ' alt='image'  effect='blur'
                            wrapperProps={{
                                style:{transitionDelay:'1s'}
                            }}
                            className='w-full h-full object-cover'/>
                        
                        </div>
                    </div>

                    <div className="uploadBoxWrapper relative">
                        <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                         rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer ">
                            <IoMdClose className='text-white text-[10px]' />
                        </span>
                        <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                         border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                         flex items-center justify-center flex-col relative" >
                            
                            <LazyLoadImage  src='./product-2.webp ' alt='image'  effect='blur'
                            wrapperProps={{
                                style:{transitionDelay:'1s'}
                            }}
                            className='w-full h-full object-cover'/>
                        
                        </div>
                    </div>

                    <div className="uploadBoxWrapper relative">
                        <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                         rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer ">
                            <IoMdClose className='text-white text-[10px]' />
                        </span>
                        <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                         border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                         flex items-center justify-center flex-col relative" >
                            
                            <LazyLoadImage  src='./product-2.webp ' alt='image'  effect='blur'
                            wrapperProps={{
                                style:{transitionDelay:'1s'}
                            }}
                            className='w-full h-full object-cover'/>
                        
                        </div>
                    </div>
                    <UploadBox multiple={true}/>
                </div>
            </div>
            
            </div>
            <br/>
            <hr/>
            <br/>
            <Button type="button" className="btn-blue btn-lg  w-full flex gap-2">
                <IoMdCloudUpload className='text-[25px] text-white' />Publish and view</Button>
        </form>
      </section>
    </>
  )
}

export default AddProducts
