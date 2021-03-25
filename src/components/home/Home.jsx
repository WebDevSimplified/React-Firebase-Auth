import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron">
      <h1>Welcome to Nirogyyan........</h1>
      <Link to="/login" >Login</Link>
      &nbsp;&nbsp;
      <Link to="/signup" >Signup</Link>
    </div>
  );
}

export default Home;
