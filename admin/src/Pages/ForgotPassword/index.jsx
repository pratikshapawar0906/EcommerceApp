import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { CgLogIn } from "react-icons/cg";
import {  FaRegUser } from "react-icons/fa6";
import { postData } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import {  useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const ForgotPassword = () => {
    const[formFields, setFormFields]=useState({email:localStorage.getItem("userEmail")})
     const Context=useContext(MyContext)
    const[isLoading,setIsLoading]=useState(false);

    const history=useNavigate()

    const onChangeInput=(e)=>{
        const {name, value}= e.target;
        setFormFields(()=>{
            return{
                ...formFields,
                [name]:value
            }
        })
    }

    const valideValue=Object.values(formFields).every(el=>el);
    
    const handleSubmit=(e)=>{
            e.preventDefault();
            setIsLoading(true);
            if(formFields.email === ""){
            Context.alertBox("error", "Please add email")
            return 
            }
        
        postData("/api/user/reset-password", formFields,{ withCredentials :true}).then((res)=>{
            if(res?.success){
               localStorage.removeItem("userEmail")
               localStorage.removeItem("actionType")
               localStorage.removeItem("refreshToken")
               Context.alertBox( "success",  res?.message || "Password Comfirm successful!" );
               setIsLoading(false)
            
               history('/change-password')
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

    
  return (
    <>
      
      <section className=" bg-white w-full  h-[100vh]">
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

             <h1 className="text-center text-[35px] font-[700] mt-4"> Having Trouble to sign in <br/>
              <span className="text-[#3872fa]">Reset Your Password </span> </h1>

             

             <br/>
           

             <br/>
             <form action="" className="w-full px-8 mt-3" onSubmit={handleSubmit}>
                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                  <input type='email' placeholder='Enter your email' className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] 
                  rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' value={formFields.email} name='email' disabled={isLoading===true ? true:false} onChange={onChangeInput}/>
                </div>

               

                

                <>
                    <Button className="btn-blue btn-lg w-full" type="submit" disabled={!valideValue}>
                        {
                            isLoading === true ?  <CircularProgress color="inherit" /> 
                            :
                             'Reset  Password'
                        }
                    </Button>
                </>

                <br/>
                <br/>

                <div className="text-center flex  items-center justify-center ap-4">
                    <span className="">Don't want to reset?</span>
                       <Link to='/login' className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700'>Sign In? </Link>
                </div>
             </form>
          </div>
      </section>
    </>
  )
}

export default ForgotPassword
