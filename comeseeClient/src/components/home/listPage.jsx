import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import LS from "../../css/home/listPage.module.css";
import ListPageCard from "./listPageCard";

const ListPage = () => {
  const [releasedData, setReleasedData] = useState([]);
  const [comingData, setComingData] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const [tabState, setTabState] = useState(
    new URLSearchParams(history.location.search).get("tab") || "nowplaying"
  );

  // 監聽URL的變化，當URL改變時更新標籤
  useEffect(() => {
    const tabFromURL = new URLSearchParams(location.search).get("tab");
    if (tabFromURL) {
      setTabState(tabFromURL);
    }
  }, [location.search]);

  // 上映中電影
  useEffect(() => {
    axios
      .get("http://localhost:2407/filmlist/released")
      .then((res) => {
        setReleasedData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [tabState]);

  // 即將上映電影
  useEffect(() => {
    axios
      .get("http://localhost:2407/filmlist/comingsoon")
      .then((res) => {
        setComingData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [tabState]);

  const nowplayingTabChange = () => {
    setTabState("nowplaying"); // 更新tabState
    history.push(`/list?tab=nowplaying`); // 更新URL
  };

  const comingsoonTabChange = () => {
    setTabState("comingsoon"); // 更新tabState
    history.push(`/list?tab=comingsoon`); // 更新URL
  };

  return (
    <div className={LS.List}>
      <div className="container">
        <nav className={LS.myNav}>
          <div className={LS.myTabs} id="nav-tab" role="tablist">
            <button
              className={`${LS.myLink} listTab ${
                tabState === "nowplaying" ? "active" : ""
              }`}
              id="nowPlaying-tab"
              data-bs-toggle="tab"
              data-bs-target="#nowPlaying"
              type="button"
              role="tab"
              aria-controls="nowPlaying"
              aria-selected={tabState === "nowplaying"}
              onClick={nowplayingTabChange}
            >
              現正熱映
            </button>
            <button
              className={`${LS.myLink} listTab ${
                tabState === "comingsoon" ? "active" : ""
              }`}
              id="comingSoon-tab"
              data-bs-toggle="tab"
              data-bs-target="#comingSoon"
              type="button"
              role="tab"
              aria-controls="comingSoon"
              aria-selected={tabState === "comingsoon"}
              onClick={comingsoonTabChange}
            >
              即將上映
            </button>
          </div>
        </nav>

        <div className={`${LS.myContent} tab-content`} id="nav-tabContent">
          <div
            className={`tab-pane fade ${
              tabState === "nowplaying" ? "show active" : ""
            }`}
            id="nowPlaying"
            role="tabpanel"
            aria-labelledby="nowPlaying-tab"
          >
            {releasedData.map((filmItem) => (
              // mapㄉ內容
              <ListPageCard
                key={filmItem.id}
                id={filmItem.id}
                imageUrl={filmItem.imageUrl}
                movieNameCN={filmItem.movieNameCN}
                movieNameEN={filmItem.movieNameEN}
              />
            ))}
          </div>

          <div
            className={`tab-pane fade ${
              tabState === "comingsoon" ? "show active" : ""
            }`}
            id="comingSoon"
            role="tabpanel"
            aria-labelledby="comingSoon-tab"
          >
            {comingData.map((filmItem) => (
              // mapㄉ內容
              <ListPageCard
                key={filmItem.id}
                id={filmItem.id}
                imageUrl={filmItem.imageUrl}
                movieNameCN={filmItem.movieNameCN}
                movieNameEN={filmItem.movieNameEN}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
