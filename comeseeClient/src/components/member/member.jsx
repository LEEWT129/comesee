import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./info";
import Sidebar from "./sidebar";
import Topbutton from "./topbutton";
import member from "../../css/member/member.module.css";

// import Order from "./order";

const Member = () => {


  return (
  <div>
    <div className={member.mainbg}>
      <div className="container">
        <Info />
        {/* side-bar */}
        <section className={member.contenta}>
          <div class="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <Topbutton/>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
};

export default Member;
