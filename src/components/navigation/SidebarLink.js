import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarLink.css';

const SidebarLink = props => {
  return (
    <li className={`sidebar-list-link ${props.type ? props.type : ''}`} onClick={props.onClick}>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
};

export default SidebarLink;
