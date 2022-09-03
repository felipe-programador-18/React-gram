import React, {useEffect, useState} from 'react'
import "./photo.css"
import { useParams, link } from 'react-router-dom'


import { uploads } from '../../utils/config'
import Message  from '../../Component/message'
import PhotoItem from '../../Component/photoItem'

import { useSelector, useDispatch } from 'react-redux'
import {getUserPhotoId,likeHere} from '../../slices/photoSlice'
import Like from '../../Component/likeContainer'
import { useResetComponent } from '../../hoock/useResetcomponent'


const PhotoUser = () => {
 
  const {id} = useParams()
  const dispatch = useDispatch()
  
  const resetMess = useResetComponent(dispatch)

  const {user} = useSelector((state) => state.auth)
  const {photo, loading, error, message} = useSelector((state) => state.photo)

  //later I need make function to loading photo


  //loading date
  useEffect(() => {
   dispatch(getUserPhotoId(id))
},[dispatch,id])


// like function and comments
  const handleLike = () => {
    dispatch(likeHere(photo._id))
   resetMess()
  }
 
   
  if(loading){
    return <p>Carregando photos.....</p>
  }
 
 return(<div id="photo" >

     <p>Mural de Fotos.</p>
     <PhotoItem photo={photo} />
     <Like photo={photo} user={user} handleLike={handleLike} />
      
     <div className='message-container'>
        {error && <Message msg={error} type='error' />}
        {message && <Message msg={message} type='success'  /> }
     </div>

    </div>)


}

export default PhotoUser