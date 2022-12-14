import React from 'react'
import "./nav.css"
import { NavLink, Link,useNavigate, Navigate  } from 'react-router-dom'
import {useState} from 'react'
import  {BsSearch,BsHouseDoorFill,BsFillPersonFill,BsFillCameraFill} from 'react-icons/bs'

//personalities hook
import { useAuth } from '../hoock/useAuth'

//redux
import {useDispatch, useSelector} from 'react-redux'
import { logout, reset } from '../slices/authSlice'


const Navbar = () => {
    
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)
   
  const [query, setQuery] = useState("")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const HandLogount = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const HandSearch = (e) =>{
   e.preventDefault()
    
   if(query){
    return navigate(`/search?q=${query}`)
   }
   setQuery("")
  }


   return(  <nav id='nav'>
 
      <Link to='/' >ReactGram</Link>
      
      <form  id='search-form'onSubmit={HandSearch}  >
        <BsSearch />
        <input type='text' placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value) } />
      </form>

      <ul id='nav-links' >
      {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={HandLogount} >Sair</span>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
              
      </ul>


    </nav> )
}


export default Navbar