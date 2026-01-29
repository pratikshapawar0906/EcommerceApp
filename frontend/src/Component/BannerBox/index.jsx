import React from 'react'
import { Link } from 'react-router-dom'

const BannerBox = (props) => {
  return (
    <>
      <div className="box bannerBox overflow-hidden rounded-1g group">
         <Link to='/' className=''>
           <img src={props.img} className='w-full transition-all group-hover:scale-105 group-hover:rotate-2' alt='Banner'/>
         </Link>
      </div>
    </>
  )
}

export default BannerBox;
