import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';
import OtpBox from '../../Component/OtpBox'

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
    <section className=" bg-white w-full h-[100vh] ">
          <header className=' w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>
            <Link to=''><img src='./logo.a795e14a.svg' className='w-[200px]'/></Link>


            <div className="flex items-center gap-0">
                <NavLink to='/login' exact={true} activeClassName='isActive' >
                    <Button className='rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                        <CgLogIn className='text-[18px] '/>Login
                    </Button>
                </NavLink>
                <NavLink to='/sign-up' exact={true} activeClassName='isActive'>
                    <Button className='rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                        <FaRegUser className='text-[15px] '/>Sign up
                    </Button>
                </NavLink>
            </div>
          </header>

          <div className="loginBox card w-[600px] h-[auto] pb-20  mx-auto pt-20 relative z-50">
             <div className="text-center">
                  <img src='./Verify3.png' className='w-[100px] m-auto'/>
             </div>

             <h1 className="text-center text-[35px] font-[700] mt-4"> Welcome Back! <br/>
              <span className="text-[#3872fa]"> Please Verify your Email.</span> </h1>

            <br/>
              <p className=" text-center text-[15px]">OTP send to 
                  <span className="text-[#3872fa] font-bold"> abc@example.com</span>
              </p>

             <br/>

             {/* <div className="text-center flex items-center justify-center flex-col">
                <OtpBox />
             </div> */}

             <form className='' onSubmit={verifyOTP}>
                    <OtpBox length={6} onChange={handleOtpChange}/>

                    <div className="flex items-center justify-center mt-5 px-3 w-[300px] m-auto">
                        <Button type='submit' className='w-full btn-blue btn-lg'>Verify OTP</Button>
                    </div>
            </form>
             
          </div>
      </section>
    </>
  )
}

export default Verify
