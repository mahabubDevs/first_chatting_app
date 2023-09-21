// import React, {useState} from 'react'
// import { Outlet } from 'react-router-dom'
// import Grid from '@mui/material/Grid';
// import profile from '../assets/profile.png'
// import {AiFillHome,AiFillMessage,AiFillNotification,AiFillSetting,AiOutlineLogout} from 'react-icons/ai'
// import { Link,useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';



// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const RootLayout = () => {

//   const location = useLocation();
//   let userData = useSelector((state)=> state.loggedUser.loginUser)
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   //logout part



//   //logout end






//   return (
//     <>
//         <Grid container spacing={2}>
//         <Grid item xs={1}>
//           <div className='navbar'>
//             <div className='navcontainer'>
//               <img onClick={handleOpen} src={profile}/>
//               <h4 className='username'>{userData.displayName}</h4>
//                 <ul>
//                   <li>
//                     <Link to="/chatting/home" className={location.pathname == "/chatting/home" ? 'active': 'icon'}  >
//                     <AiFillHome />
//                     </Link>
//                   </li>
//                   <li>
//                   <Link to="/chatting/message" className={location.pathname == "/chatting/message" ? 'active': 'icon'}>
//                     <AiFillMessage />
//                   </Link>
//                   </li>
//                   <li>
//                   <Link to="/chatting/notification" className={location.pathname == "/chatting/notification" ? 'active': 'icon'}>
//                     <AiFillNotification />
//                   </Link>
//                   </li>
//                   <li>
//                   <Link to="/chatting/setting" className={location.pathname =="/chatting/setting" ? 'active': 'icon'}>
//                       <AiFillSetting />
//                   </Link>
//                   </li>
//                   <li>
//                   <Link to="/chatting/logout"  className={location.pathname == "/chatting/logout" ? 'active': 'icon'}>
//                       <AiOutlineLogout  />
//                   </Link>
//                   </li>
//                 </ul>
//             </div>
//           </div>
//         </Grid>
//         <Grid item xs={11}>
//         <Outlet/> 
//         </Grid>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//       </Grid>

//     {/* <div>RootLayout</div>
//     <Outlet/> */}
//     </>
//   )
// }

// export default RootLayout









import React, {useState,createRef} from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import profile from '../assets/profile.png'
import {
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ButtonBase } from "@mui/material";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as rref, set } from "firebase/database";
import { userdata } from "../slices/user/userSlice";


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

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


const RootLayout = (props) => {
  const location = useLocation();
  const storage = getStorage();
  const db = getDatabase();
  let dispatch = useDispatch()
  
  let userData = useSelector((state) => state.loggedUser.loginUser);
  const storageRef = ref(storage, userData.uid);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        getDownloadURL(snapshot.ref).then((url)=>{
          console.log(url)
          set(rref(db, 'users/' + userData.uid), {
            username: userData.displayName,
            email: userData.email,
            profile_picture : url
          }).then((user)=>{
            localStorage.setItem("user",JSON.stringify({...userData,photoURL:url}))
            dispatch(userdata({...userData,photoURL:url}))
          }).then(()=>{
            setOpen(false)
            setImage("")
          })
        })
      });
    }

  };



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navbar">
            <div className="navcontainer">
              <img onClick={handleOpen} src={userData.photoURL} />
              <h4 className="username">{userData.displayName}</h4>
              <ul>
                <li>
                  <Link
                    to="/bachal/home"
                    className={
                      location.pathname == "/bachal/home" ? "active" : "icon"
                    }
                  >
                    <AiFillHome />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bachal/message"
                    className={
                      location.pathname == "/bachal/message" ? "active" : "icon"
                    }
                  >
                    <AiFillMessage />
                  </Link>
                </li>
                <li>
                  <AiFillNotification className="icon" />
                </li>
                <li>
                  <AiFillSetting className="icon" />
                </li>
                <li>
                  <AiOutlineLogout className="icon" />
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
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
          {image&&<div className="imgbox">
                  <div className="img-preview"></div>
                  </div>}
          <input type="file" onChange={onChange} />
          {image 
          ?
          <>
          
          <Cropper
          ref={cropperRef}
          zoomTo={0.5}
          preview=".img-preview"
          src={image}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
          </>
          :
          <div className="imgbox">

            <img style={{width:"100px",height:"100px",borderRadius:"50%"}} src={userData.photoURL}/>
          </div>
          }
          
        <Button onClick={handleCropData}>Upload</Button>
          </Typography>
        </Box>
      </Modal>
      </Grid>

      {/* <h1>Navbar</h1>
        <Outlet/> */}
    </>
  );
};

export default RootLayout;