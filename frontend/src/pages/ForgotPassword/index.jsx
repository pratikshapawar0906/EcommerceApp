import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';

const  ForgotPassword = () => {

    const[formFields, setFormFields]=useState({email:localStorage.getItem("userEmail"), newPassword:'', confirmPassword:''})
    const Context=useContext(MyContext)
    const[isLoading,setIsLoading]=useState(false);

    const history=useNavigate()

    const [isShowPassword1, setIsShowPassword1]=useState(false);
    const [isShowPassword2, setIsShowPassword2]=useState(false);

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
                if(formFields.newPassword === ""){
                Context.alertBox("error", "Please add New Password")
                return 
                }

                if(formFields.confirmPassword === ""){
                Context.alertBox("error", "Please add confirm Password")
                return 
                }

                if(formFields.confirmPassword !== formFields.newPassword ){
                Context.alertBox("error", "newPassword and confirm Password are not  match")
                return 
                }
            
            postData("/api/user/reset-password", formFields,{ withCredentials :true}).then((res)=>{
                if(res?.success){
                   localStorage.removeItem("userEmail")
                   localStorage.removeItem("actionType")
                   localStorage.removeItem("refreshToken")
                   Context.alertBox( "success",  res?.message || "Password Comfirm successful!" );
                   setIsLoading(false)
                   setFormFields({
                        newPassword:'', confirmPassword:''
                   })
                   setIsLoading(true);
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
           }
    
  return (
    <>
        <section className="section py-10">
            <div className="conatiner">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-[#ffffff]
                p-4 px-10">
                <h3 className=" text-center text-[#000] text-[18px]"> Forgot Password </h3>

                <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
                    <div className="form-group w-fill mb-5 relative">
                         <TextField  type={isShowPassword1 === false ? 'password' : 'text'}  value={formFields.newPassword} id=" Password" label="Password" variant="outlined" className='w-full' name='newPassword'
                         disabled={isLoading===true ? true:false}  onChange={onChangeInput} />
                         <Button type="submit"className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword1(!isShowPassword1)}}>
                            {
                               isShowPassword1 === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    <div className="form-group w-fill relative">
                         <TextField type={isShowPassword2 === false ? 'password' : 'text'} id="Comfirm Password" value={formFields.confirmPassword} label="Password" variant="outlined" className='w-full' name="confirmPassword"
                         disabled={isLoading===true ? true:false} onChange={onChangeInput}/>
                         <Button type="submit"className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword2(!isShowPassword2)}}>
                            {
                               isShowPassword2 === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    <div className="flex items-center  w-full mt-3 mb-3">
                        <Button type="submit" disabled={!valideValue} className='btn-org btn-lg w-full'>
                            {
                                isLoading === true ?  <CircularProgress color="inherit" /> 
                                :
                                 'Change Password'
                            }</Button>
                    </div>

                  
                </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default ForgotPassword
