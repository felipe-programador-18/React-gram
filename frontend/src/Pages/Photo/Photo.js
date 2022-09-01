import React, {useEffect, useState} from 'react'
import "./photo.css"
import { useParams, link } from 'react-router-dom'

import { uploads } from '../../utils/config'
import Message  from '../../Component/message'

import { useSelector, useDispatch } from 'react-redux'


const PhotoUser = () => {
 
    const {id} = useParams()
 

 return(<div>

     <p>Photo of user here!!!</p>

    </div>)


}

export default PhotoUser