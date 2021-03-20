import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

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
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <Link className="navbar-brand" to="/dashboard">
          <img src="./images/brand.png" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <form className="form-inline" action="#">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
                <button className="btn btn-outline-success" type="btn" onClick={handleLogout}>
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};