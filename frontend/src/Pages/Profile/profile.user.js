import React from 'react'
import "./profile.css"

import { uploads } from '../../utils/config'

import {Link, useParams} from 'react-router-dom'

import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
import {useState, useEffect, useRef} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getUserId } from '../../slices/userSlice'

const ProfileUser = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const {user ,loading}= useSelector((state) => state.user) 
    const {user: userAuth} = useSelector((state) => state.auth)
   
    //photo


    //loading user date!

    useEffect(() => {
    dispatch(getUserId(id))
    },[dispatch,id])


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
    </div> )
}
export default ProfileUser