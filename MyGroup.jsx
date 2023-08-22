


import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroup = () => {
    const db = getDatabase();


    let userData = useSelector((state)=> state.loggedUser.loginUser)
    let [reqList,setReqList] = useState([])
    
    useEffect(()=>{
        const friendRequestRef = ref(db, 'groups/');
            onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{

                console.log(item.val().whoreseveid)
                if(item.val().admin == userData.uid)
                arr.push({...item.val(), groupid: item.key});
            })
            setReqList(arr)
            });
    },[]);



  return (


     <div className='box'>
    <h3>My Group </h3>
    
    {reqList.map(item=>(

        <>
            <div className="list">
                <div className="img" >
                    <img src={profile}/>
                </div>
                <div className="details">
                    <p style={{fontSize:"12px"}}>{item.adminname}</p>
                    <h4>{item.groupname}</h4>
                    <p>{item.grouptagline}</p>
                </div>
                    <div className="button">
                    <Button size='small' variant="contained">Request</Button>
                    <Button size='small' variant="contained" color='success'>Member</Button>
                    </div>
            </div>
        </>
    ))}
    

</div>
    
  )
}

export default MyGroup





// import React from 'react'
// import profile from '../assets/profile.png'
// import Button from '@mui/material/Button';

// const MyGroup = () => {
//   return (
   
//      <div className='box'>
//     <h3>My Group </h3>
    
//     <div className="list">
//         <div className="img" >
//             <img src={profile}/>
//         </div>
//         <div className="details">
//             <h4>Friend Reunion</h4>
//             <p>Hi guys, Whats up!</p>
//         </div>
//         <div className="button">
//         <Button size='small' variant="contained">Join</Button>
//         </div>
//     </div>

// </div>
    
//   )
// }

// export default MyGroup