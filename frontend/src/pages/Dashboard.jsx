
import React from 'react'
import { Outlet} from 'react-router-dom'
import CustomerSidebar from '../components/CustomerSidebar.jsx'
import DealerSidebar from '../components/DealerSidebar.jsx'
import { useRole } from '../lib/useRole.js'
//Dashborad template
const Dashboard = () => {
  const role = useRole(); 
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <div className='fixed inset-0 z-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
            <div className='absolute inset-0 backdrop-blur-sm' />
        </div>

      {role === 'dealer' ? <DealerSidebar /> : <CustomerSidebar />}
        
        <div className='flex-1 ml-16 overflow-y-auto z-10'>
          <Outlet/>
        </div>

    </div>
  )
}

export default Dashboard