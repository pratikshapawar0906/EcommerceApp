import React, { useContext } from 'react'
import { FaRegImages } from "react-icons/fa";
import { uploadImage } from '../../utils/api';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';

const UploadBox = (props) => {
  const[uploading,setuploading]=useState(false);
  const [preview,setPreview]=useState([])
  const Context=useContext(MyContext)

  let selectedImages=[];
     
    const onChangeFile=async(e)=>{
     try {
        const formdata=new FormData();
        setPreview([]);
        const files = e.target.files;
        setuploading(true);
        for(var i=0;i<files.length;i++){
            if(
                files[i] &&
                (files[i].type ==='image/jpeg'||
                 files[i].type ==='image/jpg'||
                 files[i].type ==='image/png'||
                 files[i].type ==='image/webp')
            ){
                const file=files[i];
                selectedImages.push(file);
                formdata.append(props?.name,file);
                
            }else{
                setuploading(false);
                Context.alertBox("error","Please Select a valid PNG,JPEG,WEBP or JPG image file")
                return false
            }
        }
        uploadImage("/api/category/upload-Image",formdata).then((res)=>{
        setuploading(false)
        props.setPreviewFun(res.data.images);

        })
        
     } catch (error) {
        console.log(error)
     }
    }
  return (
    <>
      <div className="uploadbox p-3 rounded-md overflow-hidden border border-dashed
      border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
      flex items-center justify-center flex-col relative" >
        {
            uploading === true ? ( <CircularProgress color="inherit" /> 
            ):(
            <>
            <FaRegImages className='text-[40px] opacity-35 pointer-events-none ' />

            <h4 className="text-[14px] pointer-events-none">Media Upload</h4>
            <input type='file' accept='image/*' multiple={props.multiple!==undefined ? props.multiple : false } 
            className='absolute top-0 left-0 w-full h-full z-50 opacity-0'onChange={(e)=>onChangeFile(e,props?.url)} name={props?.name}/>
        </>
            )
        }

        
      </div>
    </>
  )
}

export default UploadBox
