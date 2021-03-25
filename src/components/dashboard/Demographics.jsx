import React from 'react';
import { VscLocation } from 'react-icons/vsc';
import { FaMale,FaFemale} from 'react-icons/fa';

const Demographics = () => {

  return (
    <>
      <div className="demographics1 form-group"><VscLocation className="demographics" /></div>
      <div className="demographics1 form-group"><FaMale className="demographics"/></div>
      <div className="demographics1 form-group"><FaFemale className="demographics" /></div>
    </>
  );
}

export default Demographics;
