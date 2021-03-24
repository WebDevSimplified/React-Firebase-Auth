import React from 'react';
import { FaChild } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const NavIcons = () => {
    const css = {
      "line-height":"100px",
      "color":"black",
      "height": "20vh",
      "cursor": "pointer",
      "&:hover": {
      "box-shadow": "0 0 0 5px rgba(#000,.4) , 0 0 0 10px  #f05f75",
      }
    }
   
    return (
      <div className="sideBar">
        <Link to="/profile"><div className="form-group" style={css}><FaChild size="30px"/></div></Link>
        <Link to="/dashboard"><div className="form-group" style={css}><FaChartBar size="30px"/></div></Link>
        <Link to="/archives"><div className="form-group" style={css}><FaBookmark size="30px"/></div></Link>
      </div>
    );
}

export default NavIcons;
