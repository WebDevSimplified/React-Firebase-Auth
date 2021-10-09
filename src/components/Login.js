import React, { useRef, useState,img} from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import logo from '../image/logo.svg'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  // const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    // e.preventDefault()

    // try {
    //   setError("")
    //   setLoading(true)
    //   // await login(emailRef.current.value, passwordRef.current.value)
    //   history.push("/")
    // } catch {
    //   setError("Failed to log in")
    // }

    // setLoading(false)
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4 mt-4">ENTRAR NA CONTA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mt-4">E-mail</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Digite seu e-mail" />
            </Form.Group>
            <Form.Group  className="mt-4" id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control className="form-control Default input" type="password" ref={passwordRef} required placeholder="Digite sua senha!" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Entrar
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Crie uma conta! <Link to="/signup">Criar conta</Link>
      </div>
    </>
  )
}
