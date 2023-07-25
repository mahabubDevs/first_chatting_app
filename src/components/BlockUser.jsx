// import React, {useState, useEffect } from 'react'
// import profile from '../assets/profile.png'
// import Button from '@mui/material/Button';
// import { getDatabase, ref, onValue } from "firebase/database";
// import { useSelector } from 'react-redux';

// const BlockUser = () => {
//     const db = getDatabase();
//     let [blocklist,setBlocklist] = useState([])
//     let userData = useSelector((state)=> state.loggedUser.loginUser)

//     useEffect(() =>{
//         const blocklistRef = ref(db, 'blockList' );
//             onValue(blocklistRef, (snapshot) => {
//             let arr = [];
//             snapshot.forEach((item)=>{
                
//                 arr.push({...item.val(),id: item.key});
//             });
//             setBlocklist(arr); 
//         });
//     }, [])

//     let handleunblock=()=>{
//         remove(ref(db, "block/" + item.id));
//     }

//   return (
//     <div className='box'>
//     <h3>Block User </h3>
//     {blocklist.map((item)=>(
//          <div className="list">
//          <div className="img" >
//              <img src={profile}/>
//          </div>
//          <div className="details">
//             {item.blockbyid == userData.uid 
//             ?
//             <h4>{item.blockedname}</h4>
//             :
//             <h4>{item.blockbyname}</h4>
//              }
            
//              <p>Hi guys, Whats up!</p>
//          </div>
//          <div className="button">
//             {item.blockbyid == userData.uid && 
            
//          <Button  onClick={() => handleunblock(item)} size='small' variant="contained">UnBlock</Button>
//             }
//          </div>
//      </div>
//     ))}
   

// </div>
//   )
// }

// export default BlockUser


import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockUser = () => {
  const db = getDatabase();

  let [blocklist, setBlocklist] = useState([]);

  let userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBlocklist(arr);
    });
  }, []);

  let handleunblock = (item) => {
    remove(ref(db, "block/" + item.id));
  };

  return (
    <div className="box">
      <h3>Block User</h3>

      {blocklist.map((item) => (
        <>
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              {item.blockbyid == userData.uid ? (
                <h4>{item.blockedname}</h4>
              ) : (
                <h4>{item.blockbyname}</h4>
              )}

              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
              {item.blockbyid == userData.uid && (
                <Button
                  onClick={() => handleunblock(item)}
                  size="small"
                  variant="contained"
                >
                  Unblock
                </Button>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default BlockUser;