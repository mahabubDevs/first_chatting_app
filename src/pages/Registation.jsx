import React, { useState } from 'react'
import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import registration from "../assets/registration.png"
import Headignforreglog from '../components/headignforreglog';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import {  useNavigate,Link } from 'react-router-dom';
import {FaRegEyeSlash,FaEye} from 'react-icons/fa'



let initialValue = {
  fullName:" ",
  email: "",
  password:"",
  loading:false,
  error: "",
  eye: false
}

const Registation = () => {

  const auth = getAuth();

  let navigate = useNavigate()


  let [values,setvalues] = useState(initialValue)

  let handelValus = (e)=>{
    setvalues({
      ...values,
      [e.target.name]: e.target.value
    })
    // console.log(values)
  }


let handelSubmit = () =>{
  let {email,password,fullName} = values
  if(!email){
      setvalues({
      ...values,
      error: "Enter an Email"
      })
      return
  }

  if(!fullName){
    setvalues({
    ...values,
    error: "Enter an Name"
    })
    return
  }
  if(!email){
    setvalues({
    ...values,
    error: "Enter an Email"
    })
    return
  }
  // var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // if(!password || !pattern.test(password)){
  if(!password ){
    setvalues({
    ...values,
    error: "Enter an Password uppercase symbol and number"
    })
    return
  }

  setvalues({
    ...values,
    loading: true
  })

  createUserWithEmailAndPassword(auth,email,password).then((user)=>{
    console.log(user)
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("email sent")
    });
    setvalues({
      fullName:" ",
      email: "",
      password:"",
      loading: false
    })
    navigate("/login")
  })
  // console.log(email,password)
}

let handeleye = ()=>{
  setvalues({
    ...values,
    eye: !values.eye
  })
}

  return (
    <>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className='regcontainer'>
         <Headignforreglog className="headignreglog" title="Get started with easily register"/>
         <p>Free register and you can enjoy it</p>
         <div className='regInput'>
          <TextField value={values.fullName} onChange={handelValus} name='fullName' id="outlined-basic" label="Name" variant="outlined" />
          </div>
          { values.error.includes("Name") && <Alert severity="error">{values.error}</Alert> }
          
          <div className='regInput'>
         <TextField value={values.email} onChange={handelValus} name='email' id="outlined-basic" label="Email" variant="outlined" />
          </div>
          { values.error.includes("Email") && <Alert severity="error">{values.error}</Alert> }
         
          <div className='regInput'>
          <TextField value={values.password} type={values.eye ? 'text' : 'password'} onChange={handelValus} name='password' id="outlined-basic" label="password" variant="outlined" />
         </div>
         { values.error.includes("Password") && <Alert severity="error">{values.error}</Alert> }

         <div onClick={handeleye} className='eye'>
          {values.eye
          ? 
          <FaEye/>
          :
          <FaRegEyeSlash/>
          }

         </div>

         <Alert severity="info" style={{marginButtom:"20px"}}>
          Alrady Have An Account?<strong><Link to="/login">Login</Link></strong>
        </Alert>

         {values.loading ? 
         <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
         :
         <Button onClick={handelSubmit} variant="contained">Sign UP </Button>
         
         }
        </div>
     </Grid>
    <Grid item xs={6}>
      <img className='regi' src={registration} />
    </Grid>
 
</Grid>
    
    </>
  )
}

export default Registation