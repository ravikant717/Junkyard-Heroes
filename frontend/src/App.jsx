import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import Loader from './components/Loader'
const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore(); 
  useEffect(()=> {
    checkAuth();
  }, [checkAuth]); 

  console.log(authUser); // Log the authenticated user object
  if(isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen">
      <Loader/>
    </div>
  );
   return (
    <div>
      <Navbar/>


      <Routes>
        <Route path="/" element = {authUser ? <HomePage /> : <Navigate to="/login"/>}/>
          <Route path="/signup" element = {!authUser ? <SignupPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element = {!authUser ? <LoginPage /> : <Navigate to="/"/>}/>

      </Routes>
    </div>
  )
}

export default App