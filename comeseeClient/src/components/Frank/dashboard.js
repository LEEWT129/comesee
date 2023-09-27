import React from "react";
import fee from '../../css/Frank/fee.module.css'
import Record from "./record";




const Dashboard = () => {
  return (
    <div className={`row ${fee.dashboard}`}>
    <div className={`col-3 ${fee.leftcontent}`}>
      <span>目前的紅利點數</span>
      <span className={fee.number}>50{}</span>
    </div>
    <div className={`col-8 ${fee.recordsec}`}>
      <Record />
      <Record />
      <Record />
    </div>
  </div>
  );
};

export default Dashboard;

