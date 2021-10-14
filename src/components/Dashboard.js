import React, { useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
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
      <Card className="text-light shadow p-3 mb-5 bg-secondary rounded p-3 mb-2">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4 font-weight-bold text-black">CONTA</h2>
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
      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <h2 className="text-center d-block mb-4">CRIE SUA CONTA PIX</h2>
        <p className="text-center"> Coloque seus dados já cadastrado no seu banco para gerar o PIX com seus dados</p>
      <Form >
            <Form.Group className="mb-4 mt-4"id="email">
              <Form.Label className="mb-0">Chave PIX</Form.Label>
              <Form.Control type="email" required placeholder="Digite sua chave PIX"/>
              <small  className="form-text text-muted">PIX cadastrada (Telefone, E-mail, CPF, CNPJ ou chave Aleatória) </small>
            </Form.Group>
            <Form.Group className="mb-4" id="password">
              <Form.Label className="mb-0">Nome do beneficiário</Form.Label>
              <Form.Control type="password"  required placeholder="Nome beneficiário"/>
              <small  className="form-text text-muted">Nome do beneficiário (até 25 letras). </small>
            </Form.Group>
            <Form.Group className="mb-4" id="password-confirm">
              <Form.Label className="mb-0">Digite a cidade</Form.Label>
              <Form.Control type="password" required placeholder="Digite a cidade"/>
              <small  className="mt-0 form-text text-muted">Cidade do beneficiário ou da transação (até 15 letras) </small>
            </Form.Group>
            <Button className="w-100" type="submit">
              CRIAR CONTA
            </Button>
          </Form>
</Card.Footer>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          SAIR
        </Button>
      </div>
    </>
  )
}
