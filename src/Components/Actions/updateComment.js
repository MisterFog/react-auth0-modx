import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '../../Style';

export default class Update extends Component {
  updateComment = () => {
    const comment = {
      title: 'Update title',
      text: 'Update text',
    };
    console.log(this.props.id, comment);
    axios
      .put('http://localhost:7070/api/post/' + this.props.id, comment)
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    return <Button onClick={() => this.updateComment()}>Обновить</Button>;
  }
}
