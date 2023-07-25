import React from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

const Group = () => {

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
        <div className="list">
            <div className="img" >
                <img src={profile}/>
            </div>
            <div className="details">
                <h4>Friend Reunion</h4>
                <p>Hi guys, Whats up!</p>
            </div>
            <div className="button">
            <Button size='small' variant="contained">Join</Button>
            </div>
        </div>

    </div>
  )
}

export default Group