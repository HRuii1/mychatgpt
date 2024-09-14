import { useAuth } from '@clerk/clerk-react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DashboardLayout = () => {

  const {userId, isLoaded} = useAuth()
  const navigate = useNavigate()
  // check if we are signed in, if not, user can't access the dashboard page and will be navigated to the sign in page
  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]); // when this three vars changed, this function will run again

  if(!isLoaded) return "Loading...";
  
  return (
    <div className='dashboardLayout'>
        <div className="menu">MENU</div>
        <div className="content"><Outlet/></div>
    </div>
  )
}

export default DashboardLayout