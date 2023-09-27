import React, { Component } from "react";

import styles from "../../css/supportCenter/contact.module.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      email: "",
      message: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // 表單處理
    console.log("Form submitted:", this.state);
  };

  render() {
    const { name, gender, email, message } = this.state;

    return (
      <React.Fragment>
        <h1 className={styles.h1}>聯絡我們</h1>
        <div className={styles.contactForm}>
          {/* <h2>聯絡我們</h2> */}
          <form onSubmit={this.handleSubmit}>
            <label className={styles.label}>
              姓名:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </label>
            <label className={styles.label}>
              性别:
              <select
                className={styles.input}
                name="gender"
                value={gender}
                onChange={this.handleChange}
              >
                <option value="">請選擇</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
            </label>
            <label className={styles.label}>
              電子郵件:
              <input
                className={styles.input}
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
            <label className={styles.label}>
              内容:
              <textarea
                className={styles.input}
                name="message"
                value={message}
                onChange={this.handleChange}
              />
            </label>
            <button className={styles.button} type="submit">
              確定
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
