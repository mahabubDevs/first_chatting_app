import React from 'react'
import {createRoutesFromElements, createBrowserRouter,Route,RouterProvider} from "react-router-dom";
import Registation from './pages/Registation';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from './pages/Message';
import RootLayout from './components/RootLayout';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Registation />}  > </Route>
    <Route path="/login" element={<Login />}  > </Route>
    <Route path="/forgotpassword" element={<Forgotpassword />}  > </Route>
    <Route path="/chatting" element={<RootLayout/>}>
      <Route path="home" element={<Home />}  > </Route>
      <Route path="message" element={<Message />}  > </Route>
    </Route>
    </>
  )
);
const App = () => {
  return (
    <>
       <ToastContainer />
      <RouterProvider router={router} />
    </>
  ) 
}

export default App
