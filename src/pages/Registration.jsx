import { Grid,TextField,Button } from "@mui/material" 
import registrationphoto from "../assets/registrationphoto.png"
import Heading_reg_to_log from "../componnent/Heading_reg_to_log"

const Registration = () => {
  return (
   <>
    <Grid container spacing={2}>
  <Grid item xs={6}>
   <div className="regcontainer">
   <Heading_reg_to_log className="headreglog" title="Get started with easily register"/>
   <p>Free register and you can enjoy it</p>
   <div className="regInput">
   <TextField id="outlined-basic" label="Email Address" variant="outlined" />
   </div>
   <div className="regInput">
   <TextField id="outlined-basic" label="Full Name" variant="outlined" />
   </div>
   <div className="regInput">
   <TextField id="outlined-basic" label="Password" variant="outlined" />
   </div>
   <Button variant="contained">Sign UP</Button>
  
   </div>
  </Grid>
  <Grid item xs={6}>
    <img className="regimg" src={registrationphoto} />
  </Grid>
  
</Grid>
   </>
  )
}

export default Registration