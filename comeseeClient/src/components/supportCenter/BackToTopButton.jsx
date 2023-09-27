import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

class BackToTopButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  backToTopButton = {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "50px",
    right: "80px",
    background: "#A6A79B",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "40px",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 300) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <button
        className="back-to-top-button"
        style={this.backToTopButton}
        onClick={this.scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    );
  }
}

export default BackToTopButton;
