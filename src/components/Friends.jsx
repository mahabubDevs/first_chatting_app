import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
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

    let handelUnFriend = (item)=>{
        remove(ref(db, 'friends/'+ item.id));
    }

    let handelBlock = (item)=>{
            if(userData.uid == item.whosentid){
                set(push(ref(db, 'block/')), {
                   blocked: item.whoresevename,
                   blockedname:item.whoreseveid,
                   blockbyid:item.whosentid,
                   blockbyname:item.whosentname
                  }) .then(()=>{
                    remove(ref(db, 'friends/' + item.id));
                  })
                
            }else{
                set(push(ref(db, 'block/')), {
                    blocked: item.whosentname,
                    blockedname:item.whosentid,
                    blockbyid:item.whoreseveid,
                    blockbyname: item.whoresevename
                   }).then(()=>{
                    remove(ref(db, 'friends/' + item.id));
                  })
            }
    }


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
        <Button onClick={()=>handelBlock(item)}  size='small' variant="contained">Block</Button>
        <Button onClick={()=>handelUnFriend(item)}  size='small' variant="contained" color='error'>UnFriend</Button>
        </div>
    </div>
    ))}

</div>
  )
}

export default Friends