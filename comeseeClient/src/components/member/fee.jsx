import React, { useContext} from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Info from "./info";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import Ticketstatus from "./ticketstatus";

import member from "../../css/member/member.module.css";
import fee from "../../css/member/fee.module.css";
import catchUser from '../../TicketContext';

function Fee() {

  const context = useContext(catchUser);
  const user = context.state.userID

  
    return (
      <div className="wrapper">
        <div className={member.mainbg}>
          <div className="container">
            <Info />
            {/* side-bar */}
            <section className={`row ${member.contenta}`}>
              <div class="col-3">
                <Sidebar />
              </div>
              <div className={`col-8 ${fee.contentdetail}`}>
                <Dashboard userID={user} />
                <div>
                </div>
                <Ticketstatus userID={user}/>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

export default Fee;
