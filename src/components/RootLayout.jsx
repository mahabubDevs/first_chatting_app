import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'
import {AiFillHome,AiFillMessage,AiFillNotification,AiFillSetting,AiOutlineLogout} from 'react-icons/ai'
import { Link,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RootLayout = () => {

  const location = useLocation();
  let userData = useSelector((state)=> state.loggedUser.loginUser)

  //logout part



  //logout end






  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className='navbar'>
            <div className='navcontainer'>
              <img  src={profile}/>
              <h4 className='username'>{userData.displayName}</h4>
                <ul>
                  <li>
                    <Link to="/chatting/home" className={location.pathname == "/chatting/home" ? 'active': 'icon'}  >
                    <AiFillHome />
                    </Link>
                  </li>
                  <li>
                  <Link to="/chatting/message" className={location.pathname == "/chatting/message" ? 'active': 'icon'}>
                    <AiFillMessage />
                  </Link>
                  </li>
                  <li>
                  <Link to="/chatting/notification" className={location.pathname == "/chatting/notification" ? 'active': 'icon'}>
                    <AiFillNotification />
                  </Link>
                  </li>
                  <li>
                  <Link to="/chatting/setting" className={location.pathname =="/chatting/setting" ? 'active': 'icon'}>
                      <AiFillSetting />
                  </Link>
                  </li>
                  <li>
                  <Link to="/chatting/logout"  className={location.pathname == "/chatting/logout" ? 'active': 'icon'}>
                      <AiOutlineLogout  />
                  </Link>
                  </li>
                </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
        <Outlet/> 
        </Grid>
      </Grid>

    {/* <div>RootLayout</div>
    <Outlet/> */}
    </>
  )
}

export default RootLayout