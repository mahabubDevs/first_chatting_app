import { updateProfile } from 'firebase/auth'
import React from 'react'
import profile from '../assets/profile.png'
import registration from '../assets/registration.png'
import ModalImage from "react-modal-image";
import { Button } from '@mui/material'

const Chatbox = () => {
  return (
    <div className='chatbox'>
      <div className='msgprofile'>
        <div className='signal'>
           <img width="70" src={profile} />
           
          <div className='round'>

          </div>
        </div>
        <div>
        <h3>Shown Islam</h3>
        <p>Online</p>

        </div>
      </div>

      <div className="msgbox">

       <div className='msg'>
       <p className='getmsg'>Hello philepine</p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='sendmsg'>Hello philepine</p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='getimg'>
        {/* <img width="70" src={registration} /> */}
       <ModalImage
        small={registration}
        large={registration}
    
      />;
       </p>
       <p className='time'>Today, 8:30pm </p>
       </div>
       <div className='msg'>
       <p className='sendimg'>
        {/* <img width="70" src={registration} /> */}
       <ModalImage
        small={registration}
        large={registration}
        
      />;
       </p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='getaudio'><audio controls></audio></p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='sendaudio'><audio controls></audio></p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='getaudio'><video width="320" height="240" controls></video></p>
       <p className='time'>Today, 8:30pm </p>
       </div>

       <div className='msg'>
       <p className='sendaudio'><video width="320" height="240" controls></video></p>
       <p className='time'>Today, 8:30pm </p>
       </div>

      </div>

      <div className='msgcontainer'>
        <div className='msgcon'>
        <input className='msgwrite' />
        </div>
        <Button variant='contained'>Send</Button>
      </div>
    </div>
  )
}

export default Chatbox