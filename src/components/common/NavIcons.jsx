import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const NavIcons = () => {
    const css = {
      "line-height":"100px",
      "color":"black",
      "height": "20vh"
    }
    return (
      <div className="sideBar">
        <Link to="/profile"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/dashboard"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/archives"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
      </div>
    );
}

export default NavIcons;
