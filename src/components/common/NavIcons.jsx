import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const NavIcons = () => {

    return (
      <div className="sideBar">
        <Link to="/profile"><div className="form-group navicons"><FaCalendar className="navicons1"/></div></Link>
        <Link to="/dashboard"><div className="form-group navicons"><FaCalendar className="navicons1"/></div></Link>
        <Link to="/archives"><div className="form-group navicons"><FaCalendar className="navicons1"/></div></Link>
      </div>
    );
}

export default NavIcons;
