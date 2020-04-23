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

  /** action */
  action = false;

  setAction(change) {
    this.action = change;
  }

  /** comments */
  comments = [];

  setComments(payload) {
    this.comments = payload;
  }

  listComments(newlist) {
    let comments = this.comments;
    comments = newlist;
    this.setComments(comments);
  }
}

Store = decorate(Store, {
  /** user */
  user: observable, // mobx следит за изменениями этого оъекта и ререндерит интерфейс при необходимости
  setUser: action,
  authUser: action,
  /** action */
  action: observable,
  setAction: action,
  /** comments */
  comments: observable,
  setComments: action,
  listComments: action,
});
export default new Store();
