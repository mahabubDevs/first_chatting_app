import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    let userData = useSelector((state)=> state.loggedUser.loginUser)
    let [friends, setFriends] = useState([])

    useEffect(()=>{
        const friendsRef = ref(db, 'friends/' );
        onValue(friendsRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(item.val().whosentid== userData.uid || item.val().whoreseveid == userData.uid){

                arr.push({...item.val(), id: item.key});
            }
        })
        setFriends(arr)
        });
    })

  return (
    <div className='box'>
    <h3>Friends </h3>
    
    {friends.map(item=>(
    <div className="list">
        <div className="img" >
            <img src={profile}/>
        </div>
        <div className="details">
            {item.whoreseveid == userData.uid
            ? 
            <h4>{item.whosentname}</h4>
            :
            <h4>{item.whoresevename}</h4>
            
            }
            <p>Hi guys, Whats up!</p>
        </div>
        <div className="button">
        <Button size='small' variant="contained">Block</Button>
        </div>
    </div>
    ))}

</div>
  )
}

export default Friends