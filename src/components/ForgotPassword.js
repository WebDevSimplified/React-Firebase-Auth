import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
    <div className="container mt-3 mb-4">
        <div className="card container mt-5 col-sm-9 col-md-8 col-lg-6 mx-auto">
          <div className="card-body">
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <div className="alert" variant="danger">{error}</div>}
            {message && <div className="alert" variant="success">{message}</div>}
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="form-group" id="email">
                  <label className="form-label">Email</label >
                  <input type="email" className="form-control" placeholder="Email address" ref={emailRef} required />
                </div>
                {/* <button className="btn btn-warning" disabled={loading} className="w-100" type="submit">
                  Reset Password
                </button> */}
                <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >Reset Password
                  </button>
              </form>
            </div>  
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </div >
        </div>
      </div>  
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
