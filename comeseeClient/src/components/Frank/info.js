import React from "react";
import Milestone from "../Frank/Milestone";
import member from '../../css/Frank/member.module.css'


const Info = () => {
  return (
    <div className={member.infosec}>
      <div className={member.info}>
      <div className={member.img}>{}</div>
      <div className={member.intro}>
       <div className={member.user}>
          <p className={member.username}>Tracy{}</p>
          <p className={member.userid}>@d98098dew{}</p>
       </div>
        <p className={member.newintro}>新增自我介紹{}</p>
     </div>
     <Milestone />
     </div>
   </div>
  );
};

export default Info;

