import React, { useEffect, useState } from "react";
import axios from "axios";

import IS from '../../css/home/infoPage.module.css';
import TimeAccordion from './timeAccordion';

const TimeTabs = (props) => {

    const [orderData, setOrderData] = useState([]);
    const [showDate, setShowDate] = useState([]);
    const [cinemaData, setCinemaData] = useState([]);

    const [getDate, setGetDate] = useState("");

    const id = parseInt(props.id);

    // 取得今天日期
    // const dd = new Date();
    // const year = dd.getFullYear();
    // const month = dd.getMonth() + 1;
    // const day = dd.getDate();

    // const today = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    // console.log(today);
    // const [getDate, setGetDate] = useState(today);

    // 電影場次基本資訊
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/order/${id}`)
            .then((res) => {
                setOrderData(res.data);
                // console.log(orderData);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id]);

    // 指定電影的場次日期
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/getdate/${id}`)
            .then((res) => {
                const modifiedData = res.data.map((item) => {
                    // const date = item.showtimeDate;
                    const date = (item.showtimeDate).split("-");
                    const month = parseInt(date[1]) - 1;

                    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                    const dayOfWeek = new Date(date[0], month, date[2]).getDay();
                    const week = weekDays[dayOfWeek];
                    return {
                        showtimeDate: item.showtimeDate,
                        month: date[1],
                        day: date[2],
                        week: week,
                    }
                });
                setShowDate(modifiedData);
                console.log(modifiedData);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id]);

    // 日期選擇 取得日期參數
    function handleDateCheck(e) {
        setGetDate(e.target.id);
    };

    // 指定日期的上映影城
    useEffect(() => {
        axios
            .post("http://localhost:2407/filminfo/getcinema", {
                movieID: id,
                date: getDate,
            })
            .then((res) => {
                setCinemaData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [getDate]);
    // console.log(cinemaData);


    return (
        <>



            <div className={`${IS.dateBox} d-box`}>
                {/* map日期 */}
                {showDate.map((dateItem, index) => (
                    <span key={index} >
                        <input type="radio" name="date"
                            id={dateItem.showtimeDate}
                            className="btn-check"
                            onClick={handleDateCheck}
                        />
                        <label
                            for={dateItem.showtimeDate}
                            className={`${IS.dbtn} btn`}
                        // onClick={}
                        >
                            <div className={IS.Date2}>{dateItem.week}</div>
                            <div className={IS.Date1}>{dateItem.day}</div>
                            <div className={IS.Date2}>{dateItem.month}</div>
                        </label>
                    </span>
                ))}
            </div>

            <div className={IS.theaterTime}>
                {/* map影城 */}
                {cinemaData.map((item, index) => (
                    <TimeAccordion
                        id={id}
                        key={index}
                        date={getDate}
                        cinemaID={item.cinemaID}
                        cinemaName={item.cinemaName} />
                ))}
            </div>




        </>
    );
}




export default TimeTabs;