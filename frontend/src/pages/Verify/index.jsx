import React, { useContext, useEffect, useState } from 'react'
import OtpBox from '../../Component/OtpBox'
import Button from '@mui/material/Button'
import { postData } from '../../utils/api'
import CircularProgress from '@mui/material/CircularProgress'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
     const[otp, setOtp]=useState("")
     const[isLoading,setIsLoading]=useState(false);
     const Context=useContext(MyContext)
     const handleOtpChange=(value)=>{
        setOtp(value)
     }

      const history=useNavigate()

        const actionType=localStorage.getItem("actionType")

     const verifyOTP=(e)=>{
        e.preventDefault();
        const actionType=localStorage.getItem("actionType")
            if(actionType !== "forgot-password"){
               setIsLoading(true);
            postData("/api/user/verifyEmail",{
              email:localStorage.getItem("userEmail"),
              otp:otp
            }).then((res)=>{
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Verify OTP successfull!" );
                   setIsLoading(false)
                   localStorage.removeItem("userEmail")
                   history('/login')
                   
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
            })
            .catch((err) => {
              Context.alertBox( "error",  "Server error!" );
              console.error(err);
            });
        }else{
             postData("/api/user/verify-forgot-password",{
              email:localStorage.getItem("userEmail"),
            }).then((res)=>{
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Verify OTP successfull!" );
                   setIsLoading(false)
                   localStorage.removeItem("userEmail")
                   history('/reset-password')
                   
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
            })
            .catch((err) => {
              Context.alertBox( "error",  "Server error!" );
              console.error(err);
            });
        }

        
     }
  return (
    <>
        <section className="section py-10">
            <div className="conatiner">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-[#ffffff]
                p-4 px-10">
                <div className="text-center flex items-center justify-center ">
                    <img src='../Img/Verify3.png' width="80"/>
                </div>
                <h3 className=" text-center text-[#000] text-[18px] mt-4 mb-1">Verify OTP </h3>
                <p className="text-center mt-0 mb-4">OTP send to <span className="text-[#ff5252] font-bold ">{ localStorage.getItem("userEmail")} </span></p>

                <form className='' onSubmit={verifyOTP}>
                    <OtpBox length={6} onChange={handleOtpChange}/>

                    <div className="flex items-center justify-center mt-5 px-3">
                        <Button type='submit' className='w-full btn-org btn-lg'>
                        {
                            isLoading === true ?  <CircularProgress color="inherit" /> 
                            :
                             'Verify OTP'
                        }</Button>
                    </div>
                </form>

            
                </div>
            </div>
        </section>
    </>
  )
}

export default Verify
