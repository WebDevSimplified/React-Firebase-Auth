import React from 'react';
import { BsExclamationOctagonFill} from 'react-icons/bs';
import { GiProgression } from 'react-icons/gi';
import { IoBodySharp } from 'react-icons/io5';
import { DashCard } from './Cards.jsx';

const MidDashBoard = () => {
  const css = {
    "line-height":"100px",
  }
  return (
    <>
      <div className="form-group" style={css}><GiProgression size="30px"/></div>
      <div className="form-group" style={css}><IoBodySharp size="40px"/></div>
      <div className="form-group" style={css}><BsExclamationOctagonFill size="30px"/></div>   
      <DashCard />
    </>
  );
}

export default MidDashBoard;
