import React, { Component } from 'react';
import './style.css';
import { Button, Card, Row, Col, Link } from 'react-materialize';

export default class Comments extends Component {
  componentWillMount() {}
  render() {
    return (
      <div className="comment-wrap">
        <h3 className="title">My awesome comements app</h3>
        <div className="post_page">
          <ul>
            {/* {data.posts.map(
              ({ title, text, user_name, date, date_resp, text_resp }, i) => (
                <li key={i}>
                  <Row>
                    <Col m={8} s={12}>
                      <Card
                        className="post_page-card"
                        textClassName="white-text"
                        title={title ? title : '***'}
                        actions={[
                          <Button>Ответить</Button>,
                          <Button>Удалить</Button>,
                        ]}
                      >
                        <div className="post_card-avtor">
                          <Link
                            className="post_card-link"
                            to={`/posts/${user_name}`}
                          >
                            <span>
                              Автор: {user_name ? user_name : 'incognito'}
                            </span>
                          </Link>
                          <p>Отзыв: {text ? text : '***'}</p>
                          <span>{date ? date : '***'}</span>
                        </div>
                        <div className="post_card-admin">
                          <p>Ответ: {text_resp ? text_resp : '***'}</p>
                          <span>{date_resp ? date_resp : '***'}</span>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </li>
              )
            )} */}
          </ul>
        </div>
      </div>
    );
  }
}
