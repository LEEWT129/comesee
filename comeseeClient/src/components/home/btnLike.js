import React, { Component } from "react";

class BtnLike extends Component {
  btnStyle = {
    width: "35px",
    height: "35px",

    float: "right",

    color: "#A6A79B",
    fontFamily: "Lucida Sans Unicode",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "35px",

    border: "none",
    borderRadius: "20px",
    backgroundColor: "#F1EFE9",

    textAlign: "center",
  };

  btnStyleLiked = {
    color: "#AE1914",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { isLiked } = this.state;
    const isliked = this.props.isLiked;
    return (
      <div
        // onClick={this.handleLike}
        style={
          isliked ? { ...this.btnStyle, ...this.btnStyleLiked } : this.btnStyle
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          fill="currentColor"
          className="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </div>
    );
  }
}

export default BtnLike;
