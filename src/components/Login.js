import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, googleLogin, facebookLogin } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function googleHandle() {
     try{
       await googleLogin()
       history.push("/")
     } catch {
       console.log("Failed to login using google");
     }
  }

  async function facebookHandle() {
    try{
      await facebookLogin()
      history.push("/")
    } catch {
      console.log("Failed to login using facebook");
    }
 }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div style={{marginTop: "1rem", marginBottom: "1rem"}}>
        <FacebookLoginButton onClick={facebookHandle} />
      </div>
      <div style={{marginTop: "1rem", marginBottom: "1rem"}}>
        <GoogleLoginButton onClick={googleHandle} />
      </div>
    </>
  )
}
