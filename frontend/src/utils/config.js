export const api = "http://localhost:5000/api"

// this upload is better for me dont needs adding url always went i try do search with my user!!!
export const upload = "http://localhost:5000/uploads"

export const requestConf = (method,data, token=null, image= null,) => {

   let config
   if(image){
    config ={
       method,
       body: data,
       headers:{}

    }
   }else if (method === "DELETE" || data === null){
     config = {
        method,
        headers:{}
     }
   } else{
    // this case with me receive dates!
    config = {
     method,
     body: JSON.stringify(data),
     headers:{
        "Content-Type":"application/json"
     }
    }
   }

   // now verify if arrive my token here
   if(token){
    config.headers.Authorization = `Bearer ${token}` 
   }

  return config;
}