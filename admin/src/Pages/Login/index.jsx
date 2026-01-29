import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { CgLogIn } from "react-icons/cg";
import { FaRegEye, FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaFacebook } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const Login = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFb, setLoadingFb] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    function handleClickGoogle() {
      setLoadingGoogle(true);
    }
   
    function handleClickFb() {
      setLoadingFb(true);
    }


  return (
    <>
      <section className=" bg-white w-full ">
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
                 <img src='./logo-short.18ca02a8.svg' className='m-auto'/>
             </div>

             <h1 className="text-center text-[35px] font-[700] mt-4"> Welcome Back! <br/>
              <span className="text-[#3872fa]"> Sign in with your credentials.</span> </h1>

             <div className="flex items-center justify-center w-full mt-5 gap-5">
                 <Button
                   size='small'
                   onClick={handleClickGoogle}
                   startIcon={<FcGoogle />}
                   loading={loadingGoogle}
                   loadingPosition="end"
                   variant="outlined"
                   className='!bg-none !text-[15px] !capitalize !py-2 !px-5 !text-[rgba(0,0,0,0.7)]'
                 >
                   Sign in with Google
                 </Button>

                 <Button
                   size='small'
                   onClick={handleClickFb}
                   startIcon={<FaFacebook  />}
                   loading={loadingFb}
                   loadingPosition="end"
                   variant="outlined"
                   className='!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                 >
                   Sign in with Facebbok
                 </Button>
             </div>

             <br/>
             <div className="w-full flex items-center justify-center gap-3">
              <span className="flex items-center w-[100px] h-[2px] bg-[rgba(0,0,0,0.2)]"></span>
                 <span className="text-[14px] font-[500]">Or, Sign up with your email</span>
              <span className="flex items-center w-[100px] h-[2px] bg-[rgba(0,0,0,0.2)]"></span>
             </div>

             <br/>
             <form action="" className="w-full px-8 mt-3">
                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                  <input type='email' className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                  rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'/>
                </div>

                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                  <div className="relative w-full">
                     <input type={isPasswordShow===false ? 'password':'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                     rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'/>
                     <Button className='!absolute top-[7px] right-[10px] z-50  !text-gray-600
                       !rounded-full ! w-[35px] !h-[35px] !min-w-[35px]' onClick={()=>setIsPasswordShow(!isPasswordShow)}>
                        {
                          isPasswordShow === false ? ( 
                          <FaRegEye className='text-[18px]'/> 
                        ) :( 
                          <FaEyeSlash  className='text-[18px]'/>
                        )}
                        
                    </Button>
                  </div>
                </div>

                <div className="form-group mb-4 w-full flex items-center justify-between">
                   <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                   <Link to='/forgot-password' className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700'>Forgot Password?</Link>
                </div>

                <Button className="btn-blue btn-lg w-full">Sign in</Button>
             </form>
          </div>
      </section>
    </>
  )
}

export default Login
