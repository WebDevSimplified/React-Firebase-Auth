import React from "react"
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./Signup";
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <Container className="d-flex align-items-center justif-content-center"
    style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Router>
      <AuthProvider>
            <Routes>
              {/* this private route locks us to the official home page if not yet logged in, so we can't go to the dashboard*/ }
              <Route exact path="*" element={<PrivateRoute/>} component={Dashboard} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Routes>
      </AuthProvider>
      </Router>
      </div>
    </Container>
    )
}

export default App;
