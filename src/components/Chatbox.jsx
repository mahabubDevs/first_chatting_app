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

const Chatbox = () => {

  const db = getDatabase();
  let userData = useSelector((state)=> state.loggedUser.loginUser)
  let activeChat = useSelector((state) => state.activeChat.activeChat);

  let [msg, setMag] = useState("")
  let [groupmsglist, setGroupMsgList] = useState("")
  let [msglist, setMsglist] = useState([])



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
      console.log(item.val())
      if(item.val().whosentid == userData.uid && item.val().whoreseveid == activeChat.id || item.val().whosentid == activeChat.id && item.val().whoreseveid == userData.uid ){
        arr.push(item.val())
      }
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
  setMag(e.target.value)
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
          <p className='sendmsg'>{item.msg}</p>
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
          : item.whosentid == activeChat.id && item.whoreseveid == userData.uid &&
          <div className='msg'>
          <p className='getmsg'>{item.msg}</p>
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
        ))
        :
        groupmsglistgit .map(item=>(
          item.whosentid == userData.uid && item.whoreseveid == activeChat.id
          ?
          <div className='msg'>
          <p className='sendmsg'>{item.msg}</p>
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
          : item.whosentid == activeChat.id && item.whoreseveid == userData.uid &&
          <div className='msg'>
          <p className='getmsg'>{item.msg}</p>
          <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} </p>
          </div>
        ))
        }

      </div>

      <div className='msgcontainer'>
        <div className='msgcon'>
        <input onChange={handelMsg} className='msgwrite' onKeyUp={handelKeyPress} />
        </div>
        <Button onClick={handelChat} variant='contained'>Send</Button>
      </div>
    </div>
  )
}

export default Chatbox