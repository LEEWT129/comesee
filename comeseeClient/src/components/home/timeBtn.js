import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TicketContext from "../../TicketContext";
import axios from "axios";
import Swal from "sweetalert2";

import TAS from '../../css/home/timetabsComponent.module.css'

const TimeBtn = (props) => {

    const history = useHistory();

    const { state, setState } = useContext(TicketContext); // 設定使用context

    const [showTime, setShowTime] = useState([]);
    const [showTimeID, setShowTimeID] = useState("");
    const [checkData, setCheckData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const movieID = props.movieID;
    const date = props.date;
    const theaterID = props.theaterID;

    const parts = date.split('-');
    const checkShowDate = `${parts[1]}.${parts[2]}`;


    // 後端取得時間
    useEffect(() => {
        axios
            .post('http://localhost:2407/filminfo/getshowtime', {
                movieID: movieID,
                theaterID: theaterID,
                date: date
            })
            .then((res) => {
                setShowTime(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [movieID, theaterID, date]);

    // console.log(movieID);
    // console.log(date);
    // console.log(theaterID);

    function getShowTimeID(e) {
        setShowTimeID(e.target.id);
    };

    // 取得電影詳細資訊確認
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/getcheck/${showTimeID}`)
            .then((res) => {
                setCheckData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [showTimeID]);


    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value); // 更新所选的Radio按钮的值
    };


    // 取得showtimeID 跟 使用者選擇數量 更新到context
    async function handleShowtimID() {

        if (state.userID === null) {
            const result = await Swal.fire({
                title: '請先登入會員',
                icon: 'warning',
                confirmButtonText: "確認",
            });

            if (result.isConfirmed) {
                window.location.href = "/login";
            }

        } else {
            axios
                .get(`http://localhost:2407/quickorder/emptySeat/${showTimeID}`)
                .then((res) => {
                    const emptySeat = res.data.emptySeat;
                    console.log("空座位數：", emptySeat);

                    // 位置數量ok
                    if (parseInt(selectedValue) <= emptySeat) {
                        setState({ showtimeID: showTimeID });
                        setState({ maxSelectedSeats: parseInt(selectedValue) });
                        history.push("/bookingseat");
                        window.scrollTo(0, 0);
                    } else {
                        // 位置數不夠
                        Swal.fire({
                            title: '您目前所選的時段已無空位',
                            text: "請重新選擇",
                            icon: 'warning',
                            confirmButtonText: "確認",
                        })
                        // return;
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                });
        };

    };






    return (
        <>

            {showTime.map((sItem, index) => (

                <button
                    key={index}
                    id={sItem.showtimeID}
                    className={TAS.timeBtn}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#checkModal"
                    onClick={getShowTimeID}
                >
                    {sItem.startTime}
                </button>

            ))}



            {/* check modal */}
            <div
                className="modal fade"
                id="checkModal"
                tabindex="-1"
                aria-labelledby="ModalLabel"
                aria-hidden="true">



                <div className="modal-dialog modal-dialog-centered">


                    <div className={`${TAS.modalcontent} modal-content`}>

                        <div className={`${TAS.modalheader} modal-header`}>
                            <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>

                        </div>

                        <div className={`${TAS.modalbody} modal-body`}>

                            <table className={TAS.checkTable} >
                                <tr className={TAS.checkTitle}>
                                    <th style={{ padding: "0 10px" }} >片名</th>
                                    <th className={TAS.tdbd} >影城</th>
                                    <th className={TAS.tdbd} >日期</th>
                                    <th className={TAS.tdbd} >版本</th>
                                    <th className={TAS.tdbd} >時間</th>
                                </tr>

                                {checkData.length > 0 ? (
                                    <tr className={TAS.checkInfo}>
                                        <td style={{ padding: "0 10px" }} >{checkData[0].movieNameCN}</td>
                                        <td className={TAS.tdbd} >{checkData[0].cinemaName}</td>
                                        <td className={TAS.tdbd} >{checkShowDate}</td>
                                        <td className={TAS.tdbd} >{checkData[0].version}</td>
                                        <td className={TAS.tdbd} >{checkData[0].startTime}</td>
                                    </tr>
                                ) : null}
                            </table>

                            <h4 className={TAS.numberTitle}>人數</h4>
                            <div className={`${TAS.numberForm} ckmd`}>
                                <input type="radio" name="number" id="n1" className="btn-check" value="1" checked={selectedValue === "1"}
                                    onChange={handleRadioChange} />
                                <label for="n1" className={`${TAS.numberLabel} btn`}>1</label>
                                <input type="radio" name="number" id="n2" className="btn-check" value="2" checked={selectedValue === "2"}
                                    onChange={handleRadioChange} />
                                <label for="n2" className={`${TAS.numberLabel} btn`}>2</label>
                                <input type="radio" name="number" id="n3" className="btn-check" value="3" checked={selectedValue === "3"}
                                    onChange={handleRadioChange} />
                                <label for="n3" className={`${TAS.numberLabel} btn`}>3</label>
                                <input type="radio" name="number" id="n4" className="btn-check" value="4" checked={selectedValue === "4"}
                                    onChange={handleRadioChange} />
                                <label for="n4" className={`${TAS.numberLabel} btn`}>4</label>
                                <input type="radio" name="number" id="n5" className="btn-check" value="5" checked={selectedValue === "5"}
                                    onChange={handleRadioChange} />
                                <label for="n5" className={`${TAS.numberLabel} btn`}>5</label>
                                <input type="radio" name="number" id="n6" className="btn-check" value="6" checked={selectedValue === "6"}
                                    onChange={handleRadioChange} />
                                <label for="n6" className={`${TAS.numberLabel} btn`}>6</label>
                            </div>

                        </div>

                        <div className={`${TAS.modalfooter} modal-footer`} >
                            <button type="button" className={`${TAS.modalcheck}`} data-bs-dismiss="modal" aria-label="Close" onClick={handleShowtimID} >送出</button>
                        </div>

                    </div>

                </div>
            </div >






        </>
    );


}



export default TimeBtn;