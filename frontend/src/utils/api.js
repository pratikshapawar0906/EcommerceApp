import axios from "axios";
const apiUrl=import.meta.env.VITE_API_URL;


export const postData=async(url, formData)=>{
  try {
    const response=await fetch(apiUrl + url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: "include",
        body:JSON.stringify(formData)
    })
        
    return   await response.json();
 
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
}

export const fetchDataFromApi=async(url)=>{
     try {
      const token = localStorage.getItem("accesstoken");
      
        if (!token) {
           console.log("No token found");
           return;
         }
    
      const {data} =await axios.get(apiUrl+url,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
      )
      return data;
     } catch (error) {
       console.log(error)
       return error
     }
}

