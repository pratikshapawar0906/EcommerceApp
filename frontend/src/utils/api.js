import axios from "axios";
const apiUrl=import.meta.env.VITE_API_URL;


export const postData=async(url, formData)=>{
  try {
    const response=await fetch(apiUrl + url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
        
    return   await response.json();
 
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
}

