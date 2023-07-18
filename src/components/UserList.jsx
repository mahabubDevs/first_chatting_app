import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";


   

const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();


    let [userList,setUserList] = useState([])

    console.log(auth.currentUser)

    useEffect(()=>{
        const usersRef = ref(db, 'users/');
            onValue(usersRef, (snapshot) => {
                let arr = []
            snapshot.forEach(item=>{
                arr.push({...item.val(),id:item.key})
            })

            setUserList(arr)
            });

            console.log(userList)
    },[])


    let handelFirendRequest = (item)=>{
        console.log(" k pataice", auth.currentUser.uid)
        console.log(" k pataice", item.id)

        // set(ref(db, 'users/' ), {
        //     username: values.fullName,
        //     email: values.email,
        //     profile_picture : user.user.photoURL
        //   });
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
             <Button onClick={handelFirendRequest} size='small' variant="contained">+</Button>
             </div>
         </div>
         </>
    ))}
    
   
  
</div>
  )
}

export default UserList