import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Creatkey from "./Creatkey"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Profile from "./Profile"



function App() {
  return (
    
    <Container
      className="d-flex align-items-center justify-content-center p-2 mb-2 "
      style={{ minHeight: "100vh" }} >
      <div className="p-3 mb-2 w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              {<PrivateRoute exact path="/" component={Creatkey} />}
              <Route path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
        
      </div>
    </Container>
    
  )
}

export default App
