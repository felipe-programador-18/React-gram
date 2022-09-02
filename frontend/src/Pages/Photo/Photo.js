import React, {useEffect, useState} from 'react'
import "./photo.css"
import { useParams, link } from 'react-router-dom'

import { uploads } from '../../utils/config'
import Message  from '../../Component/message'
import PhotoItem from '../../Component/photoItem'

import { useSelector, useDispatch } from 'react-redux'
import {getUserPhotoId,likeHere} from '../../slices/photoSlice'
import Like from '../../Component/likeContainer'


const PhotoUser = () => {
 
  const {id} = useParams()
  const dispatch = useDispatch()
  
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
    
  }
 
   
  if(loading){
    return <p>Carregando photos.....</p>
  }
 
 return(<div id="photo" >

     <p>Mural de Fotos.</p>
     <PhotoItem photo={photo} />
     <Like photo={photo} user={user} handleLike={handleLike} />

    </div>)


}

export default PhotoUser