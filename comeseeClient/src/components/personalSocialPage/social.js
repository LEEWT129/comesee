import React, { Component } from "react";
import SocialStyle from "../../css/personalSocialPage/social.module.css";
import Tab from "./Tab";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";

class Social extends Component {
  state = { movieCollection: null, commentCount: null, userInfo: [] };
  userID = this.props.match.params.userID;

  async componentDidMount() {
    //獲取該userID收藏了幾部電影
    await axios
      .get(`http://localhost:2407/movieCollection/${this.userID}`)
      .then((response) => {
        // console.log(response.data[0].count);
        this.setState({ movieCollection: response.data[0].count });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    //獲取該userID評論了幾部電影
    await axios
      .get(`http://localhost:2407/commentlist/${this.userID}`)
      .then((response) => {
        // console.log(response);
        if (response.data.length > 0) {
          let commentCount = response.data.length;
          this.setState({ commentCount: commentCount });
        } else {
          this.setState({ commentCount: 0 });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // 獲得userID的相關user資料
    await axios
      .get(`http://localhost:2407/user/${this.userID}`)
      .then((response) => {
        // console.log(response.data[0]);
        this.setState({ userInfo: response.data[0] });
      });
  }

  render() {
    return (
      <div className={SocialStyle.all}>
        <div className={"container " + SocialStyle.body}>
          {/* 外框 */}
          <div className={SocialStyle.info}>
            {/* 左半部 */}
            <div className={SocialStyle.intro}>
              {/* 大頭貼 */}
              <div className={SocialStyle.userImg}>
                <img
                  className="img-fluid h-100 rounded-circle"
                  // src={`http://localhost:2407/${this.state.userInfo.image}`}
                  src={
                    this.state.userInfo.image
                      ? `http://localhost:2407/${this.state.userInfo.image}`
                      : `http://localhost:2407/defaultimg.png`
                  }
                  // src={require(`../../img/photo.jpg`)}
                  alt="userPhoto"
                />
              </div>
              {/* username與email */}
              <div className={SocialStyle.headuser}>
                <p className={SocialStyle.username}>
                  {this.state.userInfo.userName}
                </p>
                <p className={SocialStyle.userid}>
                  {this.state.userInfo.email}
                </p>
                {/* 自我介紹 */}
                <p className={SocialStyle.newintro}>
                  {this.state.userInfo.selfintro}
                </p>
              </div>
            </div>
            {/* 右半部 */}
            <div className={SocialStyle.A2}>
              {/* 已評論外框 */}
              <div className={SocialStyle.collect1}>
                <p>已評論</p>
                {/* 數字 */}
                <div className={SocialStyle.number}>
                  {this.state.commentCount}
                </div>
              </div>
              {/* 已收藏外框 */}
              <div className={SocialStyle.collect2}>
                <p>已收藏</p>
                {/* 數字 */}
                <div className={SocialStyle.number}>
                  {this.state.movieCollection}
                </div>
              </div>
            </div>
          </div>
          {/* userID為呼叫url後面代入的參數 => /personalSocialPage/{此參數}*/}
          <Tab userID={this.userID} />
        </div>
      </div>
    );
  }
}

export default Social;
