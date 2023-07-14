import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';

const RootLayout = () => {
  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className='navbar'>
            <div className='navcontainer'>

            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
        <Outlet/> 
        </Grid>
      </Grid>

    {/* <div>RootLayout</div>
    <Outlet/> */}
    </>
  )
}

export default RootLayout