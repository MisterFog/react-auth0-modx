import auth0 from 'auth0-js';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Store from '../../Store';
import key from '../../key_auth0';

const { Provider, Consumer: AuthConsumer } = React.createContext({
  isAuthorized: false,
});

class AuthProvider extends Component {
  state = {
    isAuthorized: false,
  };

  auth0 = new auth0.WebAuth({
    domain: key.domain,
    clientID: key.clientID,
    redirectUri: 'https://localhost:3000/callback', // URL-адрес, на который Auth0 будет перезванивать с результатом успешной или неудачной аутентификации.
    responseType: 'token id_token', //  тип ответа для всех запросов аутентификации
  });

  authorize = () => {
    // Auth0 перезвонит вашему приложению с результатами по указанному redirectUri.
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    // анализирует фрагмент хеша URL, чтобы извлечь результат ответа аутентификации Auth0
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setState(
          {
            isAuthorized: true,
          },
          () => {
            this.props.history.push('/private');
            // сохранение сессии
            this.setSession(authResult);
          }
        );

        /** userInfo */
        this.profile(authResult.accessToken);

        /** validateToken */
        // this.auth0.validateToken(
        //   authResult.idToken,
        //   'RS256',
        //   (err, validToken) => {
        //     validToken ? console.log(validToken) : console.log(err);
        //   }
        // );
      } else if (err) {
        console.log('parseHash: ', err);
      }
    });
  };

  /** Сохранение сессии */
  setSession = (authResult) => {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  profile = (accessToken) => {
    this.auth0.client.userInfo(accessToken, (err, userInfo) => {
      userInfo
        ? Store.authUser(userInfo) // modx - принемаем данные авторизованного пользователя
        : console.log('userInfo: ', err);
    });
  };

  /** Сохранение сессии + валидация токена по времени*/
  readToken = () => {
    const expiresAt = JSON.parse(String(localStorage.getItem('expires_at')));
    if (new Date().getTime() < expiresAt) {
      this.setState({
        isAuthorized: true,
      });
      this.profile(localStorage.getItem('access_token'));
    }
  };

  /** Вызов проверки наличия токена до рендеринга страницы */
  componentWillMount() {
    this.readToken();
  }

  render() {
    const { isAuthorized } = this.state;
    return (
      <Provider
        value={{
          isAuthorized,
          authorize: this.authorize,
          handleAuthentication: this.handleAuthentication,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter as AuthProvider };

export function withAuth(WrappedComponent) {
  return class AuthHOC extends Component {
    render() {
      const { ...rest } = this.props;
      return (
        <AuthConsumer>
          {(contextProps) => <WrappedComponent {...contextProps} {...rest} />}
        </AuthConsumer>
      );
    }
  };
}
