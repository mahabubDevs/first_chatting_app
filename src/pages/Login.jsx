import React, { useState } from 'react'
import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import google from "../assets/google.png"
import login from "../assets/lognin.png"
import Headignforreglog from '../components/headignforreglog';
import { Link,json,useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { userdata } from '../slices/user/userSlice';





let initialValue = {
  email: "",
  password:"",
  loading:false
}


const Login = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let [values,setvalues] = useState(initialValue)
  const notify = (msg) => toast(msg);

  let [error,setError]  = useState()

  let handelValus = (e)=>{
    setvalues({
      ...values,
      [e.target.name]: e.target.value
    })
    // console.log(values)
  }

  let handelSubmit = () =>{
    let {email,password} = values
    setvalues({
      ...values,
      loading: true
    })
  
    signInWithEmailAndPassword(auth,email,password).then((user)=>{
      setvalues({
        email: "",
        password:"",
        loading: false
      })
      // navigate("/login")
      if(!user.user.emailVerified){
        notify("please verified email")
      }else{
        dispatch(userdata(user.user))
        localStorage.setItem("user",JSON.stringify(user.user))
        navigate("/chatting/home")
      }
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      notify(errorCode)
      console.log(errorCode)
      setError(errorCode)
      setvalues({
        ...values,
        password:"",
        loading: false
      })
    });
    // console.log(email,password)
  }
  

  let handelGoogleLogin = ()=>{
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
    })
  }

  return (
    <>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className='regcontainer'>
         <Headignforreglog className="headignreglog" title="Login to your account!"/>
         <img onClick={handelGoogleLogin} className='google' src={google} />
          <div className='regInput'>
         <TextField value={values.email} onChange={handelValus} name='email' id="outlined-basic" label="Email" variant="outlined" />
         {error && <Alert severity="error">{error.includes("auth/user-not-found") && "user-not-found "} </Alert>}
          </div>
          <div className='regInput'>
          <TextField value={values.password} type='password' onChange={handelValus} name='password' id="outlined-basic" label="Password" variant="outlined" />
          {error && <Alert severity="error">{error.includes("auth/wrong-password") && "password not correct"}</Alert>}
         </div>

        <Alert severity="info" style={{marginButtom:"20px"}}>
          Don't Have An Account?<strong><Link to="/">Register</Link></strong>
        </Alert>

         {values.loading ? 
         <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
         :
         <>
            <Button style={{marginBottom:"10px",marginTop:"10px"}} onClick={handelSubmit} className='loginButton' variant="contained">Login to Continue  </Button>
            {/* <Button onClick={notify} className='loginButton' variant="contained">Login   </Button> */}
         </>

        }
       
         <Alert severity="error" style={{marginButtom:"20px"}}>
        <strong><Link to="/forgotpassword">Forgot Password</Link></strong>
       </Alert>


        
        </div>
     </Grid>
    <Grid item xs={6}>
      <img className='regi' src={login} />
    </Grid>
 
</Grid>
    
    </>
  )
}

export default Login