import React, { Component } from 'react';
import './allComments.css';
import { Button, Card, CardTitle, Row, Col } from 'react-materialize';
import 'materialize-css';
import axios from 'axios';
import moment from 'moment';
import Delete from '../Actions/delComment';
import Update from '../Actions/updateComment';
import Modal from '../Modal/modUpCom';

export default class Comments extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get('http://localhost:7070/api/posts').then((res) => {
      this.setState({ users: res.data.data });
    });
  }

  render() {
    return (
      <div className="comment-wrap">
        <h3 className="title">My awesome comements app</h3>
        <div className="post_page">
          <ul>
            {this.state.users.map(
              (
                {
                  _id,
                  user,
                  profilePicture,
                  title,
                  text,
                  created,
                  date_resp,
                  text_resp,
                },
                i
              ) => (
                <li key={i}>
                  <Row>
                    <Col m={8} s={12}>
                      <Card
                        className="comment"
                        actions={[
                          <Modal id={(_id, title, text)} key={_id + 'modal'} />,
                          <Delete id={_id} key={_id + 'del'} />,
                        ]}
                      >
                        <CardTitle image={profilePicture ? profilePicture : ''}>
                          <span>Автор: {user ? user : 'incognito'}</span>
                          <p>Тема: {title ? title : '***'}</p>
                        </CardTitle>
                        <p>Отзыв: {text ? text : ''}</p>
                        <span>
                          Опубликовон:{' '}
                          {moment(created).format('DD-MMMM-YYYY HH:mm')}
                        </span>
                        <hr />
                        {text_resp ? (
                          <div className="post_card-admin">
                            <p>Ответ: {text_resp}</p>
                            <span>
                              Опубликовон:{' '}
                              {moment(date_resp).format('DD-MMMM-YYYY HH:mm')}
                            </span>
                            <hr />
                          </div>
                        ) : (
                          ''
                        )}
                      </Card>
                    </Col>
                  </Row>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}
