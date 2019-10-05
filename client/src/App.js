import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import './App.scss';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;


// Pages
const Login = Loadable({
  loader: () => import('./comp-items/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./comp-items/Register'),
  loading
});

const ForgotPassword = Loadable({
  loader: () => import('./comp-items/ForgotPassword/ForgotPasword'),
  loading
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {/* The name must match the name defined in the routes*/}
          <Route exact path="/" name="Login" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/forgotPassword" name="Forgot Password Page" component={ForgotPassword} />

        </Switch>
      </HashRouter>
    );
  }
}
export default App;
