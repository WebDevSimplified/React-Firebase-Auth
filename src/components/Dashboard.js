import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app";
import "./styles.css";

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(null);
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

  useEffect(() => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      console.log(currentUser.displayName);
      console.log(currentUser.email);
      console.log(currentUser.photoURL);
    }
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div style={{textAlign: "center"}}>
            <div style={{marginBottom: "1rem"}}>
              {currentUser.photoURL ? <img className="card-image" src={currentUser.photoURL} /> : null}
            </div>
            <strong>Email:</strong> {currentUser.email} <br />
            {currentUser.displayName ? <p><strong>Name: </strong>{currentUser.displayName}</p>  : null}
          </div>         
          {!currentUser.displayName ? <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> : null}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
