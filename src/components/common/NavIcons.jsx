import React from 'react';
import { FaChild } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import '../css/Component.css'
import '../css/style.css'


const NavIcons = () => {
   
    return (
      <div className="sideBar" >
        <div className="pad">
        <button type="button" className="btn btn-xl"  ><Link to="/dashboard"><div className="form-group navIcon "><FaChartBar size="30px" color="white" /></div></Link></button>
        </div>
        <div className="pad">
        <button type="button" className="btn btn-xl" ><Link to="/profile"><div className="form-group navIcon"><FaChild size="30px" color="white"/></div></Link></button>
        </div>
        <div className="pad">
        <button type="button" className="btn btn-xl" ><Link to="/archives"><div className="form-group navIcon"><FaBookmark size="30px"color="white" /></div></Link></button>
        </div>
      </div>
    );
}

export default NavIcons;
