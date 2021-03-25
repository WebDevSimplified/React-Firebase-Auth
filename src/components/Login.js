import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-8 col-lg-6 mx-auto">
            <div className="card card-signin my-5">
              <p className="text-center">
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={handleSubmit}>
                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      type="email"
                      id="email"
                      ref={emailRef}
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <br />
                  <div className="form-label-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      type="password"
                      id="password"
                      ref={passwordRef}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
                <div className="w-100 text-center mt-3">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
