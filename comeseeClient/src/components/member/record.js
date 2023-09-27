import React from "react";
import fee from '../../css/member/fee.module.css'




const Record= ({bonusRecord}) => {


  return (
      <div className={fee.record}>
        <span>{bonusRecord.bonusDate}</span>
        <div>
          <span>已使用</span> 
          <span className={fee.bonustext}>{bonusRecord.used}</span>
          <span>點</span>
        </div>
      </div>
      

  );

};

export default Record;

