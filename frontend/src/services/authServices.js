import { api ,  requestConf } from '../utils/config'

//register user in system!!!
const registeUser =  async (data) =>{
 const config = requestConf("POST", data)
try {
    
const res = await fetch(api + "/users/register", config)
.then((res) => res.json())
.catch((err) => err)
   
 // if me  wanna res i get receive user !!
 if(res._id){
 localStorage.setItem("user", JSON.stringify(res))
 }
 return res;
 
} catch (error) {
    console.log(error)
 }
}

// logout and user
const logout = () => {
  localStorage.removeItem('user')
}

// sing in login users!!
const login = async (data) => {
  const config = requestConf("POST" , data)
 try {
  const res = await fetch(api + "/users/login", config)
  .then((res) => res.json())
  .catch((err) => err)

  if(res._id){
    localStorage.setItem("user", JSON.stringify(res))
  }
  return res;

 } catch (error) {
  console.log(error)
 }
}



const authService = {
    registeUser,
    logout,
    login
}

export default authService