import React from 'react'
import "./photoItem.css"
import { Link } from 'react-router-dom'


import { uploads } from '../utils/config'


const PhotoItem = ({ photo }) => {
  console.log("photo here now", photo)

    return(<div className='photo-item' >
      
       {photo.image && (
           <img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>
        )}  
        
        <h2>{photo.title}</h2>
        <p className="photo-author" >
          <span> 
           Publicada por: <Link to={`/users/${photo.userId}`} > {photo.userName}  </Link>  
          </span>   
        </p> 

    </div>)

}

export default PhotoItem