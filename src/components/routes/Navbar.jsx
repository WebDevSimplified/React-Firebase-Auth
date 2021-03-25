import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import logo from '../images/logo.png'
import '../css/style.css'
export default function Navbar() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
 
  return (
    <div className="navb">
      <nav className="navbar navbar-expand-md bg-new navbar-light">
        <Link className="navbar-brand" to="/dashboard">
          <img src={logo} width="150" height="30" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <form className="form-inline" action="#">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"/>
                <button className="btn btn-outline-light" type="submit">
                  <b>Search</b>
                </button>
                <button className="btn btn-outline-light mx-2 " type="btn" onClick={handleLogout}>
                  <b>Logout</b>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};