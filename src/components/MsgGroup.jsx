import React, { useEffect, useState } from "react";
import {getDatabase,ref, onValue,remove,set, push,} from "firebase/database";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { activeChat } from '../slices/activechat/activeChatSlice';

const MsgGroup = () => {
  const db = getDatabase();

  let [myGroupList, setMyGroupList] = useState([]);
  let [member, setMember] = useState([]);

  let loginUser = useSelector((state) => state.loggedUser.loginUser);
  let dispatch = useDispatch();

  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupid: item.key });
      });
      setMyGroupList(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "members");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());

        arr.push(item.val());
      });
      setMember(arr);
    });
  }, []);

  let handleOpen2 = (item) => {
    console.log(item);
    dispatch(
      activeChat({
        type: "groupmsg",
        name: item.groupname,
        id: item.groupid,
      })
    );

    localStorage.setItem(
      "activeChat",
      JSON.stringify({
        type: "groupmsg",
        name: item.groupname,
        id: item.groupid,
      })
    );
  };

  return (
    <div className="box">
        <h3 className='title'>Group List
          </h3>
      <h1>{JSON.stringify(member.includes(loginUser.uid))}</h1>
      {myGroupList.map((item) =>
        loginUser.uid == item.admin ? (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              <p style={{ fontSize: "12px" }}>Admin: {item.adminname}</p>
              <h4>{item.groupname}</h4>
              <p>{item.grouptagline}</p>
            </div>
            <div className="button">
              <Button
                onClick={() => handleOpen2(item)}
                size="small"
                variant="contained"
                color="success"
              >
                admin
              </Button>
            </div>
          </div>
        ) : (
          member.map(
            (mem) =>
              loginUser.uid == mem.userid &&
              item.groupid == mem.groupid && (
                <div className="list">
                  <div className="img">
                    <img src={profile} />
                  </div>
                  <div className="details">
                    <p style={{ fontSize: "12px" }}>Admin: {mem.adminname}</p>
                    <h4>{mem.groupname}</h4>
                    <p>{mem.grouptagline}</p>
                  </div>
                  <div className="button">
                    <Button
                      onClick={() => handleOpen2(item)}
                      size="small"
                      variant="contained"
                      color="success"
                    >
                      Member
                    </Button>
                  </div>
                </div>
              )
          )
        )
      )}
    </div>
  );
};

export default MsgGroup;