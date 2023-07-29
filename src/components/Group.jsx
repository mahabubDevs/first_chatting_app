import React, { useState ,useEffect} from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Modal,TextField} from '@mui/material';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set,push,onValue } from "firebase/database";

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

  let groupData = {
    groupname: "",
    grouptagline:"",
  }



const Group = () => {
  const db = getDatabase();

  let userData = useSelector((state)=>state.loggedUser.loginUser)

    let [groupInfo,setGroupInfo] = useState(groupData)
   const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [reqList,setReqList] = useState([])

  
  let handelChange =(e)=>{
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    })
  }

  let handelSubmit =()=>{
    // console.log({
    //   groupname:groupInfo.groupname,
    //   grouptagline: groupInfo.grouptagline,
    //   admin: userData.uid,
    //   adminname: userData.displayName,

    // })
   
    set(push(ref(db, 'groups/' )), {
      groupname:groupInfo.groupname,
      grouptagline: groupInfo.grouptagline,
      admin: userData.uid,
      adminname: userData.displayName,
    }).then(()=>{
      setOpen(false)
    })
  }

  useEffect(()=>{
    const friendRequestRef = ref(db, 'groups/');
        onValue(friendRequestRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{

            console.log(item.val().whoreseveid)
            if(item.val().admin != userData.uid)
            arr.push({...item.val(), id: item.key});
        })
        setReqList(arr)
        });
},[]);


  return (
    <div className='box'>
        <h3 className='title'>Group List
         <Button  onClick={handleOpen} size='small' variant="contained">Create Group</Button> </h3>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Creat your Group
          </Typography>
          <Typography margin='dense' id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField onChange={handelChange} name='groupname' margin='dense' id="outlined-basic" label="Group Name" variant="outlined" />
          <TextField onChange={handelChange} name='grouptagline' margin='dense' id="outlined-basic" label="Group tagline" variant="outlined" />
          <br></br>
          <Button onClick={handelSubmit} variant="contained">Contained</Button>
          </Typography>
        </Box>
      </Modal>
      {reqList.map(item=>(
        <>
            <div className="list">
        <div className="img" >
            <img src={profile}/>
        </div>
        <div className="details">
            <h4>{item.groupname}</h4>
            <p>{item.grouptagline}</p>
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

export default Group