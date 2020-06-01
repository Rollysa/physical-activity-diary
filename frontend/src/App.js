import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddActivity from "./components/activity/AddActivity";
import { Provider } from "react-redux";
import store from "./store";
import UpdateActivity from "./components/activity/UpdateActivity";
import LandingPage from "./components/layout/LandingPage";
import RegisterPage from "./components/person/RegisterPage";
import LoginPage from "./components/person/LoginPage";
import jwt_decode from "jwt-decode";
import setJWTToken from "./security/setJWTToken";
import { SET_CURRENT_PERSON } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./security/SecuredRoute";
import Chart from "./components/analysis/Chart";
import PersonProfile from "./components/person/PersonProfile";
import ForgotPassword from "./components/person/ForgotPassword";
import ResetPassword from "./components/person/ResetPassword";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.disptach({
    type: SET_CURRENT_PERSON,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.disptach(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgotPassword/" component={ForgotPassword} />
            <Route exact path="/resetPassword/" component={ResetPassword} />
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addActivity" component={AddActivity} />
              <SecuredRoute
                exact
                path="/updateActivity/:id"
                component={UpdateActivity}
              />
              <SecuredRoute exact path="/analysis" component={Chart} />
              <SecuredRoute
                exact
                path="/person/:id"
                component={PersonProfile}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
