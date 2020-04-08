import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Public from './Pages/Public';
import Private from './Pages/Private';
import Callback from './Pages/Callback';
import Registration from './Pages/Login';
import Profile from './Pages/Profile';
import { AuthProvider } from './Pages/Auth';
import { PrivateRoute } from './PrivateRoute';
import { Nav, NavLink, Logo } from './Style';
import Avatar from './Components/Avatar/Avatar';
import LogIn from './Components/LogIn';
import Footer from './Components/Footer';

// mobx
import store from './Store';
import { observer } from 'mobx-react';

class App extends Component {
  render() {
    const { user } = store;

    return (
      <AuthProvider>
        <Nav>
          <NavLink to="/public">
            <Logo src={require('./Img/logotyp.png')} alt="logotyp" />
          </NavLink>
          <NavLink to="/public">Public</NavLink>
          <NavLink to="/private">Private</NavLink>
          {!localStorage.getItem('access_token') ? (
            <NavLink to="#">
              <LogIn />
            </NavLink>
          ) : (
            <NavLink to="/profile">
              <Avatar userInfo={user} />
            </NavLink>
          )}
        </Nav>

        <Switch>
          <Route path="/public" component={Public} />
          <Route path="/callback" component={Callback} />
          <Route path="/login" component={Registration} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private" component={Private} />
          <Redirect to="/public" />
          {/* если используется route отличный от прописаных выше, пользователь бедет перенаправлен на /public */}
        </Switch>
        <Footer />
      </AuthProvider>
    );
  }
}

export default observer(App);
