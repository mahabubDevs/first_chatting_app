import React, { useState } from 'react'
import {Button, TextField,} from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const auth = getAuth();
    let navigate = useNavigate()


    let [text,setText] = useState("")
    let handelForgotPassword = ()=>{
        sendPasswordResetEmail(auth, text)
  .then(() => {
    navigate("/login")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
        console.log(text)
    }

  return (
    <div className='forgotPassword'>
        <div className='box'>
            <h1>Forgot Password</h1>
        <TextField onChange={(e)=>setText(e.target.value)} name='email' id="outlined-basic" label="Email" variant="outlined" />
        <Button onClick={handelForgotPassword} variant='contained'>Confirm</Button>
        </div>
    
    </div>
  )
}

export default Forgotpassword