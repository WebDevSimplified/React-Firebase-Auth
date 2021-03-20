import React from 'react';
import { VscLocation } from 'react-icons/vsc';
import { FaMale,FaFemale} from 'react-icons/fa';

const Demographics = () => {
  const css = {
    "line-height":"100px"
  }
  return (
    <>
      <div  style={css} className="form-group" ><VscLocation size="40px" /></div>
      <div  style={css} className="form-group" ><FaMale size="40px"/></div>
      <div  style={css} className="form-group" ><FaFemale size="40px" /></div>
    </>
  );
}

export default Demographics;
