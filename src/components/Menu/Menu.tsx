import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

type menuItem = {
  to: string,
  icon: string,
  name: string,
}
const Menu = () => {
  const menu: menuItem[] = [
    {to: "/index", icon: "icon-dashboard", name: "DASHBOARD"},
    {to: "/agent", icon: "icon-sitemap", name: "AGENT"},
    {to: "/myCruise", icon: "icon-boat", name: "MY CRUISE"},
    {to: "/help", icon: "icon-life-bouy", name: "HELP"},
  ]

  return (
    <ul className="menu">
      {menu.map((item, index) => (
        <li key={index} className='list-item'>
          <NavLink to={item.to} activeClassName="active">
            <span className={`iconfont ${item.icon}`}/>
            <span>{item.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default Menu;
