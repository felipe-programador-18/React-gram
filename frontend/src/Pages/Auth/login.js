import { useState, useEffect } from "react"
import "./auth.css"
import { Link } from "react-router-dom"
import Message from '../../Component/message'

//Redux!!
import { useSelector, useDispatch } from "react-redux"

import { login, reset } from "../../slices/authSlice"

const LoginUser = () => {
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")

 //   const navigate = useNavigate()
    const dispatch = useDispatch()  
    const {loading, error} = useSelector((state) => state.auth) 


    const HandSumit = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        console.log(user)
        dispatch(login(user))
    } 
    
   // clean all auth state!! 
   useEffect(() => {
    dispatch(reset()) 
   },[dispatch])


    return(<div id="login" > 
    <h2>ReactGram</h2>
    <p className='subtitle' >Faça login para ver o que há de novo!</p>

    <form  onSubmit={HandSumit} >
        <label>Email:
            <input 
            type='text' 
            placeholder="E-mail" 
            value={email || "" } onChange={(e) =>  setEmail(e.target.value) } />
        </label>
        <label> Senha:
            <input 
            type='password' 
            placeholder='senha' 
            value={password || ""}   
            onChange={(e) =>  setPassword(e.target.value)}
            />
        </label>
      
     {!loading && <input type='submit'  value='entrar' />}
     {loading && <input type='submit'  value='Aguarde...' disabled /> }
      
      {error &&  <Message msg={error} type='error' />  }


    </form>

    <p>Não tem conta?  <Link to='/register'>Clique aqui.</Link> </p>
    </div>)
}

export default LoginUser