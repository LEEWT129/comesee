import React from "react";
import member from "../../css/member/member.module.css";

const CancelOrder = ({ CanceledOrders }) => {


  return (
    <div className={member.order}>
       <div>
        <img
          className={member.film2}
          src={CanceledOrders.imageUrl}
          alt=""
        />
      </div>
      <div className={member.orderdetail}>
          <table className={`col-9 ${member.desc}`} style={{ lineHeight: "180%" }}>
            <tbody className={member.movie}>
              <tr>
                <th style={{ width:"50px" }}  scope="row">電影</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {CanceledOrders.movieNameCN}({CanceledOrders.movieNameEN})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影城</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                      {CanceledOrders.cinemaName}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影廳</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {CanceledOrders.theaterName}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">時段</th>
                <td style={{ paddingLeft: "20px" }}>
                <span>
                  {CanceledOrders.showtimeDate}
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    ({CanceledOrders.dayOfWeek})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">張數</th>
                <td style={{ paddingLeft: "20px" }}>
                  全票:
                  <span>
                    {CanceledOrders.adult}張
                  </span>
                  &nbsp;&nbsp;學生票:
                  <span>
                    {CanceledOrders.student}張
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">座位</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {CanceledOrders.seat}
                  </span>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <th scope="row">優惠</th>
                <td style={{ paddingLeft: "20px" }}>
                  紅利點數折抵
                  <span style={{ textDecoration: "underline" }}>
                    {CanceledOrders.bonus}元
                  </span>                
                </td>
              </tr>
              <tr>
                <th />
                <td style={{ paddingLeft: "20px" }}>
                  優惠卷&nbsp;
                  <span style={{ textDecoration: "underline" }}>
                    {CanceledOrders.couponID}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">金額</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    ${CanceledOrders.price}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        <div className={`col-3 ${member.rightcontent}`}>
          <div className={member.canceltext}>已取消</div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
