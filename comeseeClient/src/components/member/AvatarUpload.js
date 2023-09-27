import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import member from "../../css/member/member.module.css";
import catchUser from "../../TicketContext";

function AvatarUpload() {
  const [data, setdata] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isFileInputVisible, setIsFileInputVisible] = useState(true);
  const context = useContext(catchUser);
  const user = context.state.userID;

  useEffect(() => {
    getUserImage(); 
  }, [user]);

  // 抓後端
  const getUserImage = () => {
    axios
      .get(`http://localhost:2407/user/image/${user}`)
      .then((res) => {
        setdata(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    setIsFileInputVisible(false);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`http://localhost:2407/user/uploads/${user}`, formData)
      .then((res) => {
        console.log(res);
        // 上傳後，拿到後端Image
        getUserImage();
        // 清除後=>再次上傳
        setFile(null);
        // 清除預覽
        setPreviewImage(null);
        // 顯示文字
        setIsFileInputVisible(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={member.AvatarUpload}>
      {!data || !data.image ? (
        <div>
          <label className={member.Avatarinput}>
            <input
              id="fileInput"
              className={member.Avatarinput}
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
            <span className={member.AvatarChooseText}>選擇照片</span>
          </label>
        </div>
      ) : (
        <div>
          <label className={member.Avatarinput}>
            <input
              id="fileInput"
              className={member.Avatarinput}
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
            <img
              className={member.Avatarstyle}
              src={`http://localhost:2407/user/image/${data.image}`}
              alt="上傳的圖片"
            />
          </label>
        </div>
      )}

      {previewImage && (
        <div className={member.imageupload}>
          <img className={member.Avatarstyle} src={previewImage} alt="預覽" />
          <button className={member.customfileinput} onClick={handleUpload}>
            上傳照片
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarUpload;
