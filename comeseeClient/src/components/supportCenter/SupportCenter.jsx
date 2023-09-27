import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
// import "../../css/supportCenter/supportCenter.css";
import styles from "../../css/supportCenter/supportCenter.module.css";

import BackToTopButton from "./BackToTopButton";

import FAQpage from "./FAQpage";
import Privacy from "./Privacy";
import Service from "./Service";
import Contact from "./Contact";

class SupportCenter extends Component {
  state = {};

  active = {
    backgroundColor: "#a6a79b",
    color: "#f1efe9 !important",
  };

  render() {
    return (
      <BrowserRouter>
        <div className={styles.main}>
          <div className={`${styles.center} container`}>
            <div className={styles.leftArea}>
              <div className={styles.mysidebar}>
                <div>
                  <NavLink
                    activeClassName={styles.active}
                    to="/SupportCenter/FAQpage"
                  >
                    常見問題
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    activeClassName={styles.active}
                    to="/SupportCenter/Privacy"
                  >
                    隱私權政策
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    activeClassName={styles.active}
                    to="/SupportCenter/Service"
                  >
                    服務條款
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    activeClassName={styles.active}
                    to="/SupportCenter/Contact"
                  >
                    聯絡我們
                  </NavLink>
                </div>
              </div>
            </div>

            <div className={styles.content}>
              <Switch>
                <Route
                  exact
                  path="/SupportCenter/FAQpage"
                  component={FAQpage}
                />
                <Route
                  exact
                  path="/SupportCenter/Privacy"
                  component={Privacy}
                />
                <Route
                  exact
                  path="/SupportCenter/Service"
                  component={Service}
                />
                <Route
                  exact
                  path="/SupportCenter/Contact"
                  component={Contact}
                />
              </Switch>
            </div>
            <BackToTopButton />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default SupportCenter;
