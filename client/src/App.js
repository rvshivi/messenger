
import From from './modules/form/index.js';
import {Routes,Route, Navigate} from 'react-router-dom'

import './App.css';
import Dashbord from './modules/Dashbord/index.js';
// import { Children } from 'react';

const ProtectedRoute=({children ,auth=false})=>{


  const isLoggedIn=localStorage.getItem('user:token') !==null || false;

  console.log( "islogged in",isLoggedIn)

  if(!isLoggedIn && auth){

   return <Navigate to={'/users/sign_in'} /> 
} else if( isLoggedIn && ['/users/sign_in', 'users/sign_up'].includes(window.location.pathname)){
  console.log(('object :>>'));
  return<Navigate to={'/'}/>

} 

    return children

}

function App() {

  return (
    
    // <>
    // <Dashbord/>
    // </>


 <Routes>
<Route path='/' element={
  <ProtectedRoute auth={true} >
  <Dashbord/>
  </ProtectedRoute>
  }/>

  <Route path='/users/sign_in' element={
      <ProtectedRoute>
    <From isSignInPage={true}/>
    </ProtectedRoute>
    }/>
  <Route path='/users/sign_up' element={
      <ProtectedRoute>
    <From isSignInPage={false} />
    </ProtectedRoute>
    }/>

</Routes>  

   
  );
}

export default App;


