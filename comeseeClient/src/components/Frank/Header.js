import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <div className="main-bg">
            <div className="intro">
              <div className="user">
                <p className="username">{this.props.username}</p>
                <p className="userid">{this.props.userid}</p>
              </div>
              <p className="newintro">{this.props.introduction}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
