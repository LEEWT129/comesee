import React, { useEffect, useState } from "react";
import fee from "../../css/member/fee.module.css";
import Record from "./record";
import Axios from "axios";

const Dashboard = (user) => {
  const [bonus, setBonus] = useState(["0"]);
  const [bonusRecord, setBonusrecord] = useState([""]);
  const [bonusLoaded, setBonusLoaded] = useState(false);
  const filteredRecords = bonusRecord.filter((record) => record.used !== 0); //過濾0
  useEffect(() => {
    const bonusStatus = async () => {
      try {
        if (!bonusLoaded) {
          const response = await Axios.get(
            `http://localhost:2407/bonus/${user.userID}`
          );
          const point = response.data[0].myPoint;
          console.log("Bonus Value:", bonus);
          setBonus(point);
          setBonusLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    Axios.get(`http://localhost:2407/bonus/bonusrecord/${user.userID}`)
      .then((response) => {
        // 使用红利的紀錄
        const bonusRecord = response.data;
        setBonusrecord(bonusRecord);
      })
      .catch((error) => {
        console.log(error);
      });

    bonusStatus();
  }, [bonus, user.userID, bonusLoaded]);

  return (
    <div className={`row ${fee.dashboard}`}>
      <div className={`col-3 ${fee.leftcontent}`}>
        <span>可使用的紅利點數</span>
        {bonus !== null ? (
          <span className={fee.number}>{String(bonus)}</span>
        ) : (
          <span className={fee.number}>0</span>
        )}
      </div>
      <div className={`col-8 ${fee.recordsec}`}>
        {filteredRecords.length === 0 ? (
          <span>尚無使用紀錄</span>
        ) : (
          filteredRecords
            .sort((a, b) => new Date(b.bonusDate) - new Date(a.bonusDate))
            .map((bonus) => <Record key={bonus.orderID} bonusRecord={bonus} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
