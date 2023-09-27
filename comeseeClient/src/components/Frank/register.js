import React, { useState, useEffect } from "react";
import Registerstyle from "../../css/Frank/register.module.css";
import RegisterInput from "./registerinput";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import BtnMovie from "./btnMovie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [townOptions, setTownOptions] = useState([]);
  const [cityData, setCityData] = useState({}); // 用于存储城市和区域的 JSON 数据

  useEffect(() => {
    // 从外部 JSON URL 加载城市数据
    axios
      .get(
        "https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json"
      )
      .then((response) => {
        // 将 JSON 数据存储到 state 中
        setCityData(response.data);

        const cities = response.data;

        // 提取城市名称并设置到城市选择框中
        const cityNames = cities.map((city) => city.CityName);

        setCityOptions(cityNames);
      })
      .catch((error) => {
        console.error("Error fetching city data", error);
      });
  }, []);
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setValues({ ...values, addressCity: selectedCity });
    console.log("Selected City:", selectedCity);

    // 根据选择的城市从 JSON 数据中获取对应的區域数据
    const selectedCityData = cityData.find(
      (city) => city.CityName === selectedCity
    );

    if (selectedCityData) {
      // 提取區域数据并设置到區域选择框中
      const townNames = selectedCityData.AreaList.map((area) => area.AreaName);
      setTownOptions(townNames);
    } else {
      // 如果找不到城市数据，清空區域选择框
      setTownOptions([]);
    }
  };

  const handleTownChange = (e) => {
    const selectedTown = e.target.value;
    setSelectedTown(selectedTown);
    setValues({ ...values, addressTown: selectedTown });
    console.log("Selected Town:", selectedTown);
  };

  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "",
    birthday: "",
    phonenumber: "",
    addressCity: "",
    addressTown: "",
    addressDetail: "",
    moviePreferences: "",
  });

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      message: "請輸入中英文夾雜、6~20字的密碼",
      pattern: "^[A-Za-z0-9]{6,20}$",
      label: "密碼",
      required: true,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      message: "請再次輸入密碼",
      label: "再次確認密碼",
      pattern: values.password,
      required: true,
    },
    {
      id: 3,
      name: "username",
      type: "text",
      label: "姓名/暱稱",
      message: "必填",
      required: true,
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "1997/09/18",
      label: "西元出生年月日",
    },
    {
      id: 5,
      name: "phonenumber",
      type: "text",
      label: "手機號碼",
      pattern: "^\\d{4}\\d{3}\\d{3}$",
      message: "請輸入有效的手機號碼，格式為：0987654321",
      required: true,
    },
  ];

  const handleMoviePreference = (preference, isSelected) => {
    let updatedPreferences = [...values.moviePreferences]; // 复制当前的电影喜好数组

    if (isSelected) {
      // 如果按钮被选中，添加喜好到数组
      updatedPreferences.push(preference);
    } else {
      // 如果按钮取消选中，从数组中移除喜好
      updatedPreferences = updatedPreferences.filter(
        (item) => item !== preference
      );
    }

    console.log("Updated movie preferences:", updatedPreferences);

    setValues({ ...values, moviePreferences: updatedPreferences });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Address City:", values.addressCity);
    console.log("Address Town:", values.addressTown);
    console.log("Address Detail:", values.addressDetail);

    console.log("Form Values:", values); // 确保在提交时正确显示所有字段的值

    try {
      const formData = {
        email: values.email,
        password: values.password,
        username: values.username,
        gender: values.gender,
        birthday: values.birthday,
        phonenumber: values.phonenumber,
        addressCity: values.addressCity,
        addressTown: values.addressTown,
        addressDetail: values.addressDetail,
        moviePreferences: values.moviePreferences,
      };
      const response = await axios.post(
        "http://localhost:2407/register",
        formData
      );

      if (response.data.success) {
        // alert("註冊成功！別忘記到會員中心領取您的入會禮呦！");
        Swal.fire({
          title: "註冊成功！別忘記到會員中心領取您的入會禮呦！",
          icon: "success",
          confirmButtonText: "確定",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // 在確定按鈕被按下後執行刷新網頁的程式碼
            const res = await axios.get(
              `http://localhost:2407/user/getuserID/${values.email}`
            );

            const result = await axios.post(
              `http://localhost:2407/playlist/create/${res.data}`,
              {
                listname: "預設片單",
              }
            );

            history.push("/login");

            window.location.reload();
          }
        });

        // const res = await axios.get(
        //   `http://localhost:2407/user/getuserID/${values.email}`
        // );

        // const result = await axios.post(
        //   `http://localhost:2407/playlist/create/${res.data}`,
        //   {
        //     listname: "預設片單",
        //   }
        // );

        // history.push("/login");

        // window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 420) {
        const errorMessage = error.response.data.error;
        alert(`註冊失敗：${errorMessage}`);
      } else {
        console.error("發生錯誤1", error);
        alert("您輸入的資料有誤請檢查後再試");
      }
    }
  };

  const handleSkip = async (e) => {
    e.preventDefault();

    try {
      const formDataWithoutMoviePreferences = {
        email: values.email,
        password: values.password,
        username: values.username,
        gender: values.gender,
        birthday: values.birthday,
        phonenumber: values.phonenumber,
        addressCity: values.addressCity,
        addressTown: values.addressTown,
        addressDetail: values.addressDetail,
      };

      const response = await axios.post(
        "http://localhost:2407/register",
        formDataWithoutMoviePreferences
      );

      if (response.data.success) {
        alert("註冊成功！");
        const res = await axios.get(
          `http://localhost:2407/user/getuserID/${values.email}`
        );

        const result = await axios.post(
          `http://localhost:2407/playlist/create/${res.data}`,
          {
            listname: "預設片單",
          }
        );
        history.push("/login");
      }
    } catch (error) {
      console.error("註冊失敗1", error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={Registerstyle.all}>
      <div className={"container " + Registerstyle.inside}>
        <h1 className={Registerstyle.registertitle}>註冊會員</h1>
        <form onSubmit={handleSubmit} className={Registerstyle.register}>
          <div>
            <div className={Registerstyle.email}>
              <label className={Registerstyle.label}>電子郵件</label>
              <input
                className={Registerstyle.input}
                type="email"
                required
                name="email"
                onChange={onChange}
              />
            </div>
          </div>

          {inputs
            .filter((input) => input.id >= 1 && input.id <= 3)
            .map((input) => (
              <div key={input.id}>
                <RegisterInput
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              </div>
            ))}

          <div className={Registerstyle.gender}>
            <label className={Registerstyle.label}>性別</label>
            <select
              id="gender"
              className={Registerstyle.input}
              name="gender"
              onChange={onChange}
              value={values.gender || ""}
            >
              <option value="">請選擇</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          {inputs
            .filter((input) => input.id >= 4 && input.id <= 5)
            .map((input) => (
              <div key={input.id}>
                <RegisterInput
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              </div>
            ))}

          <div className={Registerstyle.address}>
            <div>
              <label className={Registerstyle.label}>通訊地址</label>
              <select
                id="addressCity"
                className={Registerstyle.addressinput}
                name="addressCity"
                onChange={handleCityChange}
                value={selectedCity}
              >
                <option value="">請選擇</option>
                {cityOptions.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                id="addressTown"
                className={Registerstyle.addressinput}
                name="addressTown"
                onChange={handleTownChange}
                value={selectedTown}
              >
                <option value="">請選擇</option>
                {townOptions.map((town, index) => (
                  <option key={index} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
            <div className={Registerstyle.addressinput2}>
              <input
                className={Registerstyle.input}
                type="text"
                placeholder="地址"
                name="addressDetail"
                onChange={onChange}
              />
            </div>
          </div>

          <div className={Registerstyle.btncheck}>
            <button
              className={Registerstyle.btnstyle + " mb-5"}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="button"
            >
              下一步
            </button>
          </div>
        </form>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="true"
        >
          <div className="modal-dialog">
            <div className={"modal-content " + Registerstyle.modal}>
              <div className="modal-header">
                <h5
                  className={Registerstyle.btnmodaltitle}
                  id="exampleModalLabel"
                >
                  請選擇您喜愛的電影類型
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className={"modal-body " + Registerstyle.btnmovie}>
                <BtnMovie
                  label="動作"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="喜劇"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="浪漫"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="音樂"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="科幻"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="恐怖"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="動畫"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="戰爭"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="災難"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="劇情"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="驚悚"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="推理"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="古裝"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="歷史"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="紀錄"
                  handleMoviePreference={handleMoviePreference}
                />
                <BtnMovie
                  label="政治"
                  handleMoviePreference={handleMoviePreference}
                />
              </div>
              <div className="modal-footer">
                <button
                  className={Registerstyle.btnstyle2}
                  type="button"
                  onClick={handleSkip}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  略過
                </button>
                <button
                  className={Registerstyle.btnstyle2}
                  type="button"
                  onClick={handleSubmit}
                >
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
