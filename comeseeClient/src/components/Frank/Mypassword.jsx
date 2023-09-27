import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./info";
import Sidebar from "./sidebar";                   
import ChangePassword from "./ChangePassword";
import member from "../../css/Frank/allcss.module.css";

class Mypassword extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <div className={member.mainbg}>
          <div className="container">
            <Info />
            {/* side-bar */}
            <section className={member.content}>
              <div class="col-3">
              <Sidebar />
              </div>
              <div className={member.contentdetail} class="col-9">
                <ChangePassword />
              </div>
              
            </section>
          </div>
        </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Mypassword;
