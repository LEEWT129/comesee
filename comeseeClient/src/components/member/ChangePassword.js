import React from "react";
import member from '../../css/member/changepassword.module.css'

const ChangePassword = () => {
    return (
        <div className={member.allinput}>
            <div className={member.FormGroup}>
                <div className={member.a1}>
                    <label className={member.b1}>原密碼</label>
                </div>
                <input
                    type="text"
                    name="password"
                    className={member.c1}
                />
            </div>
            <div className={member.FormGroup}>
                <div className={member.a2}>
                    <label className={member.b1}>新密碼</label>
                </div>
                <input
                    type="text"
                    name="password"
                    className={member.c1}
                />
            </div>
            <div className={member.d2}>
                <label className={member.e2}>請輸入中英文夾雜、六位數以上的密碼</label>
            </div>
            <div className={member.FormGroup}>
                <div className={member.a3}>
                    <label className={member.b1}>再次確認密碼</label>
                </div>
                <input
                    type="text"
                    name="password"
                    className={member.c1}
                />
            </div>
            <div className={member.d3}>
                <label className={member.e2}>請輸入中英文夾雜、六位數以上的密碼</label>
            </div>
            <div className={member.FormGroup}>
                <div className={member.a4}>
                    <label className={member.b1}>手機號碼</label>
                </div>
                <input
                    type="text"
                    name="phoneNumber"
                    className={member.c1}
                />
            </div>
            <div className={member.ButtonGroup}>
                <button type="submit" className={member.ConfirmButton}>
                    尚未確認
                </button>
            </div>
            <div className={member.FormGroup}>
                <div className={member.a5}>
                    <label className={member.b1}>第三方登入綁定</label>
                </div>
                <div className={member.GOOGLE1}>
                    <button type="submit" className={member.GOOGLE}>
                        GOOGLE
                    </button>
                    <button type="submit" className={member.MYGOOGLE}>
                        未綁定
                    </button>
                </div>
                <div className={member.FACEBOOK1}>
                    <button type="submit" className={member.FACEBOOK}>
                        FACEBOOK
                    </button>
                    <button type="submit" className={member.MYFACEBOOK}>
                        未綁定
                    </button>
                </div>
                <div className={member.LINE1}>
                    <button type="submit" className={member.LINE}>
                        LINE
                    </button>
                    <button type="submit" className={member.MYLINE}>
                        未綁定
                    </button>
                </div>
                <div className={member.end}>
                    <button type="submit" className={member.gook}>
                        送出
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;