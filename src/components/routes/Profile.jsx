import React from "react";
import NavIcons from "../common/NavIcons";
import Navbar from "./Navbar";

const Profile = () => {
   
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center bg-info">
          <Navbar />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 text-center bg-new2 dashboard1">
          <NavIcons />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-10 text-left  bg-new3">
          <h1>Welcome to Profile Page...</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
