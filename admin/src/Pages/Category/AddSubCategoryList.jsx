import React, { useState } from 'react'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import UploadBox from '../../Component/UploadBox'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const AddSubCategoryList = () => {
   const [productCat, setProductCat] = useState('');

   const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  return (
    <>
      <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3">
          
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-4 mb-3 gap-5">
                 <div className="col ">
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
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'/>
                </div>
            </div>
            <br/>
             
            </div>
          
            <div className="w-[250px]">
                <Button type="button" className="btn-blue btn-lg  w-full flex gap-2">
                    <IoMdCloudUpload className='text-[25px] text-white' />Publish and view</Button>
            </div>
        </form>
      </section>
    </>
  )
}

export default AddSubCategoryList
