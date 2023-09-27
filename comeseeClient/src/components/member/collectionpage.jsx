import React, { useEffect, useState, useContext } from "react";
//import PlayList from "../personalSocialPage/PlayList";
import PlayListArea from "../personalSocialPage/PlayListArea";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./info";
import Sidebar from "./sidebar";
import catchUser from "../../TicketContext";

//import Collection from "./collection";

import member from "../../css/member/member.module.css";
import collection from "../../css/member/collection.module.css";
import axios from "axios";

const Collectionpage = () => {
  const context = useContext(catchUser);
  const user = context.state.userID;

  const [playlist, setPlaylist] = useState([]); //資料庫抓取的playlist所有片單ID與片單名稱 存放處

  const [inputValue, setInputValue] = useState(""); // 初始化輸入值為空字符串

  const handleChange = (e) => {
    console.log("Input value changed:", e.target.value);
    setInputValue(e.target.value); // 更新輸入值
  };

  useEffect(() => {
    //獲取該使用者的所有片單ID與片單名稱=>playlist/{要去抓點擊頭像的userID}
    axios
      .get(`http://localhost:2407/playlist/${user}`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user,playlist]);

  // 要有個新增片單的地方
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      // 空值顯示錯誤訊息
      alert("請輸入片單名稱");
      return;
    }

    // 將inputValue的值作為listname傳送到後端
    axios
      .post(`http://localhost:2407/playlist/create/${user}`, {
        userID: user,
        listname: inputValue,
      })
      .then((response) => {
        console.log("新增片單成功：", response.data);
        setPlaylist((prevPlaylist) => [...prevPlaylist, response.data]);
        // 清空
        setInputValue("");
      })
      .catch((error) => {
        // 處理錯誤的代碼
        console.error("新增片單錯誤：", error);
      });

      // window.location="/Collectionpage";
  };

  return (
    <div>
      <div className={member.mainbg}>
        <div className="container">
          <Info />
          {/* side-bar */}
          <section className={`row ${member.contenta}`}>
            <div class="col-2">
              <Sidebar />
            </div>
            <div className={`col-9 ${collection.contentdetail}`}>
              <PlayListArea userID={user} />
              <div className={`col ${collection.filmcollection}`}>
                <button
                  className={collection.button}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  建立新片單
                </button>
              </div>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        新增片單
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">
                            新增片單名稱：
                          </label>
                          <input
                            type="text"
                            placeholder="輸入片單名稱"
                            value={inputValue} // 使用狀態中的值
                            onChange={handleChange} // 輸入值發生變化時調用handleChange函數
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            關閉
                          </button>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            送出
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Collectionpage;
