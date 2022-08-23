import { useState, useEffect } from "react"
import "./auth.css"
import { useNavigate, Link } from "react-router-dom"

//Redux!!
import { useSelector, useDispatch } from "react-redux"


const LoginUser = () => {
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate()

    const HandSumit = (e) => {
        e.prevent.Default()
        setEmail("")
        setPassword("")
        navigate("/")
    } 

   useEffect(() => {

   },[])


    return(<div id="login" > 
    <h2>ReactGram</h2>
    <p className='subtitle' >Faça login para ver o que há de novo!</p>

    <form  onSubmit={HandSumit} >
        <label>Email:
            <input 
            type='email' 
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
      <input type='submit'  value='entrar' />
    </form>

    <p>Não tem conta?  <Link to='/register'>Clique aqui.</Link> </p>
    </div>)
}

export default LoginUser