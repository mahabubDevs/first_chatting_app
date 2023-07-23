import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,push,set,remove } from "firebase/database";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { useSelector } from 'react-redux'

   

const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();

    let userData = useSelector((state)=> state.loggedUser.loginUser)


    let [userList,setUserList] = useState([])
    let [friendRequest,setFriendRequest] = useState([])
    let [friends,setFriends] = useState([])


    useEffect(()=>{
        const usersRef = ref(db, 'friendrequest/');
        onValue(usersRef, (snapshot) => {
            let arr = []
        snapshot.forEach(item=>{

            arr.push(item.val().whoreseveid+item.val().whosentid)
        })
        setFriendRequest(arr)
        
        });

        // console.log(userList)
    },[])
    useEffect(()=>{
        const usersRef = ref(db, 'friends/');
        onValue(usersRef, (snapshot) => {
            let arr = []
        snapshot.forEach(item=>{

            arr.push(item.val().whoreseveid+item.val().whosentid)
        })
        setFriends(arr)
        
        });

        // console.log(userList)
    },[])



    // console.log(auth.currentUser)

    useEffect(()=>{
        const usersRef = ref(db, 'users/');
            onValue(usersRef, (snapshot) => {
                let arr = []
            snapshot.forEach(item=>{
                if(userData.uid != item.key){

                    arr.push({...item.val(),id: item.key})
                }
            })

            setUserList(arr)
            });

            console.log(userList)
    },[])


    let handelFirendRequest = (item)=>{

        set(ref(db, 'friendrequest/' + item.id), {
            whosentid: auth.currentUser.uid,
            whosentname: auth.currentUser.displayName,
            whoreseveid: item.id,
            whoresevename: item.username
          });
    }

        let handelCancle=(item)=>{
            console.log(item.id);
            remove(ref(db, 'friendrequest/'+ item.id)); 

        }

  return (
    <div className='box'>
    <h3>User List </h3>

    {userList.map(item=>(
         <>
        <div className="list">
             <div className="img" >
                 <img src={profile}/>
             </div>
             <div className="details">
                 <h4>{item.username}</h4>
                 <p>{item.email}</p>
             </div>
             <div className="button">
                {friendRequest.includes(item.id+auth.currentUser.uid)? 
                
                <Button onClick={()=>handelCancle(item)}  size='small' variant="contained">+</Button>
                : friendRequest.includes(auth.currentUser.uid+item.id)?(
                <Button size='small' variant="contained">Pending</Button>
                )
                : friends.includes(auth.currentUser.uid+item.id)|| friends.includes(item.id+auth.currentUser.uid) ? <Button size='small' variant="contained" color='success'>Friend</Button> :
                <Button onClick={handelFirendRequest(item)} size='small' variant="contained">+</Button>

                }
             </div>
         </div>
         </>
    ))}
    
   
  
</div>
  )
}

export default UserList