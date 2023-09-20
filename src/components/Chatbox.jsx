import { updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import registration from '../assets/registration.png'
import ModalImage from "react-modal-image";
import { Button } from '@mui/material'
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { counterSlice } from '../slices/user/userSlice';
import {FaRegImages} from "react-icons/fa"
import {BsFillEmojiLaughingFill} from "react-icons/bs"
import { getStorage, ref as imgref,uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmojiPicker from 'emoji-picker-react';
import { AudioRecorder } from 'react-audio-voice-recorder';
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Chatbox = () => {

  const db = getDatabase();
  const storage = getStorage();
  let userData = useSelector((state)=> state.loggedUser.loginUser)
  let activeChat = useSelector((state) => state.activeChat.activeChat);

  let [msg, setMsg] = useState("")
  let [groupmsglist, setGroupMsgList] = useState("")
  let [msglist, setMsglist] = useState([])
  let [progress, setProgress] = useState([0])
  let [showemo, setShowemo] = useState([false])
  let [audiourl, setAudiourl] = useState()
  let [audiourlup, setAudiourlup] = useState()

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudiourl(url)
    setAudiourlup(blob)

    
  };



  let handelChat = ()=>{
    // console.log(userData)
    // console.log(activeChat)
    // console.log(msg)

    console.log(activeChat)
    if(activeChat.type=="groupmsg"){
      if(msg != ""){
        set(push(ref(db, 'groupmsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
      }
    }else{
      if(msg != ""){
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
      }
    }

    let data = {
      whosentname : userData.displayName,
      whosentid: userData.uid,
      whoresevename: activeChat.name,
      whoreseveid:activeChat.id,
      msg:msg,
    }
    console.log(data)
  }

useEffect(()=>{
    const msgRef = ref(db, 'singlemsg/' );
  onValue(msgRef, (snapshot) => {
    let arr = [];
    snapshot.forEach(item=>{
      console.log(item.val())
      if(item.val().whosentid == userData.uid && item.val().whoreseveid == activeChat.id || item.val().whosentid == activeChat.id && item.val().whoreseveid == userData.uid ){
        arr.push(item.val())
      }
    })
    setMsglist(arr)
  });
},[activeChat.id])  

useEffect(()=>{
    const msgRef = ref(db, 'groupmsg/' );
  onValue(msgRef, (snapshot) => {
    let arr = [];
    snapshot.forEach(item=>{
      
      
      arr.push(item.val())
    })
    setGroupMsgList(arr)
  });
},[activeChat.id])  

let handelKeyPress = (e)=>{
  if(e.key =="Enter"){
    if(activeChat.type=="groupmsg"){
      if(msg != ""){
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
      }
    }else{
      if(msg != ""){
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
      }
    }
  }
}

let handelMsg=(e)=>{
  console.log(e)
  setMsg(e.target.value)
}


let handleImageChange = (e)=>{
  console.log(e.target.files[0])
  const storageRef = imgref(storage, `images/${e.target.files[0].name}`);
  const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
  uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress)
   

  }, 
  (error) => {
  
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProgress(0)
      setAudiourl("")
      setAudiourlup("")
        if(activeChat.type=="groupmsg"){
    
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        img: downloadURL,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
  
    }else{
     
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
       img: downloadURL,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
     
    }
    });
  }
);
}

let handelEmoji = (emo)=>{
  console.log(emo.emoji)
  setMsg(msg + emo.emoji + msg)
}


