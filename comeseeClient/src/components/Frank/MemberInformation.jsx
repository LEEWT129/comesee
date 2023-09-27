import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "../member/info";
import Sidebar from "../member/sidebar";
import UserMessage from "./UserMessage";
// import LoveButton from "./LoveButton";
import member from "../../css/Frank/allcss.module.css";

class MemberInformation extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className={member.mainbg}>
            <div className="container">
              <Info />
              {/* side-bar */}
              <section className={`row ${member.content}`}>
                <div className="col-3">
                  <Sidebar />
                </div>
                <div className={`col-9 ${member.rightcontent}`}>
                  <UserMessage />
                  {/* <LoveButton /> */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default MemberInformation;
