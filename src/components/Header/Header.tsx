import * as React from 'react';
import './Header.scss'
import logo from '../../assets/logo/logo.svg';
import avatar from '../../assets/logo/avatar.jpg';
import { Link } from 'react-router-dom';

const Header = () => {

  const renderUserMenu = () => {
    return (
      <div className="user-menu">
        <div className="image">
          <img className="avatar" src={avatar} alt="avatar" />
          <span className="iconfont icon-angle-down"/>
        </div>
        <ul className="user-menu-list">
          <li className="item">
            <span className="iconfont icon-id-card"/>
            <span>Profile</span>
          </li>
          <li className="item">
            <span className="iconfont icon-sign-in"/>
            <span>Sign Out</span>
          </li>
        </ul>
      </div>

    )
  }

  return (
    <header>
      <div className="container">
        <Link to="/index">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        {renderUserMenu()}
      </div>
    </header>
)
}

export default Header;

