import React from 'react';
import { FlexWrapper, Panel } from '../../Style';
import Crawler from '../../Components/Crawler/Crawler';

export default () => (
  <FlexWrapper>
    <Panel>
      <h1>Публичная страница</h1>
      <p>Доступ к этой странице открыт всем желающим.</p>
      <p>Авторизация не требуется.</p>
      <Crawler />
    </Panel>
  </FlexWrapper>
);
