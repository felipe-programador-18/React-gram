import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


//pages
import Home from './Pages/Home/Home';
import LoginUser from './Pages/Auth/login';
import RegisterAnother from './Pages/Auth/AnotherRegister';



//components!!
import Navbar from './Component/navbar';
import Footer from './Component/footer';




function App() {
  return (
     <div className="App">
     <BrowserRouter>

       <Navbar/>
       
        <div className='container' > 
         <Routes>       
           <Route path='/' element={<Home/>} />
        
           <Route path='/login' element={ <LoginUser/> } />
           <Route path='/register' element={<RegisterAnother/>}   />
     
         </Routes> 
       </div>
       
       <Footer/>
      </BrowserRouter> 
    </div>

  );
}

export default App;
