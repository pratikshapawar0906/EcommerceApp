import React from 'react'
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = (props) => {
  return (
    <>
      <div className="Blogitem group">
        <div className="imgWrapper w-full rounded-md overflow-hidden relative">
              <img src={props?.item?.images[0]} 
              className='w-full transition-all group-hover:scale-105 group:hover:rotate-1' alt='blog-item'/>
               <span className='flex item-center justify-center text-white absolute bottom-[15px]
                 right-[15px] z-50 bg-[#ff5252] rounded-md p-1 text-[10px] font-[500] gap-1'>
                <IoMdTime className='text-[18px]'/>{props?.item?.createdAt?.split("T")[0]}
               </span>
        </div>

        <div className="info py-4">
            <h2 className='text-[15px] font-[500] text-black'><Link >{props?.item?.blogTitle}</Link>
            </h2>

            <div
              dangerouslySetInnerHTML={{
                __html: props?.item?.descripation?.substr(0, 250) + '....'
              }}
            />
  
            <Link  className='link font-[500] text-[14px] '>Read more
            <IoIosArrowForward/></Link>
            
        </div>
      </div>
    </>
  )
}

export default BlogItem
