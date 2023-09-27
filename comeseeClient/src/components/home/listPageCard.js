import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Like from "./like";

import CardStyle from "../../css/home/listPageCard.module.css";

class ListPageCard extends Component {
  goBuy = (id) => {
    this.props.history.push(`/info/${id}?tab=time`);
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <>
        <div className={`${CardStyle.film} card col-3`}>
          <Link to={`/info/${this.props.id}?tab=time`}>
            <img src={this.props.imageUrl} className={CardStyle.myImg} alt="" />
          </Link>

          <div className={CardStyle.myCard}>
            <Like movieID={this.props.id} />
            <h2 className={CardStyle.title}>{this.props.movieNameCN}</h2>
            <p className={CardStyle.text}>{this.props.movieNameEN}</p>
            <button
              className={CardStyle.cBtn}
              onClick={() => this.goBuy(this.props.id)}
            >
              立即購票
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ListPageCard);
