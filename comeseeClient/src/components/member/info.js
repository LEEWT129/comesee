import React, { useState, useEffect, useContext } from "react";
import Milestone from "./Milestone";
import AvatarUpload from "./AvatarUpload";
import member from "../../css/member/member.module.css";
import catchUser from "../../TicketContext";
import Axios from "axios";


const Info = () => {
  const context = useContext(catchUser);
  const user = context.state.userID;

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    selfintro: "",
  });

  useEffect(() => {
    Axios.get(`http://localhost:2407/user/${user}`)
      .then((response) => {
        setUserData(response.data[0]); 
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  return (
    <div className={member.infosec}>
      <div className={member.info}>
        <div className={member.img}>
          <AvatarUpload />
        </div>
        <div className={member.intro}>
          <div className={member.user}>
            <p className={member.username}>{userData.userName}</p>
            <p className={member.userid}>{userData.email}</p> 
          </div>
          <p className={member.newintro}>{userData.selfintro || "新增自我介紹"}</p>
        </div>
        <Milestone userID={user} />
      </div>
    </div>
  );
};

export default Info;
