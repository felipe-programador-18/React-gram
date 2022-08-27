import { api ,  requestConf } from '../utils/config'


// get users details
const profile = async(data, token) => {

 const config = requestConf("GET", data, token)

 try {
  const res = await fetch( api + "/users/profile" ,  config)
  .then((res) => res.json())
  .catch((err) => err)    
  return res;

 } catch (error) {
  console.log(error)
 }

}

// get updated profile
const  updateProfileUser = async (data, token) => {

    const config = requestConf("PUT", data, token, true)
 try{
    const res = await fetch(api + "/users/", config )
    .then((res) => res.json())
    .catch((err) => err)     
     return res;
    
    } catch (error) {
        console.log(error)
    }

}




const userService = {
    profile,
    updateProfileUser
}

export default userService