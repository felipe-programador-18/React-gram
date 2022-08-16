import React from 'react'
import "./nav.css"
import { NavLink, Link } from 'react-router-dom'
import  {BsSearch,BsHouseDoorFill,BsFillPersonFill,BsFillCameraFill} from 'react-icons/bs'


const Navbar = () => {
    
    return(  <nav id='nav'>
 
      <Link to='/' >React Gran</Link>
      
      <form>
        <BsSearch/>
        <input type='text' />
      </form>

      <ul id='nav-links' >
       
        <NavLink to='/' >
         <BsHouseDoorFill/>
        </NavLink>
        
        
        <NavLink to='/login' >
            Entrar
        </NavLink>
        
        <NavLink to='/register' >
            Registrar
        </NavLink>


      </ul>


    </nav> )
}


export default Navbar