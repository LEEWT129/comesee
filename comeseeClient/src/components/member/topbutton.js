import React, { useState, useEffect, useContext, useCallback } from "react";
import member from "../../css/member/member.module.css";
import Order from "./order";
import CancelOrder from "./cancelorder";
import Axios from "axios";
import catchUser from "../../TicketContext";
import WatchedOrder from "./watchedorder";

const Topbutton = () => {
  const [activeTab, setActiveTab] = useState("訂購紀錄");
  const context = useContext(catchUser);
  const user = context.state.userID;
  const [orders, setOrders] = useState([]); // 存放所有訂單
  const [CanceledOrders, setCanceledOrders] = useState([]);

  // 使用userID取得該使用者的訂單
  const fetchOrders = useCallback(async () => {
    try {
      const response = await Axios.get(
        `http://localhost:2407/orderlist/userOrderList/${user}`
      );
      const data = response.data;
      //最新訂單放前面
      data.sort((a, b) => new Date(b.ordertime) - new Date(a.ordertime));
      setOrders(data);
      setCanceledOrders(data);
    } catch (error) {
      console.error("取訂單失敗", error);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "訂購紀錄") {
      fetchOrders();
    } else if (activeTab === "訂單取消") {
      Axios.get("http://localhost:2407/orderlist/orders/0")
        .then((response) => {
          const cancelOrderData = response.data;
          setCanceledOrders(cancelOrderData);
        })
        .catch((error) => {
          console.error("拿到取消訂單失敗", error);
        });
    } else if (activeTab === "觀看紀錄") {
      Axios.get(`http://localhost:2407/orderlist/userOrderList/${user}`)
        .then((response) => {
          const watchedData = response.data;
          setCanceledOrders(watchedData);
        })
        .catch((error) => {
          console.error("拿到取消訂單失敗", error);
        });
    }
  }, [user, activeTab, fetchOrders,CanceledOrders]);

  // 取消訂單
  const handleCancelOrder = async (orderToCancel) => {
    try {
      const datatoServer = {
        orderID: orderToCancel.orderID,
      };

      const response = await Axios.patch(
        `http://localhost:2407/orderlist/orders/${orderToCancel.orderID}`,
        datatoServer
      );

      if (response.status === 202) {
        // 取消後移除訂單
        setCanceledOrders((prevCanceledOrders) => [
          orderToCancel,
          ...prevCanceledOrders.filter(
            (order) => order.orderID !== orderToCancel.orderID
          ),
        ]);
        console.log("取消成功");

        const cancelOrderResponse = await Axios.get(
          "http://localhost:2407/orderlist/orders/0"
        );
        const cancelOrderData = cancelOrderResponse.data;

        // 更新取消訂單狀態
        setCanceledOrders(cancelOrderData);

        // 更新取消的訂單列表
        setCanceledOrders((prevCanceledOrders) => [
          ...prevCanceledOrders,
          orderToCancel,
        ]);
      }
    } catch (error) {
      console.error("取消失敗123", error);
    }
    //座位
    const seatInfo = {
      showtimeID: orderToCancel.showtimeID,
      theaterID: orderToCancel.theaterID,
      cinemaID: orderToCancel.cinemaID,
      rowNumber: [orderToCancel.seatInfo[0]],
      seatNumber: [orderToCancel.seatInfo[1].split("位")[0]],
      seatStatus:"empty"
    };

    const seatUpdateResponse = await Axios.post(
      "http://localhost:2407/seat/",
      seatInfo
    );

    console.log(seatInfo);

    if (seatUpdateResponse.status === 200) {
      console.log("成功");
    }
  };

  // const refreshData = () => {
  //   Axios.get("http://localhost:2407/orderlist/orders/0")
  //     .then((response) => {
  //       const allOrders = response.data;
  //       const canceledOrders = allOrders.filter((order) => order.userID === orders.userID);
  //       setCanceledOrders(canceledOrders);
  //       console.log("Confirm canceledOrders Data:", );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className={member.contentdetail}>
      <div className={member.topbutton}>
        <div
          className={`${member.togglebutton} ${
            activeTab === "訂購紀錄" ? member.togglebuttontoggled : ""
          }`}
          onClick={() => setActiveTab("訂購紀錄")}
        >
          訂購紀錄
        </div>
        <div
          className={`${member.togglebutton} ${
            activeTab === "訂單取消" ? member.togglebuttontoggled : ""
          }`}
          onClick={() => setActiveTab("訂單取消")}
        >
          訂單取消
        </div>
        <div
          className={`${member.togglebutton} ${
            activeTab === "觀看紀錄" ? member.togglebuttontoggled : ""
          }`}
          onClick={() => setActiveTab("觀看紀錄")}
        >
          觀看紀錄
        </div>
      </div>
      {activeTab === "訂購紀錄" ? (
        <div>
          {orders
            .filter((order) => order.status === 1)
            .map((order) => (
              <Order
                key={order.orderID}
                orderdetail={order}
                onCancelOrder={handleCancelOrder}
              />
            ))}
        </div>
      ) : activeTab === "訂單取消" ? (
        <div>
          {CanceledOrders.filter((order) => order.userID === user).map(
            (order) => (
              <CancelOrder
                key={order.orderID}
                CanceledOrders={order}
                onCancelOrder={handleCancelOrder}
              />
            )
          )}
        </div>
      ) : (
        <div>
          {orders
            .filter((order) => order.status === 1)
            .map((order) => (
              <WatchedOrder key={order.orderID} orderdetail={order} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Topbutton;
