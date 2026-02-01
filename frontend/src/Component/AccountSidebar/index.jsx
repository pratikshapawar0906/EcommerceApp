import React, { useEffect } from 'react'
import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoBagHandleOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {  uploadImage } from '../../utils/api';

const AccountSidebar = () => {
    const Context=useContext(MyContext);
    const [preview,setPreview]=useState([])
    const[uploading,setuploading]=useState(false);
    // const[formFields, setFormFields]=useState({ images: []})
    
    useEffect(()=>{
        const userAvatar=[];
        if(Context?.userData?.avatar !==undefined && Context?.userData?.avatar !==""){
            userAvatar.push(Context?.userData?.avatar);
           setPreview(userAvatar);
        }
    },[Context?.userData])
    
    // let img_arr=[];
    // let uniqueArray=[];
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
                formdata.append(`avatar`,file);

                
            }else{
                setuploading(false);
                Context.alertBox("error","Please Select a valid PNG,JPEG,WEBP or JPG image file")
                return false
            }
        }
        uploadImage("/api/user/user-avatar",formdata).then((res)=>{
        setuploading(false)
        setPreview([res.data.avatar]);
        })
        
     } catch (error) {
        console.log(error)
     }

    }
  return (
    <>
               <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
                    <div className="w-full p-5 flex items-center justify-center flex-col">
                        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group
                        flex items-center justify-center bg-gray-200">
                             {
                                uploading === true ? <CircularProgress color="inherit" /> 
                                :
                                <>
                                {
                                    preview?.length !==0 ? preview?.map((img,index)=>{
                                         return (
                                            <img src={img}  key={index} className='w-full h-full object-cover'/>
                                         )
                                    })
                                    :
                                    <img src="../Img/userImage.jpeg" className='w-full h-full object-cover'/>
                                }
                               </>
                             }
                        

                             <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
                             flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                                <FaCloudUploadAlt className='text-[#fff] text-[25px]'/>
                                <input type="file"  accept='image/*' className=' absolute top-0 left-0 w-full h-full opacity-0'
                                onChange={(e)=>onChangeFile(e,`/api/user/user-avatar`)} name='avatar'/>
                             </div>
                        </div>

                        <h3 className="">{Context?.userData?.name}</h3>
                        <h6 className="text-[13px] font-[500]">{Context?.userData?.email}</h6>
                    </div>

                    <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>

                        <li className='w-full'>
                            <NavLink to="/my-account"  className={({ isActive }) => isActive ? "active" : ""}>

                                <Button className='flex items-center !px-5 !text-left 2 !justify-start gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)]
                                !capitalize'>
                                  <FaRegUser className='text-[15px]'/>User Profile</Button>
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink to="/my-list"  className={({ isActive }) => isActive ? "active" : ""}>
                                <Button className='flex items-center !px-5 !text-left !py-2 !justify-start gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)]
                                !capitalize '>
                                  <MdOutlineFavoriteBorder className='text-[17px]'/>My List</Button>
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink to="/my-orders"  className={({ isActive }) => isActive ? "active" : ""}>
                               <Button className='flex items-center !px-5 !text-left  !py-2 !justify-start gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)]
                               !capitalize'>
                                 <IoBagHandleOutline className='text-[17px]'/>My Orders</Button>
                            </NavLink>
                        </li>


                        <li className='w-full'>
                            <NavLink to="/logout" className={({ isActive }) => isActive ? "active" : ""}>
                                <Button className='flex items-center !px-5 !text-left !py-2 !justify-start gap-2 w-full !rounded-none !text-[rgba(0,0,0,0.8)]
                                !capitalize'>
                                  <FiLogOut className='text-[18px]'/>Logout</Button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
    </>
  )
}

export default AccountSidebar
