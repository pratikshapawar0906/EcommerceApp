import React from 'react'
import { Link, } from 'react-router-dom'

const BannerBox = (props) => {
  return (
    <>
      <div className="box bannerBox overflow-hidden rounded-1g group">
         <Link to='/' className=''>
           <img src={props.img} className='w-full transition-all group-hover:scale-105 group-hover:rotate-2' alt='Banner'/>
         </Link>
      </div>

      <div className={`info absolute p-5 top-0 ${props.info === 'left'?'left-0':'right-0'} w-[70%] h-[100%] z-50 flex items-center justify-center flex-col gap-2 ${props.info === 'left'? '':'pl-16'}`}>
        <h2 className="text-[18px] font-[600]">
           {props?.item?.bannerTitle}
        </h2>
        <span className="text-[20px] text-[#ff5252] font-[600] w-full">&#x20b9;{props?.item?.price}</span>

        <div className="w-full">
          <Link to='' className='text-[16px] font-[600] link'>
            Shop Now
          </Link>
        </div>

      </div>
    </>
  )
}

export default BannerBox;
