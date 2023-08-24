

import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MyGroup = () => {
    const db = getDatabase();


    let userData = useSelector((state)=> state.loggedUser.loginUser)
    let [reqList,setReqList] = useState([])
    let [myGruoupRecList,setmyGruoupRecList] = useState([])
    let [myMemberList,setMyMemberList] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
  
    const handleOpen = (group) =>{
        const friendRequestRef = ref(db, 'grouprequest/');
        onValue(friendRequestRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(userData.uid == item.val().admin && item.val().groupid == group.groupid){
                arr.push({...item.val(), groupid: item.key});
            }
            
            // if(item.val().admin == userData.uid)
            
        })
        setmyGruoupRecList(arr)
        });
        
        setOpen(true);
    
      }

      
    const handleOpen2 = (member) =>{
        const friendRequestRef = ref(db, 'members');
        onValue(friendRequestRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(userData.uid == item.val().admin && item.val().groupid == member.groupid){
                arr.push({...item.val(), membersid: item.key});
            }
            
        })
        setMyMemberList(arr)
        });
        
        setOpen2(true);
    
      }
    
    //   const handleOpen2 = (member) => {
    //     const groupRef = ref(db, 'members');
    //     onValue(groupRef, (snapshot) => {
    //         let arr = []
    //         snapshot.forEach(item=>{
    //             if(userData.uid == item.val().admin && item.val().groupid == member.groupid){
    //                 arr.push({...item.val(), memberid:item.key})
    //             }
    //         })
    //         setMyMemberList(arr)
    //     });
    //     setOpen2(true)
     
    //   };
    
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
    
    // useEffect(()=>{
    //     const friendRequestRef = ref(db, 'grouprequest/');
    //         onValue(friendRequestRef, (snapshot) => {
    //         let arr = []
    //         snapshot.forEach(item=>{
    //             if(loginUser.uid == item.val().adminid && item.val().groupid == group.groupid){
    //                 arr.push({...item.val(), groupid: item.key});
    //             }
                
    //             if(item.val().admin == userData.uid)
                
    //         })
    //         setmyGruoupRecList(arr)
    //         });
    // },[]);

    let handleGroupDelete = (item)=>{
        console.log(item.groupid)

        remove(ref(db, "grouprequest/" + item.groupid));

    }
    let handleMemberAccept = (item)=>{
        console.log(item)
        set(push(ref(db, 'members/')), {
            ...item
          }).then(()=>{
            remove(ref(db, "grouprequest/" + item.groupid));
          })
    }

  return (


     <div className='box'>
    <h3>My Group </h3>
    
    {reqList.map(item=>(
        userData.uid == item.admin &&

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
                    <Button onClick={()=>handleOpen(item)} size='small' variant="contained">Request</Button>
                    <Button onClick={()=>handleOpen2(item)} size='small' variant="contained" color='success'>Member</Button>
                    </div>
            </div>
        </>
    ))}
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {myGruoupRecList.map(item=>(

                <>
                     <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.username}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                          

                        </Typography>
                        {" — want's to join your group"}
                        <br/>
                        <Button onClick={()=>handleMemberAccept(item)} size='small' variant="contained" color='success'>Accept</Button>
                        <Button onClick={()=>handleGroupDelete(item)}  size='small' variant="contained" color='error'>Delete</Button>
                        </React.Fragment>
                    }
                    />
                    
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
            ))}
               

    </List>
          </Typography>
        </Box>
      </Modal>
{/* group request end */}


         <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Members List
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {myMemberList.map(item=>(
                
                <>
                     <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.username}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                          

                        </Typography>
                        {" — want's to join your group"}
                        <br/>
                       
                        {/* <Button onClick={()=>handleGroupDelete(item)}  size='small' variant="contained" color='error'>Remove</Button> */}
                        </React.Fragment>
                    }
                    />
                    
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
            ))}
               

    </List>
          </Typography>
        </Box>
        </Modal>

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