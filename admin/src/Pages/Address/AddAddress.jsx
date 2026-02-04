import React from 'react'
import {  IoMdCloudUpload } from 'react-icons/io'
import Button from '@mui/material/Button'
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css'
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {  fetchDataFromApi, postData } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';


const AddAddress = () => {
    const Context=useContext(MyContext)
    const [phone,setPhone]=useState('')
   
    const[isLoading,setIsLoading]=useState(false);
    const[status,setStatus]=useState(false);
     const[formFields, setFormFields]=useState({addressLine1:'',  city:'',state:'',
       pincode:'', country:'',mobile:'', status:'',selected:false
     })
     


    
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      setFormFields(prev => ({
        ...prev,
        status: event.target.value
      }));
    };


    const valideValue=Object.values(formFields).every(el=>el);
    
    const onChangeInput=(e)=>{
      const {name, value}= e.target;
      setFormFields(()=>{
          return{
              ...formFields,
              [name]:value
          }
      })
    }

    const handleSubmit=(e)=>{
           e.preventDefault();
           if(formFields.addressLine1 === "" ){
              Context.alertBox("error", "Please add Address ");
               return  false
           }
           if(formFields.city === ""){
           Context.alertBox("error", "Please add city")
           return false
           }
           if(formFields.state === ""){
           Context.alertBox("error", "Please add state")
           return false
           }
           if(formFields.pincode === ""){
           Context.alertBox("error", "Please add Full Pincode")
           return false
           }
          if(formFields.country === ""){
           Context.alertBox("error", "Please add Country")
           return false
          }
          if(phone === ""){
          Context.alertBox("error", "Please add Phone")
          return false
          }
          setIsLoading(true);
       postData(`/api/address/add`, formFields,{ withCredentials :true}).then((res)=>{
           if(res?.success){
              Context.alertBox( "success",  res?.data?.message || "Profile updated successfully" );
              setIsLoading(false)
    
              
              Context.setIsLogin(true)
              Context?.setIsFullScreenPanel({
                 open:false
              })

               fetchDataFromApi(`/api/address/get?userId=${Context?.userData?._id}`).then((res)=>{
                     Context?.setAddress(res.data);
                })
          
           } else {
              Context.alertBox( "error", res?.data?.message || "error updating Profile" );
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
    <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3" onSubmit={handleSubmit}>
          
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
                <div className="grid grid-cols-2 mb-3 gap-4">
                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">Address Line 1</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='addressLine1' onChange={onChangeInput}
                        value={formFields.addressLine1} disabled={isLoading===true ? true:false} />
                    </div>
                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">City</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='city' onChange={onChangeInput}
                        value={formFields.city} disabled={isLoading===true ? true:false} />
                    </div>
                </div>

                <div className="grid grid-cols-3 mb-3 gap-4">
                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">State</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='state' onChange={onChangeInput}
                        value={formFields.state} disabled={isLoading===true ? true:false} />
                    </div>
                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">Pincode</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  name='pincode' onChange={onChangeInput}
                        value={formFields.pincode} disabled={isLoading===true ? true:false} />
                    </div>
                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">Country</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='country' onChange={onChangeInput}
                        value={formFields.country} disabled={isLoading===true ? true:false} />
                    </div>
                     <div className="col w-[50%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">Mobile</h3>
                        <PhoneInput defaultCountry="in" value={phone} disabled={isLoading===true ? true:false}  onChange={(phone) => {
                          setPhone(phone);
                          setFormFields(prev => ({
                            ...prev,
                            mobile: phone
                          }));
                        }}
                        />
                    </div>

                    <div className="col w-[100%]">
                        <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>
                        <Select
                          labelId="demo-simple-select-label"
                          id="productCatDrop"
                          size='small'
                          className='w-full'
                          value={status}
                          label="Category"
                          onChange={handleChangeStatus}
                        >
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                          
                        </Select>
                    </div>
                </div>
            <br/>
             
                  
            </div>
            <br/>
            
            <br/>
            <br/>
            <div className="w-[250px]">
                <Button disabled={!valideValue}  type='submit' className="btn-blue btn-lg  w-full flex gap-2">
                    {
                      isLoading ===true ? <CircularProgress color='inherit'/>
                      :
                      'Publish and view'
                    }
                    <IoMdCloudUpload className='text-[25px] text-white'   />
                </Button>
            </div>
        </form>
      </section>
    </>
  )
}

export default AddAddress