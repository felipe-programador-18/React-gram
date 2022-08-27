import React, {useState, useEffect} from 'react'
import "./edit.css"

// config
import { upload } from '../../utils/config'
//redux
import { useSelector, useDispatch } from 'react-redux'

//slice here
import { profile, resetMessage } from '../../slices/userSlice'
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
  
  // fill field!!
  useEffect(() => {
    if(user) {
        setName(user.name)
        setEmail(user.email)
        setBio(user.bio)
    }
  },[user])

  
  const HandSubit = (e) => {
    e.preventDefault()
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
             `${upload}/users/${user.profileImage}` 
        }
        alt={user.name}/>
    ) }

    <form onSubmit={HandSubit}>
      <input type="text"
       placeholder='Name' 
       value={name || ""}   
       onChange={(e) => setName(e.target.value)}
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
         value={bio || ""}
         onChange={(e) => setBio(e.target.value)}
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
        <input type='submit' value='Atualizar'  />
    
    </form>
    </div> )
}

export default Edit