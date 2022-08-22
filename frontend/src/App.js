import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';


// hook
import { useAuth } from './hoock/useAuth';


//pages
import Home from './Pages/Home/Home';
import LoginUser from './Pages/Auth/login';
import RegisterAnother from './Pages/Auth/AnotherRegister';



//components!!
import Navbar from './Component/navbar';
import Footer from './Component/footer';




function App() {
 
 const {auth, loading} = useAuth()
 console.log('testing auth', auth)
 
 if(loading){
  <p>Carregando...</p>
 }

 
 
 
  return (
     <div className="App">
     <BrowserRouter>

       <Navbar/>
       
        <div className='container' > 
         <Routes>       
           <Route path='/' element={ auth ? <Home/> : <Navigate to='/login' /> } />
        
           <Route path='/login' element={ !auth ?  <LoginUser/> : <Navigate to='/' />} />
           
           <Route path='/register' element={!auth ? <RegisterAnother/> : <Navigate to='/'/> }   />
     
         </Routes> 
       </div>
       
       <Footer/>
      </BrowserRouter> 
    </div>

  );
}

export default App;
