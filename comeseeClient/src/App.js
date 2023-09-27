import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import HomePage from "./components/home/homePage";
import ListPage from "./components/home/listPage";
import InfoPage from "./components/home/infoPage";

import SupportCenter from "./components/supportCenter/SupportCenter";
import BookingSeat from "./components/booking/BookingSeat";
import Payment from "./components/payment/Payment";
import Discount from "./components/payment/Discount";
import TicketType from "./components/payment/TicketType";
import Confirm from "./components/payment/Confirm";
import PaymentCompleted from "./components/payment/PaymentCompleted";
import Collectionpage from "./components/member/collectionpage";
import Fee from "./components/member/fee";
import Member from "./components/member/member";
import Socialhome from "./components/socialpage/socialhome";
// import Social from "./components/socialpage/Tab";
import personalSocialPage from "./components/personalSocialPage/social";
import ForgotPasswordPage from "./components/Frank/ForgotPasswordPage";
import Login from "./components/Frank/login";
import Register from "./components/Frank/register";
// import ChangePassword from './components/Frank/ChangePassword'
import UserMessage from "./components/member/UserMessage";
import MemberInformation from "./components/Frank/MemberInformation";
import ResetPassword from "./components/Frank/ResetPassword";
import Mypassword from "./components/Frank/Mypassword";

import HeadPicture from "./components/multer/HeadPicture";

import { TicketProvider } from "./TicketProvider";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <TicketProvider>
          <Navbar />
          <div>
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/list" component={ListPage} />
              <Route path="/Info/:id" component={InfoPage} />
              <Route path="/SupportCenter/:page" component={SupportCenter} />
              <Route path="/Collectionpage" component={Collectionpage} />
              <Route path="/Fee" component={Fee} />
              <Route path="/Member" component={Member} />
              <Route path="/Socialhome" component={Socialhome} />
              {/* <Route path="/Social" component={Social} /> */}
              <Route
                path="/personalSocialPage/:userID"
                component={personalSocialPage}
              />

              <Route path="/ForgotPassword" component={ForgotPasswordPage} />
              {/* {/* <Route path="/ChangePassword" component={ChangePassword} /> */}
              <Route path="/UserMessage" component={UserMessage} />
              <Route path="/Register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/ResetPassword" component={ResetPassword} />
              <Route path="/BookingSeat" component={BookingSeat} />
              <Route path="/TicketType" component={TicketType} />
              <Route path="/discount" component={Discount} />
              <Route path="/Confirm" component={Confirm} />
              <Route path="/payment" component={Payment} />
              <Route path="/PaymentCompleted" component={PaymentCompleted} />
              <Route path="/memberinformation" component={MemberInformation} />
              <Route path="/mypassword" component={Mypassword} />

              <Route path="/HeadPicture" component={HeadPicture} />
            </Switch>
          </div>
          <Footer />
        </TicketProvider>
      </BrowserRouter>
    );
  }
}

export default App;
