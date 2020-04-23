import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '../../Style';

export default class Delete extends Component {
  deleteComment = () => {
    axios
      .delete('http://localhost:7070/api/post/' + this.props.id)
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    return <Button onClick={() => this.deleteComment()}>Удалить</Button>;
  }
}
