import React from 'react'
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = () => {
  return (
    <>
      <div className="Blogitem group">
        <div className="imgWrapper w-full rounded-md overflow-hidden relative">
              <img src="https://serviceapi.spicezgold.com/download/1760239113701_NewProject(4).jpg" 
              className='w-full transition-all group-hover:scale-105 group:hover:rotate-1' alt='blog-item'/>
               <span className='flex item-center justify-center text-white absolute bottom-[15px]
                 right-[15px] z-50 bg-[#ff5252] rounded-md p-1 text-[10px] font-[500] gap-1'>
                <IoMdTime className='text-[18px]'/>5 April, 2023
               </span>
        </div>

        <div className="info py-4">
            <h2 className='text-[15px] font-[500] text-black'><Link > sustainable living through cutting-edge prefabricated homes</Link>
            </h2>
            <p className='text-[12px] font-[400] text-[rgba(0,0,0,0.8)] mb-4'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English...</p>
            <Link  className='link font-[500] text-[14px] '>Read more
            <IoIosArrowForward/></Link>
            
        </div>
      </div>
    </>
  )
}

export default BlogItem
