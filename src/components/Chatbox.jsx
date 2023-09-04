import { updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import profile from '../assets/profile.png'
import registration from '../assets/registration.png'
import ModalImage from "react-modal-image";
import { Button } from '@mui/material'
import { useSelector } from 'react-redux';

const Chatbox = () => {

  let userData = useSelector((state)=> state.loggedUser.loginUser)
  let activeChat = useSelector((state) => state.activeChat.activeChat);
  let [msg, setMag] = useState("")
  let handelChat = ()=>{
    // console.log(userData)
    // console.log(activeChat)
    // console.log(msg)
    let data = {
      whosentname : userData.displayName,
      whosentid: userData.uid,
      whoresevename: activeChat.name,
      whoreseveid:activeChat.id,
      msg:msg,
    }
    console.log(data)
  }



  return (
    <div className='chatbox'>
      <div className='msgprofile'>
        <div className='signal'>
           <img width="70" src={profile} />
           
          <div className='round'>

          </div>
        </div>
        <div>
        <h3>{activeChat.name}</h3>
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
        <input onChange={(e)=>setMag(e.target.value)} className='msgwrite' />
        </div>
        <Button onClick={handelChat} variant='contained'>Send</Button>
      </div>
    </div>
  )
}

export default Chatbox