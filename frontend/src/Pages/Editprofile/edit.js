import React, {useState, useEffect} from 'react'
import "./edit.css"

// config
import { uploads } from '../../utils/config'
//redux
import { useSelector, useDispatch } from 'react-redux'

//slice here
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'
import Message from '../../Component/message'


const Edit = () => {

  const dispatch = useDispatch()

  const {user,message,loading,error} = useSelector((state) => state.user)

  const [name, setName] = useState("")
  const [email, setEmail]= useState("") 
  const [password, setPassword] = useState("")
  const [profileImage, setImageProfile] = useState("")
  const [bio, setBio] = useState("")
  
  const[previewImage, setPreviewImage] = useState("")

  
  // load profile user
  useEffect(() => {
   dispatch(profile())
  },[dispatch])
  
  
  useEffect(() => {
    if(user) {
        setName(user.name)
        setEmail(user.email)
        setBio(user.bio)
    }
  },[user])

  
  const HandSubit = async (e) => {
    e.preventDefault()
    
    const userData ={
      name,
    }

    if(profileImage){
      userData.profileImage = profileImage;
    }
    if(bio) {
      userData.bio = bio;
    } 
    
    if(password){
      userData.password = password;
    }
     
    //build form data
    const formData = new FormData()
    const userFormDate =  Object.keys(userData).forEach((key) => formData.append(key, userData[key] ) )
    
    formData.append("user", userFormDate)
    await dispatch(updateProfile(formData))
    
    // later two second be disappear delay
    setTimeout(() => {
    dispatch(resetMessage());
    },2000)

  }

  const HandleFile = (e) => {
    // image preview
    const image = e.target.files[0]
     setPreviewImage(image)
     // set Image state
     setImageProfile(image)
  }



    return(<div id='edit-profile' >
    <h2>Edite seus Dados.</h2>
       
    <p className='subtitle' >Adicione uma imagem de perfil e conte mais sobre você.</p>
   
    {(user.profileImage || previewImage) && ( 
      <img className='profile-image' 
       src={ previewImage ? URL.createObjectURL(previewImage) :
             `${uploads}/users/${user.profileImage}` 
        }
        alt={user.name}/>
    ) }

    <form onSubmit={HandSubit}>
      <input type="text"
       placeholder='Nome' 
       onChange={(e) => setName(e.target.value)}
       value={name || ""}   
       />

      <input type="email"
       placeholder='E-mail' 
       disabled 
       value={email || ""}
       onChange ={(e) => setEmail(e.target.value)}
       />  

       <label>
         <span>Imagem do Perfil:</span>
         <input type="file" 
         onChange={HandleFile}
         /> 
       </label>    

       <label>
        <span>Bio:</span>
        <input 
         type="text"
         placeholder='Descrição do Perfil.'
         onChange={(e) => setBio(e.target.value)}
         value={bio || ""}
         />
       </label>
        
        <label>
            <span>Quer alterar sua Senha?</span>
            <input 
            type="passoword"
             placeholder='Digite sua Nova senha.' 
             value={password || '' }
             onChange={(e) => setPassword(e.target.value)}
             />
        </label>
      
     {!loading && <input type='submit'  value='Atualizar' />}
     {loading && <input type='submit'  value='Aguarde...' disabled /> } 
     {error &&  <Message msg={error} type='error' />  }

      {message && <Message msg={message} type='success'/> } 

    </form>
    </div> )
}

export default Edit