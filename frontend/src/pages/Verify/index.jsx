import React, { useState } from 'react'
import OtpBox from '../../Component/OtpBox'
import Button from '@mui/material/Button'

const Verify = () => {
     const[otp, setOtp]=useState("")
     const handleOtpChange=(value)=>{
        setOtp(value)
     }

     const verifyOTP=(e)=>{
        e.preventDefault();
       alert();
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
                <p className="text-center mt-0 mb-4">OTP send to <span className="text-[#ff5252] font-bold ">abc@example.com</span></p>

                <form className='' onSubmit={verifyOTP}>
                    <OtpBox length={6} onChange={handleOtpChange}/>

                    <div className="flex items-center justify-center mt-5 px-3">
                        <Button type='submit' className='w-full btn-org btn-lg'>Verify OTP</Button>
                    </div>
                </form>

            
                </div>
            </div>
        </section>
    </>
  )
}

export default Verify
