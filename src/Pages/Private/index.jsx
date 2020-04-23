import React from 'react';
import { FlexWrapper, Panel } from '../../Style';
import Comments from '../../Components/Actions/allComments';
import CreateComment from '../../Components/Actions/createComment';

export default () => (
  <FlexWrapper>
    <Panel>
      <h1>Приватная страница</h1>
      <p>Доступна только авторизованным пользователям.</p>
      <CreateComment />
      <Comments />
    </Panel>
  </FlexWrapper>
);
