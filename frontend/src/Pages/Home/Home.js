import {useEffect}   from 'react'
import {Link } from 'react-router-dom'

import Like from '../../Component/likeContainer'
import PhotoItem from '../../Component/photoItem'
import { useSelector,useDispatch} from 'react-redux'
import { useResetComponent } from '../../hoock/useResetcomponent'
import {getAllPhoto , likeHere  } from '../../slices/photoSlice'



const Home = () => {
  
    const dispatch = useDispatch()
    
    const resetMessage = useResetComponent(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {photos, loading} = useSelector((state) => state.photo)
    console.log('my photos here', photos)

    useEffect(() => {
     dispatch(getAllPhoto())
    },[dispatch])

    //like photo
    const handleLike = (photo) => {
     dispatch(likeHere(photo._id))
     resetMessage()
    }

    if(loading){
     return <p>Carregando..</p>
    }


    return (<div id="home" >
        {photos && photos.map((photo) => (
            <div key={photo._id}>
              <PhotoItem photo={photo} />
              <Like photo={photo} user={user} handleLike={handleLike} />
              
              <Link className='btn' to={`/photos/${photo._id}`} >Ver Mais.</Link>

            </div>
          )
         )}

        
        {photos && photos.length === 0 && (
           <> 
            <h2 className='no-photos' >Nenhuma foto aqui ainda</h2>
             <Link to={`/users/${user._id}`}>Publique sua Primeira Foto.</Link>

            </>
         )}
                

    </div>)
}

export default Home