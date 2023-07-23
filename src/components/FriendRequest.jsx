import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();

    let userData = useSelector((state)=> state.loggedUser.loginUser)
    let [reqList,setReqList] = useState([])

    useEffect(()=>{
        const friendRequestRef = ref(db, 'friendrequest/');
            onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{

                console.log(item.val().whoreseveid)
                if(item.val().whoreseveid == userData.uid)
                arr.push({...item.val(), id: item.key});
            })
            setReqList(arr)
            });
    },[]);

    let handelDelete = (id)=>{
        console.log(id); 
        remove(ref(db, 'friendrequest/' + id)); 
    }

    let handelAccept = (item)=>{
        set(push(ref(db, 'friends/')), {
            ...item,
          }).then(()=>{
            remove(ref(db, 'friendrequest/' + item.id));
          })
    }
    

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
            <h4>{item.whosentname} </h4>
            <p>Hi guys, Whats up!</p>
        </div>
        <div className="button">
        <Button onClick={()=>handelAccept(item)} size='small' variant="contained">Accept</Button>
        <Button onClick={()=>handelDelete(item.id)} size='small' variant="contained" color='error'>Reject</Button>
        </div>
        </div>
        </>
    ))}
    
    
   
</div>
  )
}

export default FriendRequest