let handelAudioChat=()=>{
  const storageRef = imgref(storage, audiourl);
  const uploadTask = uploadBytesResumable(storageRef, audiourlup);
  uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress)
   

  }, 
  (error) => {
  
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProgress(0)
      setAudiourl("")
      setAudiourlup("")
        if(activeChat.type=="groupmsg"){
    
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
        audio: downloadURL,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
  
    }else{
     
        set(push(ref(db, 'singlemsg/')), {
          whosentname : userData.displayName,
        whosentid: userData.uid,
        whoresevename: activeChat.name,
        whoreseveid:activeChat.id,
       audio: downloadURL,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
         }) 
     
    }
    });
  }
);
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

       

       
{/* 
       <div className='msg'>
       <p className='getimg'> */}
        {/* <img width="70" src={registration} /> */}
       {/* <ModalImage
        small={registration}
        large={registration}
    
      />;
       </p>
       <p className='time'>Today, 8:30pm </p>
       </div>
       <div className='msg'>
       <p className='sendimg'> */}
        {/* <img width="70" src={registration} /> */}
       {/* <ModalImage
        small={registration}
        large={registration}
        
      />;
       </p>
       <p className='time'>Today, 8:30pm </p>
       </div> */}

       {/* <div className='msg'>
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
       <p className='time'>{moment("2023-09-06 21:30", "YYYYMMDD hh:mm").fromNow()} </p>
       </div> */}

       {activeChat.type == "singlemsg"?
       msglist.map(item=>(
          item.whosentid == userData.uid && item.whoreseveid == activeChat.id
          ?
          <div className='msg'>
           {item.msg ? 
               (  <p className='sendmsg'>
            {item.msg}
            
            </p>)
            : item.msg ?
            ( <p className='sendimg'> 
         
        <ModalImage
        small={item.img}
        large={item.img}
        
      />;
       </p>)
       :
        
             <p className='sendaudio'><audio src={item.audio} controls></audio></p>
        
       
       }

          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
          : item.whosentid == activeChat.id && item.whoreseveid == userData.uid &&
          <div className='msg'>
              {item.msg ? 
                 (<p className='getmsg'>
            {item.msg}
            
            </p>)
            : item.msg ?
            ( <p className='getimg'> 
         
        <ModalImage
        small={item.img}
        large={item.img}
        
      />
       </p>)
       :
       
          <p className='getaudio'><audio controls></audio></p>
       
     
            }
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
        ))
        :
        groupmsglist .map(item=>(
          item.whosentid == userData.uid && item.whoreseveid == activeChat.id
          ?
          <div className='msg'>
           {item.msg ? 
               (  <p className='sendmsg'>
            {item.msg}
            
            </p>)
            : item.img ?
            ( <p className='sendimg'> 
         
        <ModalImage
        small={item.img}
        large={item.img}
        
      />;
       </p>)
       :
     
          <p className='sendaudio'><audio controls></audio></p>
     
     
            }
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
          : item.whoreseveid == activeChat.id && 

          <div className='msg'>

            {item.msg ? 
                 (<p className='getmsg'>
            {item.msg}
            
            </p>)
            : item.img ?
            ( <p className='getimg'> 
         
        <ModalImage
        small={item.img}
        large={item.img}
        
      />
       </p>) :
       <>
          <p className='getaudio'><audio controls></audio></p>
       
       </>
            }

         
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
        ))
        }

      </div>

      <div className='msgcontainer'>
        <div className='msgcon'>
        <input onChange={handelMsg} className='msgwrite' onKeyUp={handelKeyPress} value={msg} />
        {audiourl && (
        <audio className='audioset' src={audiourl} controls>
          
        </audio>
        )}
        <label>
        <FaRegImages style={{position:"absolute", top:"15px",right:"5px"}}/>
       
        <input onChange={handleImageChange} type="file"  hidden/>
        </label>
        <BsFillEmojiLaughingFill onClick={()=>setShowemo(!showemo)} style={{position:"absolute", top:"15px",right:"30px" }}/>

        <AudioRecorder 
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={false}
      downloadFileExtension="webm"
    />

        {showemo && (
        <div className='emojiholer'>
          <EmojiPicker onEmojiClick={handelEmoji} />
        </div>
        )}
        </div>
        
        {!audiourl && (
        <Button onClick={handelChat} variant='contained'>Send</Button>
        )}
        
          {audiourl && (
            <>
                <Button onClick={handelAudioChat} variant='contained'>Send Audio</Button>
                <Button onClick={()=>setAudiourl("")} variant='contained'>Cancle</Button>
            </>
  )}
      </div>
      {progress != 0 &&
      <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
    }
     
    </div>
  )
}

export default Chatbox