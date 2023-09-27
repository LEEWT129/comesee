import React, { Component } from "react";

class Sidebar extends Component {
  state = {};

  // 基本樣式
  sidebar = {
    width: "160px",
    color: "#F1EFE9",
    fontFamily: "Noto Sans TC",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "70px",
  };

  //  底線樣式
  SidebarChoose = {
    color: "#B6B995",
    fontWeight: "800",
    borderBottom: "3px solid #9E9E9E",
  };

  render() {
    var pages = [
      "選擇座位",
      "選擇票種",
      "選擇優惠",
      "訂票資訊確認",
      "開始結帳",
      "購票完成",
    ];
    const { currentPage } = this.props;
    // console.log(this.props)
    return (
      <div style={this.sidebar}>
        {pages.map((page, index) => {
          // console.log(page)  // pages 逐一列出
          // console.log(index) // 第幾個
          return (
            <div
              key={index}
              style={currentPage === page ? this.SidebarChoose : {}}
            >
              {page}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Sidebar;
