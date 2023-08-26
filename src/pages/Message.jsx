import React from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroup from '../components/MyGroup';
import UserList from '../components/UserList';
import BlockUser from '../components/BlockUser';

const Message = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <div>
         <Group/> 
         <Friends/>
      </div>
    </Grid>
    <Grid item xs={8}>
      <div>
       
        <MyGroup/>
      </div>
    </Grid>
  
  
  </Grid>
  )
}

export default Message