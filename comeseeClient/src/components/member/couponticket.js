import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Axios from "axios";

const Couponticket = ({allSpent,userID}) => {
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [coupons, setCoupons] = useState("兌換");
  //const [couponStatus, setCouponStatus] = useState(0); // 默认值为 0，表示未领取
  const [isCouponRedeemed3, setIsCouponRedeemed3] = useState(
    localStorage.getItem("isCouponRedeemed3") === "true"
  );
  
  useEffect(() => {

    // 達到條件就可以按按鈕
    if (allSpent >= 10000 && !isCouponRedeemed3) {
      setIsButtonEnabled(true);
      console.log("啟動");
      setCoupons("兌換");
    } else {
      setIsButtonEnabled(false);
      console.log("禁用");
      if (isCouponRedeemed3) {
        setCoupons("已領取");
      } else {
        setCoupons("未達消費里程優惠");
      }
    }
  }, [userID,allSpent, isCouponRedeemed3]);

  const changeCouponState = async () => {
    if (isButtonEnabled) {
      const title = "里程碑活動";
      const description = "優惠電影卷乙張";
      const combinedString = `${title} - ${description}`;

      var dataToServer = {
        couponID: combinedString,
        userID: userID,
        money: "0",
        status: "1",
      };
      var s = JSON.stringify(dataToServer);

      await Axios.post("http://localhost:2407/coupon/", s, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsCouponRedeemed3(true);
      localStorage.setItem("isCouponRedeemed3", "true"); 
    }
  };
    
    return (
        <div className={fee.ticketstatus}>
        <div className={fee.ticket}>
        <div>
            <p style={{ fontWeight: 500, fontSize: "large" }}>里程碑活動</p>
            <p style={{ fontWeight: 200, fontSize: "small" }}>消費滿$10,000元</p>  
          </div>
          <p className={fee.text}>優惠電影卷乙張</p>
          <button onClick={() => changeCouponState(coupons)} className={fee.button}
                    style={{
                      backgroundColor:
                        coupons === "兌換"
                          ? "#557A46"
                          : coupons === "已領取"
                          ? "#333333"
                          : "#B4B4B3",
                      color:
                        coupons === "兌換"
                          ? "#f1efe9"
                          : coupons === "已領取"
                          ? "#F1EFE9"
                          : "#4D4D4D",
                        hover:
                        coupons === "兌換"
                        ? "2px solid  #A6A79B"
                        : coupons === "已領取"
                        ? ""
                        : "",
                    }}>
            {coupons}
          </button>
          <div className={fee.expire}>
            <p style={{ fontWeight: 500 }}>到期日</p>
            <p style={{ fontWeight: 300 }}>2024/5/28</p>
          </div>
        </div>
      </div>
      );
      
}

export default Couponticket;
