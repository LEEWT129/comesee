import React, { useEffect, useState , useContext} from "react";
import fee from "../../css/member/fee.module.css";
// import Axios from "axios";
import Coupon from "./coupon";
import Coupon88 from "./coupon88";
import Coupon95 from "./coupon95";
import Couponticket from "./couponticket";
import Axios from "axios";
import catchUser from '../../TicketContext';

const Ticketstatus = () => {
  const [allSpent, setallSpent] = useState("0");
  const context = useContext(catchUser);
  const user = context.state.userID


  useEffect(() => {
    Axios.get(`http://localhost:2407/orderlist/totalspent/${user}`)
      .then((response) => {
        const Spent = response.data[0].totalSpent;
        setallSpent(Spent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);



  return (
    <div className={fee.ticketstatus}>
      <Coupon userID={user}/>
      <Coupon95
        allSpent={allSpent}
        userID={user}
      />

      <Coupon88
        allSpent={allSpent}
        userID={user}
      />
      <Couponticket
        allSpent={allSpent}
        userID={user}
      />
    </div>
  );
};

export default Ticketstatus;
