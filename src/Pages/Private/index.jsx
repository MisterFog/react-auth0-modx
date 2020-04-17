import React, { useState, useContext } from 'react';
import { FlexWrapper, Panel } from '../../Style';
import Comments from '../../Components/Comments';

export default () => (
  <FlexWrapper>
    <Panel>
      <h1>Приватная страница</h1>
      <p>Доступна только авторизованным пользователям.</p>
      <Comments />
    </Panel>
  </FlexWrapper>
);
