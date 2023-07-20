import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";

const FriendRequest = () => {
    const db = getDatabase();

    let [reqList,setReqList] = useState([])

    useEffect(()=>{
        const friendRequestRef = ref(db, 'friendrequest/');
            onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                arr.push(item.val());
            })
            setReqList(arr)
            });
    },[])

  return (
    <div className='box'>
    <h3>Friend Request </h3>

    {reqList.map(item=>(
        <>
                <div className="list">
        <div className="img" >
            <img src={profile}/>
        </div>
        <div className="details">
            <h4>Friend Reunion</h4>
            <p>Hi guys, Whats up!</p>
        </div>
        <div className="button">
        <Button size='small' variant="contained">Join</Button>
        </div>
        </div>
        </>
    ))}
    
    
   
</div>
  )
}

export default FriendRequest