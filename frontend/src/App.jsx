import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import SignupPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import Dashboard from './pages/Dashboard'
import Loader from './components/Loader'
import Overview from './components/Overview'
import PickupRequest from './components/PickupRequest'
import Requests from './components/Requests'
import { Toaster } from 'react-hot-toast'
import ScrapRequest from './components/ScrapRequest'
// App.jsx - Main application component that sets up routes and authentication checks
// This file contains the main application logic, including routing and authentication checks.
// It uses React Router for navigation and Zustand for state management.
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
      <Toaster />
      <Navbar/>


      <Routes>
        <Route path="/" element = {authUser ? <Navigate to ="/dashboard/" /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element = {!authUser ? <SignupPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element = {!authUser ? <LoginPage /> : <Navigate to="/"/>}/>
          {/*NESTED DASHBOARD ROUTES */}
        {authUser && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="request" element={(authUser.role == 'dealer') ? <ScrapRequest/> : <PickupRequest />} />
            <Route path="my-requests" element={<Requests />} />
          </Route>
        )}

      </Routes>
    </div>
  )
}

export default App