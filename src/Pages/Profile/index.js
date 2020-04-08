import React, { Component } from 'react';
import { FlexWrapper, Panel } from '../../Style';
import store from '../../Store';
import { Button } from 'reactstrap';
import auth0 from 'auth0-js';
import Avatar from '../../Components/Avatar/Avatar';
import key from '../../key_auth0';

export default class Profile extends Component {
  logoutWithRedirect = () => {
    var webAuth = new auth0.WebAuth({
      domain: key.domain,
      clientID: key.clientID,
    });

    webAuth.logout({
      domain: key.domain,
      clientID: key.clientID,
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  render() {
    const { user } = store;
    return (
      <FlexWrapper>
        <Panel>
          <Avatar userInfo={user} />
          <h1>Данные пользователя:</h1>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <Button id="LogoutBtn" onClick={() => this.logoutWithRedirect()}>
            Log out
          </Button>
        </Panel>
      </FlexWrapper>
    );
  }
}
