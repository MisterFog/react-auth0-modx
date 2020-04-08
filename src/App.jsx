import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Public from './Pages/Public';
import Private from './Pages/Private';
import Callback from './Pages/Callback';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { AuthProvider } from './Pages/Auth';
import { PrivateRoute } from './PrivateRoute';
import { Nav, NavLink } from './Style';
import Avatar from './Components/Avatar/Avatar';

// mobx
import store from './Store';
import { observer } from 'mobx-react';

class App extends Component {
  componentDidMount() {}
  render() {
    const { user } = store;

    return (
      <AuthProvider>
        <Nav>
          <NavLink to="/public">Public</NavLink>
          <NavLink to="/private">Private</NavLink>
          <NavLink to="/profile">
            <Avatar userInfo={user} />
          </NavLink>
        </Nav>

        <Switch>
          <Route path="/public" component={Public} />
          <Route path="/callback" component={Callback} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private" component={Private} />
          <Redirect to="/public" />
          {/* если используется route отличный от прописаных выше, пользователь бедет перенаправлен на /public */}
        </Switch>
      </AuthProvider>
    );
  }
}

export default observer(App);
