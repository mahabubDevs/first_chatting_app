import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import { activeChat } from '../slices/activechat/activeChatSlice';

const Friends = ({button}) => {
    const db = getDatabase();
    let userData = useSelector((state)=> state.loggedUser.loginUser)
    let [friends, setFriends] = useState([])
    let dispatch = useDispatch();

    useEffect(()=>{
        const friendsRef = ref(db, 'friends/' );
        onValue(friendsRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(item.val().whosentid== userData.uid || item.val().whoreseveid == userData.uid){

                arr.push({...item.val(), id: item.key});
            }
        })
        setFriends(arr);
        if (arr[0].whosentid == userData.uid){
          dispatch(
            activeChat({
              type: "singlemsg",
              name: arr[0].whoresevename,
              id: arr[0].whoreseveid,
            })
          );
          localStorage.setItem(
            "activeChat",
            JSON.stringify({
              type: "singlemsg",
              name: arr[0].whoresevename,
              id: arr[0].whoreseveid,
            })
          )
        }else{
          dispatch(
            activeChat({
              type: "singlemsg",
              name: arr[0].whosentname,
              id: arr[0].whosentid,
            })
          );
          localStorage.setItem(
            "activeChat",
            JSON.stringify({
              type: "singlemsg",
              name: arr[0].whosentname,
              id: arr[0].whosentid,
            })
          );
        }
        
        });
    },[])

    let handelUnFriend = (item)=>{
        remove(ref(db, 'friends/'+ item.id));
    }

    let handelBlock = (item)=>{
            if(userData.uid == item.whosentid){
                set(push(ref(db, 'block/')), {
                   blocked: item.whoresevename,
                   blockedname:item.whoreseveid,
                   blockbyid:item.whosentid,
                   blockbyname:item.whosentname
                  }) .then(()=>{
                    remove(ref(db, 'friends/' + item.id));
                  })
                
            }else{
                set(push(ref(db, 'block/')), {
                    blocked: item.whosentname,
                    blockedname:item.whosentid,
                    blockbyid:item.whoreseveid,
                    blockbyname: item.whoresevename
                   }).then(()=>{
                    remove(ref(db, 'friends/' + item.id));
                  })
            }
    }

    let handleMsg = (item) => {
        if (item.whosentid == userData.uid) {
          dispatch(
            activeChat({
              type: "singlemsg",
              name: item.whoresevename,
              id: item.whoreseveid,
            })
          );
          localStorage.setItem(
            "activeChat",
            JSON.stringify({
              type: "singlemsg",
              name: item.whoresevename,
              id: item.whoreseveid,
            })
          );
        } else {
          dispatch(
            activeChat({
              type: "singlemsg",
              name: item.whosentname,
              id: item.whosentid,
            })
          );
          localStorage.setItem(
            "activeChat",
            JSON.stringify({
              type: "singlemsg",
              name: item.whosentname,
              id: item.whosentid,
            })
          );
        }
      };

  return (
    <div className='box'>
    <h3>Friends </h3>
    
    {friends.map(item=>(
    <div className="list">
        <div className="img" >
            <img src={profile}/>
        </div>
        <div className="details">
            {item.whoreseveid == userData.uid
            ? 
            <h4>{item.whosentname}</h4>
            :
            <h4>{item.whoresevename}</h4>
            
            }
            <p>Hi guys, Whats up!</p>
        </div>
         <div className="button">
              {button == "Msg" ? (
                <Button
                  onClick={() => handleMsg(item)}
                  size="small"
                  variant="contained"
                >
                  msg
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handelBlock(item)}
                    size="small"
                    variant="contained"
                  >
                    Block
                  </Button>
                  <Button
                    onClick={() => handelUnFriend(item)}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
    </div>
    ))}

</div>
  )
}

export default Friends