import React, {useEffect, useState} from 'react'
import "./photo.css"
import { useParams, Link } from 'react-router-dom'


import { uploads } from '../../utils/config'
import Message  from '../../Component/message'
import PhotoItem from '../../Component/photoItem'

import { useSelector, useDispatch } from 'react-redux'
import {getUserPhotoId,likeHere, comment } from '../../slices/photoSlice'
import Like from '../../Component/likeContainer'
import { useResetComponent } from '../../hoock/useResetcomponent'


const PhotoUser = () => {
 
  const {id} = useParams()
  const dispatch = useDispatch()
  
  const resetMess = useResetComponent(dispatch)

  const {user} = useSelector((state) => state.auth)
  const {photo, loading, error, message} = useSelector((state) => state.photo)
  const {error: AnotherError} = useSelector((state) => state.auth)

  //comments here
  const [commentText, setCommentsText] = useState("")

  //loading date
  useEffect(() => {
   dispatch(getUserPhotoId(id))
},[dispatch,id])

  
 

// like function and reset dates!!
  const handleLike = () => {
    dispatch(likeHere(photo._id))
   resetMess()
  }
 
  //insert comments
  const handComments =  (e) => {
    e.preventDefault()
    const photoData = {
      comment: commentText,
      id: photo._id,
    }

    dispatch(comment(photoData))
    setCommentsText("")
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
     
     <div className='comments' >
     
     {photo.comments && (<>
     
      <h3>Comentários
        ({photo.comments.length}):
      </h3>
      <form onSubmit={handComments}>
        <input 
        type="text" 
        placeholder='Escreva seu comentário.' 
        onChange={(e) => setCommentsText(e.target.value)}
        value={commentText || ""}  />
       
       <input type="submit" value='Enviar Comentário.' />
       {error && <Message msg={error} type='error' />}
      </form>
       
       {photo.comments.length === 0 && <p>Não há comentário Aqui.</p>}
       {photo.comments.map((comment) => (
        <div className='comment' key={comment.comment}>
          <div className='author'>
            {comment.userImage && (
              <img src={`${uploads}/users/${comment.userImage}`} 
              alt={comment.userName} />
            )}
          </div>  
          <Link to={`/users/${comment.userId}`} >
             <p>{comment.userName}</p>  
          </Link> 
             <p>{comment.comment}</p>
            
        </div>
       )) }
     
     </>)}
     
     
     </div>



    </div>)


}

export default PhotoUser