import React, { Component } from 'react';
import axios from 'axios';
import store from '../../Store';
import Avatar from '../Avatar/Avatar';
import './createComment.css';
import Store from '../../Store';

export default class Create extends Component {
  state = {
    text: '',
    title: '',
  };

  commitInput(title, text) {
    const { user } = store;
    const body = {
      user: user.nickname ? user.nickname : user.name,
      profilePicture: user.picture,
      text: text,
      title: title,
    };
    axios.post('http://localhost:7070/api/post', body).then((res) => {
      console.log(res.data);
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    this.commitInput(this.state.title, this.state.text);
    event.preventDefault();
    // очищаем форму
    this.setState({ text: '', title: '' });
    //
    Store.action ? Store.setAction(false) : Store.setAction(true);
  };

  render() {
    const { user } = store;
    return (
      <div className="personInput">
        <Avatar userInfo={user} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Тема отзыва:
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Напишите тему"
            />
          </label>
          <label>
            Ваше мнение:
            <textarea
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Поле ввода"
            />
          </label>
          <input className="btn" type="submit" value="Опубликовать" />
        </form>
      </div>
    );
  }
}
