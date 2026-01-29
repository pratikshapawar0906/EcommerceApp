import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';

const  ForgotPassword = () => {


    const Context=useContext(MyContext)

    const history=useNavigate()

     const [isShowPassword1, setIsShowPassword1]=useState(false);
      const [isShowPassword2, setIsShowPassword2]=useState(false);

  
  return (
    <>
        <section className="section py-10">
            <div className="conatiner">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-[#ffffff]
                p-4 px-10">
                <h3 className=" text-center text-[#000] text-[18px]"> Forgot Password </h3>

                <form action="" className="w-full mt-5">
                    <div className="form-group w-fill mb-5 relative">
                         <TextField  type={isShowPassword1 === false ? 'password' : 'text'}  id=" Password" label="Password" variant="outlined" className='w-full' name='Password'/>
                         <Button type="submit"className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword1(!isShowPassword1)}}>
                            {
                               isShowPassword1 === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    <div className="form-group w-fill relative">
                         <TextField type={isShowPassword2 === false ? 'password' : 'text'} id="Comfirm Password" label="Password" variant="outlined" className='w-full' name="Password"/>
                         <Button type="submit"className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword2(!isShowPassword2)}}>
                            {
                               isShowPassword2 === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    <div className="flex items-center  w-full mt-3 mb-3">
                        <Button className='btn-org btn-lg w-full'>Change Password</Button>
                    </div>

                  
                </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default ForgotPassword
