import React, { useContext, useEffect, useState } from 'react'
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import { FiEdit3 } from 'react-icons/fi';
import {  FaTrash } from 'react-icons/fa6';
import TooltipMUI from '@mui/material/Tooltip'
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const AddSize = () => {
    const[name,setName]=useState()
        const[data,setData]=useState([]);
        const[isLoading,setIsLoading]=useState(false);
        const Context=useContext(MyContext)
        const[editMode, setEditMode]=useState(false)
        
        useEffect(()=>{
            getData();
        },[])
        
        const getData=()=>{
            fetchDataFromApi("/api/product/getAllProductsSize").then((res)=>{
              setData(res?.data)  
            })
        }
    
        const handleSubmit=(e)=>{
          e.preventDefault();
        
          setIsLoading(true);
              if(name === "" ){
                 Context.alertBox("error", "Please enter Product Size");
                  return false
              }
              if(editMode == ""){
                  postData('/api/product/productSize/create',{
                    name:name
              }).then((res)=>{  
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Created Product Size  successfully!" );
                    setIsLoading(false)
                    getData();
                    setName('')
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
              })
              }else if(editMode !== ""){
                editData(`/api/product/updateProductSize/${editMode}`,{
                    name:name
              }).then((res)=>{  
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Created Product Size  successfully!" );
                    setIsLoading(false)
                    getData();
                    setName('')
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
              })
              }
              
        }
    
        const deleteSize=(id)=>{
            deleteData(`/api/product/deleteProductSize/${id}`).then((res)=>{
                getData();
                Context.alertBox("Success","Product Size deleted")
                
            })
        }
    
        const editItem=(id)=>{
            fetchDataFromApi(`/api/product/getProductsSize/${id}`).then((res)=>{  
                   setName(res?.data?.name)
                   setEditMode(res?.data?._id);
                  })
                        
            }
  return (
    <>
    <div className="flex items-center justify-between px-2 py-0 mt-3">
          <h2 className="text-[18px] font-[700]">Add Products Size </h2>
        </div>

        <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
            <form action="" className="form py-2 p-6" onSubmit={handleSubmit}>
                <div className="col mb-4">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Size</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm ' 
                    name='name' value={name} onChange={(e)=>setName(e.target.value)}  />
                </div>

                <Button type="submit"  className="btn-blue btn-lg  w-full flex gap-2">
                    {
                       isLoading === true ? <CircularProgress color='inherit'/> :
                       <>
                       <IoMdCloudUpload className='text-[25px] text-white' />Publish and view
                       </> 
                    }
                
                    
                   
                </Button>
            </form>
        </div>
        {
            data?.length !==0 && 

            <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
          <div className="relative overflow-x-auto mt-5 pb-5">
                <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gary-400 ">
                        <tr>
                            <th scope="col" className="px-6 pr-0 py-3 font-medium" width="10%">
                                  <div className="w-[60px]">
                                     <Checkbox {...label}  size='small'/>
                                  </div>
                            </th>
                            <th scope="col" className="px-0 py-3 font-medium whitespace-nowrap" width="60%">
                                Product Size
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap" width="30%">
                                Action
                            </th>
                             
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((item, index) => (
                        <tr
                          className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                          key={item?._id}
                        >
                          <th className="px-6 pr-0 py-2 font-medium">
                            <div className="w-[60%]">
                            <Checkbox {...label} size="small" />
                            </div>
                          </th>
                    
                          <td className="px-0 py-2 font-medium">
                            <span className="font-[600]">
                                 {item?.name}
                            </span>
                          </td>
                           <td className="px-6 py-2 font-medium">
                               <div className="flex items-center gap-1">
                                   <TooltipMUI title="Edit Product" placement="top">
                                       <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                                        onClick={()=>editItem(item?._id)}>
                                            <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                                       </Button>
                                   </TooltipMUI>
                                   <TooltipMUI title="Remove Product" placement="top">
                                       <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                                       onClick={()=>deleteSize(item?._id)}>
                                            <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                                       </Button>
                                   </TooltipMUI>
                               </div>
                           </td>
                            </tr> 
                            )
                         )
                    }
                     
                    </tbody >
                </table>
          </div>
            </div>
        }
    </>
  )
}

export default AddSize