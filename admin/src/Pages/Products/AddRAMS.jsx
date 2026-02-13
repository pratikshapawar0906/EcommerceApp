import React, { useState } from 'react'
import { postData } from '../../utils/api';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from 'react-icons/io';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import { FiEdit3 } from 'react-icons/fi';
import {  FaTrash } from 'react-icons/fa6';
import TooltipMUI from '@mui/material/Tooltip'

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const AddRAMS = () => {
    const [productRams, setProductRams] = useState('');
    const[formField,setfromField]=useState({productRam:[]});
    const[isLoading,setIsLoading]=useState(false);

    const onChangeInput=(e)=>{
     const {name, value}=e.target
      setfromField(prev => ({
        ...prev,
        [name]: value
      }));
    }


    const handleChangeProductRams = (event) => {
      setProductRams(event.target.value);
        setfromField(prev => ({
        ...prev,
        productRam: [event.target.value]
      }));
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
    
      setIsLoading(true);
          if(formField.productRam === 0 ){
             Context.alertBox("error", "Please enter Product  name ");
              return false
          }
          postData('/api/product/create',formField).then((res)=>{
            if(res?.success){
               Context.alertBox( "success",  res?.message || "Created category  successful!" );
               setTimeout(()=>{
                setIsLoading(false)
                    Context.setIsOpenFullScreenPanel({
                    open:false,
                })
                Context?.getCat();
               },1500)
              
            } else {
               Context.alertBox( "error", res?.message || "Something went wrong!" );
                setIsLoading(false)
            }
          })
    }
  return (
    <>
        <div className="flex items-center justify-between px-2 py-0 mt-3">
          <h2 className="text-[18px] font-[700]">Add Products RAMS </h2>
        </div>

        <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
            <form action="" className="form py-2 p-6" onSubmit={handleSubmit}>
                <div className="col mb-4">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product RAM</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '   />
                </div>

                <Button type="submit"  className="btn-blue btn-lg  w-full flex gap-2">
                
                    <IoMdCloudUpload className='text-[25px] text-white' />Publish and view
                   
                </Button>
            </form>
        </div>


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
                                Product RAM
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap" width="30%">
                                Action
                            </th>
                             
                        </tr>
                    </thead>
                    <tbody>
                         
                        <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                           <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                  <div className="w-[60px]">
                                     <Checkbox {...label} size='small' />
                                  </div>
                           </th>
                           <td className="px-0 py-2 font-medium">
                              2GB
                           </td>
                           <td className="px-6 py-2 font-medium">
                               <div className="flex items-center gap-1">
                                   <TooltipMUI title="Edit Product" placement="top">
                                       <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                            <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                                       </Button>
                                   </TooltipMUI>
                                   <TooltipMUI title="Remove Product" placement="top">
                                       <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                            <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                                       </Button>
                                   </TooltipMUI>
                               </div>
                           </td>
                        </tr>     
                    </tbody >
                </table>
          </div>
        </div>

          

          

   </>
  )
}

export default AddRAMS