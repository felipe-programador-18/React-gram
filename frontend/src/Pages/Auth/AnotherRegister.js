import React, { useState } from 'react'
import { useEffect } from 'react'
import "./auth.css"
import { Link, Navigate } from 'react-router-dom'


//redux
import { register, reset } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'



const RegisterAnother = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword, setConfirmPass] = useState("")
   
  
  //const navigate = Navigate()
   
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.auth ) 
  



  const HandSubmit =(e) => {
    e.preventDefault()
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPass("")
    

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
     
   console.log("my user", user)
  // navigate("/")

    dispatch(register(user))
  }
   
  //clean auth states!!
  useEffect(() => {
   dispatch(reset())
  },[dispatch])



  return(<div id='register' >
         <h2>ReactGram.</h2>
        <p>Cadastre-se para ver fotos dos seus amigos.</p>
        <form onSubmit={HandSubmit} >
          <label> Seu Nome:</label>
          <input name='name'
            type='text'
            placeholder='Nome'
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            />
          
          <label> Seu email:</label>
          <input name='email'
            type='text'
            placeholder='E-mail'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            />

         <label> Defina uma Senha:</label>
          <input name='password'
            type='text'
            placeholder='Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            />

          <label> Confirma sua Senha:</label>
          <input name='password'
            type='text'
            placeholder='Confirme sua senha.'
            value={confirmPassword} 
            onChange={(e) => setConfirmPass(e.target.value)} 
            required
            />
          
          <input type="submit" value='cadastrar' />
        </form>
        
        <p>Já possui conta? <Link to='/login'>Click aqui.</Link></p>

    </div>)
}

export default RegisterAnother