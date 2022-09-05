import "./search.css"
import { useResetComponent } from '../../hoock/useResetcomponent'
import { useQuerySearch } from "../../hoock/useQuery"

import Like from '../../Component/likeContainer'
import PhotoItem from '../../Component/photoItem'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { likeHere, SearchPhoto } from "../../slices/photoSlice"

import {Link} from 'react-router-dom'


const SearchDates = () => {
    const query = useQuerySearch()  
    const search = query.get("q")
    
    const dispatch = useDispatch()
    const resetMessage = useResetComponent(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {photos, loading} = useSelector((state) => state.photo)
     
    useEffect(() => {
    dispatch(SearchPhoto(search))
    },[dispatch, search]) 
    
     //like photo
     const handleLike = (photo = null) => {
        dispatch(likeHere(photo._id))
        resetMessage()
     }
   
       if(loading){
        return <p>Carregando..</p>
       }

    return ( <div id="search" >
        
        <h2>Você está buscando por:{search}</h2> 
          {photos && photos.map((photo) => (
            <div key={photo._id}>
              <PhotoItem photo={photo} />
              <Like photo={photo} user={user} handleLike={handleLike} />
              <Link className='btn' to={`/photos/${photo._id}`} >Ver Mais.</Link>

            </div>
            ))
          }

          {photos && photos.length === 0 && (
           <> 
             <h2 className='no-photos' >Não foram encontradas nenhuma foto aqui.</h2>
            
            </>
          )}
         


    </div> )
}


export default SearchDates