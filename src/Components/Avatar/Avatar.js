import React, { Component } from 'react';
import './Avatar.css';

export default class Avatar extends Component {
  render() {
    var { userInfo } = this.props;
    return (
      <nav className="avatar">
        {userInfo.picture ? (
          <div className="avatar-info">
            <img src={userInfo.picture} alt="avatar" />
            <span>{userInfo.nickname}</span>
          </div>
        ) : (
          ''
        )}
      </nav>
    );
  }
}
