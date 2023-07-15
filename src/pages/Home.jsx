import { Button } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Group from '../components/Group';

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
      <div> <Group/> </div>
    </Grid>
    <Grid item xs={4}>
      <div>ksdfks</div>
    </Grid>
    <Grid item xs={4}>
        <div>ksdfskdf</div>
    </Grid>
     {/* <Button onClick={handelLogOut}  variant='contained'>Log Out</Button> */}
  </Grid>
   </>
   )
}

export default Home