import axios from "axios";
const apiUrl=import.meta.env.VITE_API_URL;


export const postData=async(url, formData)=>{
  try {
    const token = localStorage.getItem("accesstoken");
    const response=await fetch(apiUrl + url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
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

export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      return { success: false, message: "No token found" };
    }

    const response = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
    });

    // Axios wraps the response in `data`
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
};

export const uploadImage=async(url,updatedData)=>{
 
  const token = localStorage.getItem("accesstoken");

  var response;
  await axios.put( apiUrl + url ,updatedData,{
        headers:{
           Authorization: `Bearer ${token}`,
           'Content-Type':'multipart/form-data'
        },
        credentials: "include",
        
    }).then((res)=>{ 
       response=res;
    });
    return response;
 
}

export const editData=async(url,updatedData)=>{
 
  const token = localStorage.getItem("accesstoken");

  var response;
  await axios.put( apiUrl + url ,updatedData,{
        headers:{
           Authorization: `Bearer ${token}`,
           'Content-Type':'application/json'
        },
        credentials: "include",
        
    }).then((res)=>{ 
       response=res;
    });
    return response;
 
}


export const deleteData=async(url)=>{
 
  const token = localStorage.getItem("accesstoken");


  const response=await axios.delete( apiUrl + url ,{
        headers:{
           Authorization: `Bearer ${token}`,
           'Content-Type':'application/json'
        },
        credentials: "include",
        
    })
     return response
 
}

