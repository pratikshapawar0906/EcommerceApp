import React, { useRef } from 'react'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const Review = (props) => {
    const Context=useContext(MyContext)
    const[isLoading,setIsLoading]=useState(false);
    const hasFetched = useRef(false);
    const [reviews,setReviews]=useState({
        image:'',
        userName:'',
        review:'',
        rating:1,
        userId:'',
        productId:'',
    }) 

    const [reviewData, setReviewData]=useState([])

    useEffect(()=>{
      if (props.productId && !hasFetched.current) {
        getReviews();
        hasFetched.current = true;
      }
        setReviews((prevState)=>({
            ...prevState,
            image:Context?.userData?.avatar,
            userName:Context?.userData?.name,
            userId:Context?.userData?._id,
            productId:props.productId,
        }))
       
    },[Context?.userData,props.productId])


    const onChangeInput=(e)=>{
      setReviews((prevState)=>({
            ...prevState,
            review:e.target.value
        }))
    }

    const addReview = (e) => {
      e.preventDefault();
      if (reviews?.review !== "") {
        setIsLoading(true);
    
        postData('/api/user/addReview', reviews).then((res) => {
          setIsLoading(false);
    
          if (res?.success) {
            Context.alertBox("success", res?.message || "Review submitted!");
            
    
            setReviews((prevState) => ({
              ...prevState,
              review: '',
              rating: 1,
            }));
    
            getReviews();
          } else {
            Context.alertBox("error", res?.message || "Something went wrong!");
          }
        });
      } else {
        Context.alertBox("error", "Please add review");
      }
    };

    const  getReviews=()=>{
       fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then((res)=>{
        
         if(res?.success){
          setReviewData(res?.reviews)
               

          }
       })
    }


  return (
    <>
        <div className="w-full productReviewConatiner">
                         <h2 className="text-[18px]">Customer questions & answers</h2>

                         {
                            reviewData?.length !==0 && 
                            <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden
                          mt-5 pr-5">
                            {
                              reviewData?.map((reviews,index)=>{
                                return(
                                    <div  key={reviews._id || index} className="review  pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]w-full flex items-center justify-between">
                                      <div className="info  w-[60%] flex items-center gap-3">
                                       <div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
                                          <img src={reviews?.image} className='w-full'/>
                                       </div>
               
                                       <div className="w-[80%] ">
                                         <h3 className='!text-[16px] font-[500]'>{reviews?.userName}</h3>
                                         <h5 className='text-[13px] mb-0'>{reviews?.createdAt.split("T")[0]}</h5>
                                         <p className='mt-0 mb-0'>{reviews?.review}</p>
                                       </div>
                                      </div>
                                      <Rating name="size-small" value={reviews?.rating}  readOnly />
                                    </div>
                                )
                              })
                            }
                           
       
                            
                          </div>
                         }
         
                          
       
                          <br/>
       
                          <div className="reviewForm bg-[#fafafa] p-4 rounded-md" >
                           <h2 className="text-[18px]  text-[#000]"> Add A Review</h2>
                              <form className='w-full mt-5' onSubmit={addReview}>
                                <TextField
                                 id="outlined-multiline-static"
                                 label="Write a review"
                                 multiline
                                 rows={6}    
                                 className='w-full mb-5'  
                                 onChange={onChangeInput}
                                 name='review' 
                                 value={reviews.review}    
                               />
       
                                <br/><br/>
                                <Rating name="size-small" value={reviews.rating}   onChange={(event, newValue) => {
                                       setReviews((prevState)=>({
                                            ...prevState,
                                            rating:newValue
                                        }))
                                    }} 
                                />
       
                                <div className="flex items-center mt-5 rounded-sm">
                                 <Button className='btn-org' type='submit'>
                                    {
                                        isLoading === true ?  <CircularProgress color="inherit" /> 
                                        :
                                         'Submit Review'
                                    }</Button>
                                </div>
                              </form>
                          </div>
                       </div>
    </>
  )
}

export default Review
