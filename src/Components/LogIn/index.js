import React, { Component } from 'react';
import { Button } from '../../Style';
import key from '../../key_auth0';
import auth0 from 'auth0-js';

export default class LogIn extends Component {
  auth0 = new auth0.WebAuth({
    domain: key.domain,
    clientID: key.clientID,
    redirectUri: 'https://localhost:3000/callback', // URL-адрес, на который Auth0 будет перезванивать с результатом успешной или неудачной аутентификации.
    responseType: 'token id_token', //  тип ответа для всех запросов аутентификации
  });

  loginWithRedirect = () => {
    this.auth0.authorize();
  };
  render() {
    return <Button onClick={() => this.loginWithRedirect()}>Log in</Button>;
  }
}
