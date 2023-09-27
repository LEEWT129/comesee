import React from "react";
import member from '../../css/Frank/allcss.module.css'


const Topbutton = () => {
  return (
    <div className={member.topbutton}>
    <a className={member.booking} href>訂購紀錄</a>
    <a className={member.delete} href>訂單取消</a>
  </div>
  );
};

export default Topbutton;
