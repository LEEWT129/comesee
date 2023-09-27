import React from "react";
import { withRouter } from "react-router-dom";
import member from '../../css/member/member.module.css'



const Sidebar = () => {
  return (
    <div className={member.sidebar}>
      <a href="/member">
        訂單紀錄</a>
      <a href="/Collectionpage">收藏片單</a>
      <a href="/fee">紅利優惠</a>
      <a href="/MemberInformation">會員資料</a>
      <a href="/Mypassword">帳號管理</a>
    </div>
  );
};

export default withRouter(Sidebar);
