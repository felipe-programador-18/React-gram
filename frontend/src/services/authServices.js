import { api ,  requestConf } from '../utils/config'

//register user in system!!!
const registeUser =  async (data) =>{
 const config = requestConf("POST", data)

try {
    
const res = await fetch(api + "/users/register", config)
.then((res) => res.json())
.catch((err) => err)
   
 // if me  wanna res i get receive user !!
 if(res){
 localStorage.setItem("user", JSON.stringify(res))
 }
 
 return res;

 } catch (error) {
    console.log(error)
 }
}

const authService = {
    registeUser
}


export default authService