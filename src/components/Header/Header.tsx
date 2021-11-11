import * as React from 'react';
import logo from '../../assets/logo/logo.svg';
import avatar from '../../assets/logo/avatar.jpg';

const Header = () => {
  return (
    <header>
      <div className="container">
        <img className="logo" src={logo} alt="logo" />
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
    </header>
)
}

export default Header;

