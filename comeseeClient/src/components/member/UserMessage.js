import React from "react";
import member from '../../css/member/member.module.css'

const UserMessage = () => {
    return (
        <div className={member.allinput}>
            <div className={member.FormGroup}>
                <div className={member.a1}>
                    <label className={member.b1}>中文姓名</label>
                </div>
                <input
                    type="text"
                    name="name"
                    className={member.c1}
                />
            </div>
            <div className={member.FormGroup}>
                <div className={member.a2}>
                    <label className={member.b1}>性別</label>
                </div>
                <select
                    name="gender"
                    className={member.c2}
                >
                    <option value="男士">男士</option>
                    <option value="女士">女士</option>
                </select>
            </div>
            <div className={member.FormGroup}>
                <div className={member.a3}>
                    <label className={member.b1}>西元出生年月日</label>
                </div>
                <input
                    type="text"
                    name="birthdate"
                    className={member.c3}
                />
            </div>
            {/* 新增通讯地址字段 */}
            <div className={member.FormGroup}>
                <div className={member.a4}>
                    <label className={member.b1}>通訊地址</label>
                </div>
                <select
                    name="addressCity"
                    className={member.c41}
                >
                 <option value="">請選擇縣市</option>
                 {/* 其他選項 */}
                </select>
                <select
                name="addressTown"
                className={member.c42}
                >
                <option value="">請選擇鄉鎮</option>
                {/* 其他選項 */}
              </select>
            </div>
            <input
                    type="text"
                    name="address"
                    className={member.d4}
                />
            {/* 新增自我介绍字段 */}
            <div className={member.FormGroup}>
                <div className={member.a5}>
                    <label className={member.b1}>自我介紹</label>
                </div>
                <textarea
                    name="introduction"
                    className={member.c5}
                />
            </div>
            <div>
            <p className={member.d5}>0/150</p>
            </div>
        </div>
    );
};

export default UserMessage;
