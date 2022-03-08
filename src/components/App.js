import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (

    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: 450 }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/React-Firebase-Auth' component={Dashboard}/>
              <PrivateRoute path='/React-Firebase-Auth/update-profile' component={UpdateProfile}/>
              <Route path='/React-Firebase-Auth/signup' component={Signup}/>
              <Route path='/React-Firebase-Auth/login' component={Login}/>
              <Route path='/React-Firebase-Auth/forgot-password' component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>

  )
}

export default App
