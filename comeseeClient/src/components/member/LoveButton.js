import React from "react";
import member from '../../css/member/lovebutton.module.css'



const LoveButton = () => {
    return (
        <div className={member.LoveButtonContainer}>
        <div>
        <label className={member.LoveButtonTitle}>請選擇您喜愛的電影類型</label>
        </div>
        <div  className={member.a1}>
          <div className={member.a2}>
            {/* 按钮1 */}
            <button className={member.b1}>按钮1</button>
            {/* 按钮2 */}
            <button className={member.b1}>按钮2</button>
            {/* 按钮3 */}
            <button className={member.b1}>按钮3</button>
            {/* 按钮4 */}
            <button className={member.b1}>按钮4</button>
          </div>
          <div className={member.a2}>
            {/* 按钮1 */}
            <button className={member.b1}>按钮1</button>
            {/* 按钮2 */}
            <button className={member.b1}>按钮2</button>
            {/* 按钮3 */}
            <button className={member.b1}>按钮3</button>
            {/* 按钮4 */}
            <button className={member.b1}>按钮4</button>
          </div>
          <div className={member.a2}>
            {/* 按钮1 */}
            <button className={member.b1}>按钮1</button>
            {/* 按钮2 */}
            <button className={member.b1}>按钮2</button>
            {/* 按钮3 */}
            <button className={member.b1}>按钮3</button>
            {/* 按钮4 */}
            <button className={member.b1}>按钮4</button>
          </div>
          <div className={member.a2}>
            {/* 按钮1 */}
            <button className={member.b1}>按钮1</button>
            {/* 按钮2 */}
            <button className={member.b1}>按钮2</button>
            {/* 按钮3 */}
            <button className={member.b1}>按钮3</button>
            {/* 按钮4 */}
            <button className={member.b1}>按钮4</button>
          </div>
        </div>
    </div>
    );
  };
  
  export default LoveButton;