import axios from "axios";

export const postData=async(url, formData)=>{
  try {
    const response=await fetch(process.env.REACT_APP_API_URL + url,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
  } catch (error) {
    console.log(error)
  }
}