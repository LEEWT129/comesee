import React, { Component } from "react";
import axios from "axios";

class HeadPicture extends Component {
  state = { userID: 1 };

  handleFileUpload = (event) => {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);
    formData.append("userID", this.state.userID); 

    axios
      .post("/multer/upload", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("上傳失敗", error);
      });
  };

  render() {
    return (
      <div style={{ minHeight: "100vh", marginTop: "150px" }}>
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default HeadPicture;
