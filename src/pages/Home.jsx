import { Button } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroup from '../components/MyGroup';
import UserList from '../components/UserList';
import BlockUser from '../components/BlockUser';

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate()

    // let handelLogOut = ()=>{
    //     signOut(auth).then(() => {
    //         navigate("/login")
    //       }).catch((error) => {
    //         // An error happened.
    //       });
    // }

  return (
   <>
       <Grid container spacing={2}>
    <Grid item xs={4}>
      <div>
         <Group/> 
         <FriendRequest/>
      </div>
    </Grid>
    <Grid item xs={4}>
      <div>
        <Friends/>
        <MyGroup/>
      </div>
    </Grid>
    <Grid item xs={4}>
        <div>
          <UserList/>
          <BlockUser/>
        </div>
    </Grid>
     {/* <Button onClick={handelLogOut}  variant='contained'>Log Out</Button> */}
  </Grid>
   </>
   )
}

export default Home