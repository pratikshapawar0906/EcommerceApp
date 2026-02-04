import React, { useEffect } from 'react'
import AccountSidebar from '../../Component/AccountSidebar';
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css'
import Radio from '@mui/material/Radio';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { FaTrash } from "react-icons/fa";

const label= {inputProps:{'aria-label':"Checkbox demo"}}

const AddAddress = () => {
   const Context=useContext(MyContext)
  const [phone,setPhone]=useState('')
  const[status,setStatus]=useState(true);
  const [open, setOpen] = useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const[formFields, setFormFields]=useState({addressLine1:'',  city:'',state:'',
    pincode:'', country:'',mobile:'', status:true,selected:false
  })
   const[userId,setUserId]=useState("")
  const[address ,setAddress]=useState([])
  const[selectedValue,setSelectedValue]=useState("")


  const handleChange=(event)=>{
    setSelectedValue(event.target.value)
  }


 

  useEffect(()=>{
       if(Context?.userData?._id !==undefined && Context?.userData?._id !==""){
             fetchDataFromApi(`/api/address/get?userId=${Context?.userData?._id}`).then((res)=>{
                setAddress(res.address);

                 const defaultAddress = res.address.find(addr => addr.selected === true);
                 if (defaultAddress) {
                   setSelectedValue(defaultAddress._id);
                 }
           })
  
           
           setUserId(Context?.userData?._id);
           const ph=`${Context?.userData?.mobile}`
           setPhone(ph);
        }
    },[Context?.userData])

  const handleClose = () => {
    setOpen(false)
  };

 

  const handleChangeStatus=(event)=>{
    setStatus(event.target.value);
    setFormFields((prevState)=>({
      ...prevState,
      userId: Context?.userData?._id,
      
    }))
    
  }
  
  const  removeAddress=(id)=>{
     deleteData(`/api/address/${id}`)
     .then((res)=>{
       fetchDataFromApi(`/api/address/get?userId=${Context?.userData?._id}`).then((res)=>{
                setAddress(res.address);
      })
     })
  }

  

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
                 return false
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
             return  false
            }
            if(phone === ""){
            Context.alertBox("error", "Please add Phone")
            return false
            }

            
            setIsLoading(true);
         postData(`/api/address/add`, formFields,{ withCredentials :true}).then((res)=>{
          console.log(res)
             if(res?.success){
                Context.alertBox( "success",  res?.data?.message || "Address Added successfully" );
                setIsLoading(false)
      
                
                Context.setIsLogin(true)
  
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
    <section className="py-10 w-full">
        <div className="container  flex  gap-5">
            <div className="col1 w-[20%]">
              <AccountSidebar/>
            </div>

            <div className=" col2 w-[50%]">
                <div className="card bg-white p-5 shadow-md  rounded-md mb-5">
                    <div className="flex items-center pb-3">
                      <h2 className="pb-3">Address</h2>
                    </div>

                    <hr/>

                     <div className=" flex items-center justify-center p-5 border border-dashed 
                                 border-[rgba(0,0,0,0.2) bg-[#f1faff] hover:bg-[#f1faff] cursor-pointer"
                                 onClick={()=>setOpen(true)}>
                                  <span className="text-[16px] font-[500]"> Add Address</span>
                              </div>
                              <br/>
                    
                              <div className="flex gap-2 flex-col mt-4 ">
                              {address?.length > 0 &&
                                address.map((item, index) => {
                              
                                  const addressValue = `${item.addressLine1}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`;
                              
                                  return (
                                  
                                    <div
                                      key={index}
                                      className={` group relative  bg-[#f1f1f1] rounded-md p-3 cursor-pointer w-full flex items-center
                                      border border-dashed border-[rgba(0,0,0,0.2)]`} onClick={() => setSelectedValue(item)}
                                    >
                                       <div className="mr-auto">
                                         <Radio
                                           name="address"
                                           value={item?._id}
                                           checked={selectedValue?._id === item?._id}
                                           onChange={handleChange}
                                           
                                         />
                                 
                                         <span className="text-[12px] ml-2">{addressValue}</span>
                                      </div>

                                      <span className="hidden group-hover:flex items-center justify-center  w-[30px] h-[30px] rounded-full bg-gray-500
                                      text-white ml-auto hidd z-50  " onClick={()=>removeAddress(item?._id)}>
                                        <FaTrash />
                                      </span>
                                    </div>
                                  );
                                })}
                    
                              </div>
                </div>
               

                 
            </div>
        </div>
      </section>

      <Dialog  open={open}>
      <DialogTitle>Add Address</DialogTitle>

      <form action="" className="p-8 py-3 pb-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pb-5">
              <div className="col w-[100%]">
                   <TextField   type='text' className='w-full' label="Address *" variant="outlined" size="small" name='addressLine1' onChange={onChangeInput}
                        value={formFields.addressLine1} disabled={isLoading===true ? true:false} />
              </div>
          </div>

           <div className="flex items-center gap-5 pb-5">
              <div className="col w-[50%]">
                   <TextField   type='text' className='w-full' label="City *" variant="outlined" size="small"  name='city' onChange={onChangeInput}
                        value={formFields.city} disabled={isLoading===true ? true:false}/>
              </div>
              <div className="col w-[50%]">
                   <TextField   type='text' className='w-full' label="State *" variant="outlined" size="small"  name='state' onChange={onChangeInput}
                        value={formFields.state} disabled={isLoading===true ? true:false}/>
              </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
              <div className="col w-[50%]">
                   <TextField   type='text' className='w-full' label=" Pincode *" variant="outlined" size="small"  name='pincode' onChange={onChangeInput}
                        value={formFields.pincode} disabled={isLoading===true ? true:false}  />
              </div>
              <div className="col w-[50%]">
                   <TextField   type='text' className='w-full' label="Country *" variant="outlined" size="small"  name='country' onChange={onChangeInput}
                        value={formFields.country} disabled={isLoading===true ? true:false}  />
              </div>
          </div>
          <div className="flex items-center gap-5 pb-5">
              <div className="col w-[50%]">
                  <PhoneInput defaultCountry="in" value={phone} disabled={isLoading===true ? true:false}  onChange={((phone)=>{
                    setPhone(phone);
                    setFormFields((prev) => ({
                      ...prev,
                      mobile: phone,
                    }))
                  })}/>
              </div>
              <div className="col w-[50%]">
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

          <div className="flex items-center gap-5">
            <Button className="btn-org btn-lg w-full flex gap-2 items-center" type='submit'>
              {
                isLoading ===true ? <CircularProgress color='inherit'/>
                :
                'Save'
              }
               
            </Button>

            <Button className="btn-border btn-org btn-lg w-full flex gap-2 items-center" onClick={handleClose}>
              {
                isLoading ===true ? <CircularProgress color='inherit'/>
                :
                'Cancel'
              }
               
            </Button>
          </div>
          
      </form>
     
    </Dialog>
   
    </>
      
  )
}

export default AddAddress