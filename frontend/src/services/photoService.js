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

const getPhotoId =  async (id, token) =>{
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

//create function to deleted photo!!
const deletedPhoto = async(id, token) => {
 
  const config = requestConf("DELETE", null, token)

  try {
  const res = await fetch(api + "/photos/" +id, config)
   .then((res) => res.json())
   .catch((err) => err) 
   
   return res;
    
  } catch (error) {
    console.log(error)
  }
}

//create functoin to deleted photo
const EditPhoto = async(data,id, token) => {
  const config = requestConf("PUT" , data,token)
  try{
    const res = await fetch(api + "/photos/" + id , config )
    .then((res) => res.json())
    .catch((err) => err)

    return res;

  }catch(err){
    console.log(err)
  }


}



const photoService = {
    publishPhoto,
    getPhotoId,
    deletedPhoto,
    EditPhoto
}

export default photoService;
