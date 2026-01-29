import React from 'react'
import TextField from '@mui/material/TextField';
import { FaShoppingBag } from "react-icons/fa";
import Button from '@mui/material/Button';

const Checkout = () => {
  return (
    <>
    <section className="py-10">
        <div className="conatiner flex  gap-5">
            <div className="LeftCol w-[70%]">
                <div className="card bg-white shadow-md p-5 rounded-md w-full">
                    <h1 className="">Billing Details</h1>

                    <form action="" className="w-full mt-5">
                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                 <TextField   type='text' className='w-full' label="Full name*" variant="outlined" size="small" />
                            </div>

                            <div className="col w-[50%]">
                                 <TextField className='w-full' type='email' label="Email*" variant="outlined" size="small" />
                            </div>
                            
                        </div>

                        <h6 className="text-[14px] font-[500] mb-3">Street address*</h6>
                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                 <TextField  type='text' className='w-full' label="House number and street name" variant="outlined" size="small" />
                            </div>
                            
                        </div>

                         <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                 <TextField   type='text' className='w-full' label="Apartment, suite, unit, etc.(optional)" variant="outlined" size="small" />
                            </div>
                        </div>

                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                 <TextField   type='text'className='w-full' label="Town/City*" variant="outlined" size="small" />
                            </div>

                             <div className="col w-[50%]">
                                 <TextField type='text' className='w-full' label="state/country *" variant="outlined" size="small" />
                            </div>
                            
                        </div>

                         <h6 className="text-[14px] font-[500] mb-3">Postcode /ZIP*</h6>

                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                 <TextField   type='number'className='w-full' label="Postcode*" variant="outlined" size="small" />
                            </div>

                        </div>

                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                 <TextField   type='number'className='w-full' label="Phone number*" variant="outlined" size="small" />
                            </div>

                             <div className="col w-[50%]">
                                 <TextField type='email' className='w-full' label="Email Address" variant="outlined" size="small" />
                            </div>
                            
                        </div>

                   
                    </form>
                </div>
            </div>

            <div className="rightCol w-[30%]">
                 <div className="card bg-white shadow-md p-5 rounded-md w-full">
                    <h2 className="mb-4">Your Order</h2>

                    <div className="flex items-center justify-between py-3  border-t-1 border-b-1 border-[rgba(0,0,0,0.1)] ">
                        <span className="text-[14px] font-[600]">Product</span>
                        <span className="text-[14px] font-[600]">SubTotal</span>
                    </div>


                    <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5">
                       <div className="flex items-center justify-between py-2">
                           <div className="Part1 flex items-center gap-3">
                               <div className="img w-[50px] h-[50px] object-cover overflow-hidden
                               rounded-md group cursor-pointer">
                                   <img  src="../Img/Shirt1.jpg" className='w-full trnsition-all group-hover:scale-105'/>
                               </div>
   
                               <div className=" info ">
                                   <h4 className="text-[14px]">Men Alias-N Regular ...</h4>
                                   <span className="text-[13px]">Qty : 1</span>
                               </div>
                           </div>
   
                           <span className="text-[14px] font-[500]">1300.00</span>
                       </div>
   
                       <div className="flex items-center justify-between py-2">
                           <div className="Part1 flex items-center gap-3">
                               <div className="img w-[50px] h-[50px] object-cover overflow-hidden
                               rounded-md group cursor-pointer">
                                   <img  src="../Img/Kurti1.jpg" className='w-full trnsition-all group-hover:scale-105'/>
                               </div>
   
                               <div className=" info ">
                                   <h4 className="text-[14px]">A-Line Kurti With Sh...</h4>
                                   <span className="text-[13px]">Qty : 1</span>
                               </div>
                           </div>
   
                           <span className="text-[14px] font-[500]">1500.00</span>
                       </div>
   
                       <div className="flex items-center justify-between py-2">
                           <div className="Part1 flex items-center gap-3">
                               <div className="img w-[50px] h-[50px] object-cover overflow-hidden
                               rounded-md group cursor-pointer">
                                   <img  src="../Img/Tshirt1.webp" className='w-full trnsition-all group-hover:scale-105'/>
                               </div>
   
                               <div className=" info ">
                                   <h4 className="text-[14px]">Deel Band Women Rayo...</h4>
                                   <span className="text-[13px]">Qty : 1</span>
                               </div>
                           </div>
   
                           <span className="text-[14px] font-[500]">600.00</span>
                       </div>
   
                     </div>

                     <Button className="btn-org btn-lg w-full flex gap-2 items-center">
                        <FaShoppingBag className='text-[20px]'/>Checkout
                     </Button>
   
                 </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default Checkout
