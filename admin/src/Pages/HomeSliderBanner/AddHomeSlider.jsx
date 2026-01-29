import React from 'react'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import UploadBox from '../../Component/UploadBox'
import Button from '@mui/material/Button'

const AddHomeSlider = () => {
  return (
    <>
      <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3">
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4">
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

                   
                    <UploadBox multiple={true}/>
                </div>
            </div>
            <br/>
            
            <br/>
            <br/>
            <div className="w-[250px]">
                <Button type="button" className="btn-blue btn-lg  w-full flex gap-2">
                    <IoMdCloudUpload className='text-[25px] text-white' />Publish and view</Button>
            </div>
        </form>
      </section>
    </>
  )
}

export default AddHomeSlider
