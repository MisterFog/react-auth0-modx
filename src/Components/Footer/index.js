import React from 'react';
import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="content">
      <img
        className="logo"
        src={require('../../Img/logotyp.png')}
        alt="logotyp"
      />
      <p>
        Sample project provided by <a href="https://auth0.com"> Auth0 </a>
      </p>
    </div>
  </footer>
);

export default Footer;
