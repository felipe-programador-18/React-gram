import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';



// hook
import { useAuth } from './hoock/useAuth';


//pages
import Home from './Pages/Home/Home';
import LoginUser from './Pages/Auth/login';
import RegisterAnother from './Pages/Auth/AnotherRegister';
import ProfileUser from './Pages/Profile/profile.user';
import Edit from './Pages/Editprofile/edit';



//components!!
import Navbar from './Component/navbar';
import Footer from './Component/footer';
import PhotoUser from './Pages/Photo/Photo';
import SearchDates from './Pages/Search/search';




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
           
           <Route path='/profile' element={auth ? <Edit/> : <Navigate to='/login'/>   }  /> 
        
           <Route  path='/users/:id' element={ auth ? <ProfileUser/> : <Navigate to="/login" /> }  />

           <Route path='/login' element={ !auth ?  <LoginUser/> : <Navigate to='/' />} />
           
           <Route path='/register' element={!auth ? <RegisterAnother/> : <Navigate to='/'/> }   />
           
           <Route path='/search' element={ auth ?  <SearchDates/> : <Navigate to='/login' />  }   />
           
           <Route  path='/photos/:id' element={ auth ? <PhotoUser/> : <Navigate to='/login' /> } />
            
         
         
         </Routes> 
       </div>
       
       <Footer/>
      </BrowserRouter> 
    </div>

  );
}

export default App;
