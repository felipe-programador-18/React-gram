import React, { useMemo } from 'react'
import "./profile.css"
import Message from '../../Component/message'

import { uploads } from '../../utils/config'

import {Link, useParams} from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
import {useState, useEffect, useRef} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getUserId } from '../../slices/userSlice'
import { publishPhoto, resetMessage, getUserPhoto } from '../../slices/photoSlice'
import { useCallback } from 'react'


const ProfileUser = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const {user ,loading}= useSelector((state) => state.user) 
    const {user: userAuth} = useSelector((state) => state.auth)
    
    const {photos,
      loading: loadingPhoto , 
      message: messagePhoto, 
      error: errorPhoto} = useSelector((state) => state.photo)
     
      
     
    console.log('photo here', photos)
    
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    
    //photo and new edit referred
    const newPhotoForm = useRef()
    const editPhotoUser = useRef()
    
    //loading user date!
    useEffect(() => {
      dispatch(getUserId(id))
      dispatch(getUserPhoto(id))
    },[dispatch,id])
   

    const HandSubmit = (e) => {
      e.preventDefault()

      const photoData={
         title,
         image
      }
      //build from dates!!  
      
      const formData = new FormData()
      const PhotoFormData = Object.keys(photoData).forEach((key) => 
      formData.append(key, photoData[key])
      )
        
      formData.append("photo", PhotoFormData) 
       dispatch(publishPhoto(formData))
      setTitle("")

      // later two second be disappear delay
      setTimeout(() => {
       dispatch(resetMessage());
      },2000)
    }
    
    const HandleFile = (e) => {
       // set Image state
      const image = e.target.files[0]
      setImage(image)
    }


    if(loading){
        return <p>Carregando profile....</p>
    }

    return(<div id='profile'>
     <div className='profile-header'>
        {user.profileImage && (
        <img src={`${uploads}/users/${user.profileImage}`}  alt={user.name}  />
        )}
        <div className='profile-description'>
         <h2>{user.name}</h2>
         <p>{user.bio}</p>
        </div>



     </div>   

        {id === userAuth._id && (<>
        <div className='new-photo' ref={newPhotoForm} >
         <h3>Compartilhe algum momento Seu:</h3>
           <form onSubmit={HandSubmit}>
             <label >
                <span>Título para foto.</span>
                <input type="text" 
                value={title || ""}  
                placeholder='Insira um Título...'
                onChange={(e) => setTitle(e.target.value)} 
                  />
             </label>

             <label>
                <span>Adicione uma Imagem.</span>
                <input 
                 type='file'
                 onChange={HandleFile}
                 />
             </label>
                {!loadingPhoto && <input type="submit" value='Postar' /> }

                {loadingPhoto && <input type="submit" value='Aguarde ....' /> }   

                {errorPhoto &&  <Message msg={errorPhoto} type='error' />}

                {messagePhoto &&  <Message msg={messagePhoto} type='success' />}        
         
           </form>
         </div>
        </>)}


        <div className='user-photo' >
          <h2> Fotos publicadas: </h2>
           <div className='photos-container' >
            {photos && photos.map((photo) => (
            <div className='photo' key={photo._id}>
            
             {photo.image && ( 
              <img src={`${uploads}/photos/${photo.image}`} 
              alt={photo.title} /> 
              )}


              {id === userAuth._id ? (
               <div className='actions' >
                 <Link to={`/photos/${photo._id}`} >
                   <BsFillEyeFill/>  
                
                 </Link> 
                   <BsPencilFill/>
                   <BsXLg/>
                   
               </div>
                ) : (<Link className='btn' to={`/photos/${photo._id}`} >Ver.</Link> 
              )}
             


            </div> ))}

            { photos.length === 0 && <p>Nenhuma foto aqui!</p> }
          </div> 
      </div>

    </div> )
}
export default ProfileUser