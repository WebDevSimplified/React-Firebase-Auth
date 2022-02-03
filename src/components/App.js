import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
