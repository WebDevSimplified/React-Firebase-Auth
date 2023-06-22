import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../contexts/AuthContext';

export default function AppNavbar() {

  const {logout, currentUser} = useAuth();

  return (
    <Navbar className="bg-navbar" variant="dark">
      <Container className="text-white">
        <Navbar.Brand href="#home">Task Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{currentUser.email}</a>
          </Navbar.Text>
          <Button className="ml-3" variant="danger" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

