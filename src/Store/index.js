import { decorate, observable, action } from 'mobx';

class Store {
  /** user */
  user = {
    name: '',
    picture: '',
    nickname: '',
    email: '',
  };

  setUser(payload) {
    this.user = payload;
  }

  authUser(authuser) {
    let user = this.user;
    user = {
      name: authuser.name,
      picture: authuser.picture,
      nickname: authuser.nickname,
      email: authuser.email,
    };
    this.setUser(user);
  }
}

Store = decorate(Store, {
  /** user */
  user: observable, // mobx следит за изменениями этого оъекта и ререндерит интерфейс при необходимости
  setUser: action,
  authUser: action,
});
export default new Store();
