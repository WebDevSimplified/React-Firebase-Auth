import React from "react";
import NavIcons from "../common/NavIcons";
import Navbar from "./Navbar";
import '../css/style.css';
const Profile = () => {
  
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center bg-info">
          <Navbar />
        </div>
      </div>
      <div className="row bg-new3">
        <div className="col-lg-1 col-md-1 col-sm-2 text-center dashboard1 bg-new2">
          <NavIcons />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-10 text-left">
          <h1>Welcome to Archives Page...</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
