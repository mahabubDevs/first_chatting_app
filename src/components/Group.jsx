import React from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';

const Group = () => {
  return (
    <div className='box'>
        <h3 className='title'>Group List <Button size='small' variant="contained">Create Group</Button> </h3>
        
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