import React, { useState } from 'react'
import { useEffect } from 'react'
import "./auth.css"
import { Link, Navigate } from 'react-router-dom'


const RegisterAnother = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [corfirmPass , setConfirmPass] = useState("")
   
  const [formError, setError] = useState(false)
  
  //const navigate = Navigate()

  
  const HandSubmit =(e) => {
    e.preventDefault()




  // navigate("/")
  }
   
  useEffect(() => {

  },[])



  return(<div id='register' >
         <h2>ReactGram.</h2>
        <p>Cadastre-se para ver fotos dos seus amigos.</p>
        <form onSubmit={HandSubmit} >
          <label> Seu Nome:</label>
          <input name='nome'
            type='text'
            placeholder='Nome'
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            />
          
          <label> Seu email:</label>
          <input name='e-mail'
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
          <input name='confirmpassword'
            type='text'
            placeholder='Confirme sua senha.'
            value={corfirmPass} 
            onChange={(e) => setName(e.target.value)} 
            required
            />
          
          <input type="submit" value='cadastrar' />
        </form>
        
        <p>Já possui conta? <Link to='/login'>Click aqui.</Link></p>

    </div>)
}

export default RegisterAnother