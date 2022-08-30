import { api ,  requestConf } from '../utils/config'


//publish user !!

const publishPhoto = async (data, token) => {
    const config = requestConf("POST",data,token,true)
    try {
     const res = await fetch (api + "/photos", config )
     .then((res) => res.json())
     .catch((err) => err)

     return res;   
    } catch (error) {
        console.log(error)
    }
}


//create function to getImage 
const getPhotoId = async (id, token) =>{
   const config = requestConf("GET" , null, token) 
    try {
      const res = await fetch(api + "/photos/user/" + id , config)
      .then((res) => res.json())
      .catch((err) => err)    
      
      return res;
    } catch (error) {
      console.log(error)
    }
}




const photoService = {
    publishPhoto,
    getPhotoId
}

export default photoService;
