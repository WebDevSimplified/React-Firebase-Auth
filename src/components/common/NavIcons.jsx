import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const NavIcons = () => {
    const css = {
      "line-height":"100px",
      "color":"black"
    }
    return (
      <>
        <Link to="/profile"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/dashboard"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/archives"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/blogs"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/settings"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
        <Link to="/info"><div className="form-group" style={css}><FaCalendar size="30px"/></div></Link>
      </>
    );
}

export default NavIcons;
