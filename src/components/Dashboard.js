import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import logo from '../image/logo.svg'

export default function Dashboard() {
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
    <>
      <Card className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4 font-weight-bold">CONTA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="user-info text-center mb-4 ">
                <img className="rounded-circle text-center" src={currentUser.photoURL} alt={currentUser.displayName} />
                <p className="font-weight-bold mb-4">{currentUser.displayName}</p>
              </div>
          
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Atualizar dados
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          SAIR
        </Button>
      </div>
    </>
  )
}
