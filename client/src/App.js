import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PasswordReset from "./components/auth/PasswordReset";
import Home from "./components/dashboard/Home";
import AccountValidation from "./components/auth/AccountValidation";
import PasswordResetValidation from "./components/auth/PasswordResetValidation";
import NotFoundPage from "./components/layout/NotFoundPage.js";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reset" component={PasswordReset} />
              <PrivateRoute path="/home" component={Home} />
              <Route
                path="/account-validation/:token"
                component={AccountValidation}
              />
              <Route
                path="/reset-password/:token"
                component={PasswordResetValidation}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
