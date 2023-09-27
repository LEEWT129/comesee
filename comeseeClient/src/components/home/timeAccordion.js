import React, { useState, useEffect } from 'react';
import axios from "axios";

import TAS from '../../css/home/timetabsComponent.module.css';
import VerLabel from './verlabel';
import TimeBtn from './timeBtn';


function TimeAccordion(props) {

    const [activePanels, setActivePanels] = useState([1, 2]);

    const [orderData, setOrderData] = useState([]);
    const [showVersion, setShowVersion] = useState([]);


    const id = props.id;
    const date = props.date;
    const cinemaID = props.cinemaID;

    // console.log();

    // 手風琴面板開關
    const togglePanel = (panelId) => {
        setActivePanels((prevActivePanels) => {
            const activePanelsCopy = [...prevActivePanels];
            const index = activePanelsCopy.indexOf(panelId);
            if (index === -1) {
                activePanelsCopy.push(panelId);
            } else {
                activePanelsCopy.splice(index, 1);
            }
            return activePanelsCopy;
        });
    };

    // 電影場次基本資訊
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/order/${id}`)
            .then((res) => {
                setOrderData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id]);
    // console.log(orderData);

    // 後端取得場次
    useEffect(() => {
        axios
            .post('http://localhost:2407/filminfo/getversion', {
                movieID: id,
                cinemaID: cinemaID,
                date: date,
            })
            .then((res) => {
                setShowVersion(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id, date, cinemaID]);
    // console.log(showVersion);



    return (

        <>



            <div className={`${TAS.ta} card`}>
                <div className={TAS.header} onClick={() => togglePanel(1)}>
                    {/* 影城名稱 */}
                    <button
                        className={` ${TAS.title} ${activePanels.includes(1) ? '' : 'collapsed'}`}
                        aria-expanded={activePanels.includes(1) ? 'true' : 'false'}
                    >
                        {props.cinemaName}
                    </button>
                </div>

                <div
                    id="panel-1"
                    className={`${TAS.vat} collapse ${activePanels.includes(1) ? 'show' : ''}`}
                >

                    {/* map */}


                    {showVersion.map((vItem, index) => (
                        <div className={TAS.vat2} key={index} >

                            {/* 類型標籤 */}
                            <div className={TAS.vb}>
                                <VerLabel
                                    id={vItem.theaterID}
                                    label={vItem.version}
                                />
                            </div>

                            {/* 時刻按鈕 */}
                            <div className={TAS.tb}>
                                < TimeBtn
                                    movieID={id}
                                    date={date}
                                    cinemaID={cinemaID}
                                    theaterID={vItem.theaterID}
                                />
                            </div>

                        </div>
                    ))}

                </div>

            </div>




        </>
    );
}


export default TimeAccordion;
