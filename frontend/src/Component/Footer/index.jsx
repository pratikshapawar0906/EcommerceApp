import React, { useContext } from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiKeyReturnBold } from "react-icons/pi";
import { GiWallet } from "react-icons/gi";
import { IoMdClose, IoMdGift } from "react-icons/io"; 
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {  FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube} from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Drawer from '@mui/material/Drawer';
import { MyContext } from '../../App';
import CartPanel from '../CartPanel';

const Footer = () => {
    const Context=useContext(MyContext);

  return (
    <>
      <footer className='py-6 bg-[#fdfdfd] border-1 border-[rgba(0,0,0,0.1)]'>
        <div className="container">
            <div className="flex items-center justify-center gap-2 py-8 pb-8">
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <MdOutlineLocalShipping className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252]
                    group-hover:-translate-y-1'/>
                     <h3 className='text-[16px] font-[600] mt-3'> Free Shipping</h3>
                     <p className='text-[12px] font-[500]'>For all Orders over $100</p>
                </div>

                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <PiKeyReturnBold className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252]
                    group-hover:-translate-y-1'/>
                     <h3 className='text-[16px] font-[600] mt-3'> 30 days returns</h3>
                     <p className='text-[12px] font-[500]'>For an exchange product</p>
                </div>

                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <GiWallet className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252]
                    group-hover:-translate-y-1'/>
                     <h3 className='text-[16px] font-[600] mt-3'> Secured Payment</h3>
                     <p className='text-[12px] font-[500]'>Payment Cards Accepted</p>
                </div>

                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <IoMdGift className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252]
                    group-hover:-translate-y-1'/>
                     <h3 className='text-[16px] font-[600] mt-3'>Special Gift</h3>
                     <p className='text-[12px] font-[500]'>Our First product Order</p>
                </div>

                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <BiSupport className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252]
                    group-hover:-translate-y-1'/>
                     <h3 className='text-[16px] font-[600] mt-3'> Support 24/7</h3>
                     <p className='text-[12px] font-[500]'>Contact us Anytime</p>
                </div>

               
            </div>

            <br/>
            <hr/>
        
            <div className="footer flex  py-8">
                <div className="Part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]" >
                    <h2 className='text-[18px] font-[600] mb-4'>Contact us</h2>
                    <p className='text-[13px] font-[400]'>Classyshop - Mega Super Store<br/>
                     507-Union Trade Centre France</p>
                     <Link className='link  text-[13px]' to='mailto:someone@example.com'>sales@yourcompany.com</Link>
                     <span className="text-[25px] font-[500] block w-full mt-3 mb-4 text-[#ff5252]">(+91) 9876-543-210</span>
                     <div className="flex items-center ">
                        <IoChatboxEllipsesOutline className='text-[40px] text-[#ff5252]'/>
                        <span className='text-[16px] font-[600] '>Online Chat<br/>
                        Get Expert Help</span>
                     </div>
                </div>

             <div className="Part2 w-[40%] flex pl-8">
                <div className="Part2_col1 w-[50%]">
                    <h2 className='text-[18px] font-[600] mb-4'>Products</h2>
                    <ul className=' list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Prices drop</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>New products</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Best sales</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Contact us</Link>
                        </li>
                         <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Sitemap</Link>
                        </li>
                         <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Stores</Link>
                        </li>

                    </ul>
                </div>


                <div className="Part2_col2 w-[50%]">
                    <h2 className='text-[18px] font-[600] mb-4'>Our company</h2>
                    <ul className=' list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Delivery</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Legal Notice</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Terms  and Condition of use</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>About us</Link>
                        </li>
                         <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Secure payment</Link>
                        </li>
                         <li className='list-none text-[14px] w-full mb-2'>
                            <Link to='' className='link '>Login</Link>
                        </li>

                    </ul>
                </div>

                
             </div>
             <div className="Part2 w-[35%] flex pl-8 flex-col pr-8">
                <h2 className='text-[18px] font-[600] mb-4'>Subscribe to newsletter</h2>
                <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts.</p>

                <form className='mt-5 '>
                    <input type="text" className='w-full h-[45px] border outline-none
                    pl-4 pr-4  rounded-sm  mb-4 focus:border-[rgba(0,0,0,0.3)]' placeholder='Your Email Address'/>
                    <Button className='btn-org'>SUBSCRIBE</Button>

                     <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy" />
                </form>

                
             </div>
            </div>

         </div>
      </footer>

      <div className="bottomStrip border-t border-[rgba(0,0,0,0.2)] py-3 bg-[#ffffff]">
        <div className="container flex items-center justify-between">
         <ul className="flex iyems-center gap-2">
            <li className="list-none">
                <Link to='' target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)
                 ] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                  <FaFacebookF className='text-[15px]  group-hover:text-[#ffffff]' />
                </Link>
            </li>
             <li className="list-none">
                <Link to='' target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)
                 ] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                  <AiOutlineYoutube className='text-[15px]  group-hover:text-[#ffffff]' />
                </Link>
            </li>
             <li className="list-none">
                <Link to='' target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)
                 ] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                  <FaPinterestP className='text-[15px]  group-hover:text-[#ffffff]' />
                </Link>
            </li>
             <li className="list-none">
                <Link to='' target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)
                 ] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                  <FaInstagram className='text-[15px]  group-hover:text-[#ffffff]' />
                </Link>
            </li>
         </ul>

         <p className='text-[13px] text-center mb-0'>© 2024 - Ecommerce Template</p>

         <div className="flex items-center">
            <img src="../Img/carte_bleue.png" alt='Image'/>
            <img src="../Img/visa.png" alt='Image'/>
            <img src="../Img/master_card.png" alt='Image'/>
            <img src="../Img/american_express.png" alt='Image'/>
            <img src="../Img/paypal.png" alt='Image'/>
         </div>
        </div>
      </div>

      {/* cart panel */}
            <Drawer open={Context.openCartPanel} onClose={Context.toggleCartPanel(false)} anchor={"right"}
            className='cartPanel'>
              <div className="flex items-center justify-between py-3 px-4 gap-3 border-b-1 border-[rgba(0,0,0,0.1)]
              overflow-hidden">
                <h4>cart</h4>
                <IoMdClose className='text-[20px] cursor-pointer' onClick={Context.toggleCartPanel(false)}/>
              </div>
      
              <CartPanel />
            </Drawer>
      
    </>
  )
}

export default Footer
