import React, { Component } from 'react';
import axios from 'axios';
import OthersComment from './comment';
import SortBtn from './sortBtn';
import Star from './star';
import CMS from '../../css/home/comment.module.css';
import { Redirect, withRouter } from 'react-router-dom'; // 导入用于跳转的组件
import TicketContext from '../../TicketContext';
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";


class CommentTabs extends Component {
    static contextType = TicketContext;

    state = {
        comment: [],
        myComment: "",
        rating: null, // 评分的初始值
        isLoggedIn: true, // 用户是否已登录
        userID: null, // 用于存储用户ID
        redirectToLogin: false, // 用于判断是否需要跳转到登录页面
        commentSubmitted: false, // 添加此属性
    };


    handleRatingChange = (rating) => {
        this.setState({ rating });
    };

    handleCommentChange = (event) => {
        this.setState({ myComment: event.target.value });
    };

    handleLoginRedirect = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ redirectToLogin: true });
        }
    };

    handleLoginSuccess = () => {
        console.log("User logged in successfully");
        // 在登录成功后调用此函数，设置用户已登录并存储 userID
        this.setState({ isLoggedIn: true, redirectToLogin: false });
    };



    handleSubmit = (event) => {
        event.preventDefault();
        console.log("userID in state:", this.state.userID);
        if (this.state.isLoggedIn) {
            const { myComment, userID } = this.state;
            if (!userID) {
                console.error("userID is null"); // 添加此行以检查 userID
                Swal.fire({
                    title: '請先登入會員',
                    icon: 'warning',
                    confirmButtonText: "確認",
                });
                this.props.history.push("/login");
                return;
            }
            const movieID = this.props.filmInfo.id; // 从组件的props中获取电影ID

            // 构建要发送的数据对象
            const data = {
                movieID,
                userID: this.state.userID,
                comment: myComment,
                score: this.state.rating, // 如果你有评分功能，从状态中获取评分
            };
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            if (!token) {
                // Handle the case where the token is not available
                Swal.fire({
                    title: '請先登入會員',
                    icon: 'warning',
                    confirmButtonText: "確認",
                });
                // this.props.history.push("/login");
            } else {

                // 发送 POST 请求到后端服务器
                axios
                    .post("http://localhost:2407/comment", data, config)
                    .then((response) => {
                        console.log("Comment submitted successfully", response.data);
                        this.setState({ myComment: "", commentSubmitted: true }, () => {
                            // 使用 setTimeout 在三秒后将 commentSubmitted 设置回 false
                            setTimeout(() => {
                                this.setState({ commentSubmitted: false });
                            }, 3000);
                        });
                    })
                    .catch((error) => {
                        // 处理错误
                        console.error("Error submitting comment", error);

                        if (error.response) {
                            // 服务器返回了响应，你可以尝试获取服务器返回的错误消息
                            console.error("Server Error Data:", error.response.data);
                        } else if (error.request) {
                            // 请求已经发出，但没有收到响应
                            console.error("No Response Received:", error.request);
                        } else {
                            // 在设置请求时发生了错误
                            console.error("Request Error:", error.message);
                        }
                    });
                window.location = `/info/${movieID}?tab=comment`
            }
        } else {
            Swal.fire({
                title: '請先登入會員',
                icon: 'warning',
                confirmButtonText: "確認",
            });
        }
    };



    componentDidMount() {
        axios
            .get('http://localhost:2407/comment', {
                params: {
                    movieID: this.props.filmInfo.id
                }
            })
            .then((response) => {
                this.setState({ comment: response.data });
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
        this.decodedTokenGetUserID();
    }


    //JWT相關函式以下
    // componentDidMount() {
    //解碼JWT token 取出 userID 放入 state
    // }

    //解碼JWT token 取出 userID 放入 state
    decodedTokenGetUserID = () => {
        let token = localStorage.getItem("token") || null;
        // console.log(token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // decodeJWT
                console.log("Decoded token:", decodedToken);
                console.log("Decoded userID:", decodedToken.userId);
                this.setState({ userID: decodedToken.userId });
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    };

    // 檢查令牌是否過期
    checkTokenExpiration = () => {
        if (this.state.exp) {
            // console.log("1111");
            const now = Date.now() / 1000;
            if (now > this.state.exp) {
                // 令牌已過期
                console.log("2222");
                this.setState({ token: null, exp: null });
                localStorage.removeItem("token");
                localStorage.removeItem("exp");
            }
        }
    };

    // 登入時將token, exp放入localStorage，context也更新
    login = (token, exp) => {
        this.setState({ token, exp });
        localStorage.setItem("token", token);
        localStorage.setItem("exp", exp);
    };

    //登出時將token, exp從localStorage移除，context也更新
    logout = () => {
        this.setState({ token: null, exp: null });
        localStorage.removeItem("token");
        localStorage.removeItem("exp");
    };
    //JWT相關函式以上


    sortByNewest = (comments) => {
        return comments.slice().sort((a, b) => {
            return new Date(b.sendTime) - new Date(a.sendTime);
        });
    };

    sortByScore = (comments) => {
        return comments.slice().sort((a, b) => {
            return b.score - a.score;
        });
    };

    handleSortByNewest = () => {
        const sortedComments = this.sortByNewest(this.state.comment);
        this.setState({ comment: sortedComments });
    };

    handleSortByScore = () => {
        const sortedComments = this.sortByScore(this.state.comment);
        this.setState({ comment: sortedComments });
    };
    render() {
        let contentToRender;

        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />;
        }

        if (this.state.isLoggedIn) {
            contentToRender = (
                <div className="self-comment">
                    {/* 如果用户已登录，显示评论框 */}
                    <div className={CMS.selfBox}>
                        <form onSubmit={this.handleSubmit}>
                            {/* 星星跟留言框 */}
                            <Star onRatingChange={this.handleRatingChange} />
                            <input
                                type="text"
                                className={CMS.text}
                                value={this.state.myComment}
                                onChange={this.handleCommentChange}
                                placeholder="請輸入評論內容"
                            />
                            {/* 送出按钮 */}
                            <button className={CMS.scb + " m-1"} type="submit">送出</button>
                            {this.state.commentSubmitted && (
                                <div className="comment-success">
                                    <p>已成功評論!</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            );
        } else {
            contentToRender = (
                <div className={CMS.login}>
                    <button className={CMS.loginbtn} onClick={this.handleLoginRedirect}>立即登入進行評論</button>
                </div>
            );
        };

        return (
            <>
                {contentToRender}
                <div div className="comment-box" >

                    {/* 留言排序的按鈕 */}
                    <div className={CMS.sortBar} >
                        <SortBtn label="時間" onClick={this.handleSortByNewest} />
                        <SortBtn label="分數" onClick={this.handleSortByScore} />
                    </div >

                    {/* 其他人的評論 */}
                    <OthersComment comment={this.state.comment} filmInfo={this.props.filmInfo} />
                </div>

            </>)
    }
}

export default withRouter(CommentTabs);