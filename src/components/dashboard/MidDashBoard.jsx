import React from 'react';
import { BsExclamationOctagonFill} from 'react-icons/bs';
import { GiProgression } from 'react-icons/gi';
import { IoBodySharp } from 'react-icons/io5';
import 'Components.css';

const MidDashBoard = () => {

  return (
    <>
      <div className="form-group mid_dashboard2"><GiProgression  className="mid_dashboard" /></div>
      <div className="form-group mid_dashboard2"><IoBodySharp className="mid_dashboard1" /></div>
      <div className="form-group mid_dashboard2"><BsExclamationOctagonFill className="mid_dashboard" /></div>   
    </>
  );
}

export default MidDashBoard;
