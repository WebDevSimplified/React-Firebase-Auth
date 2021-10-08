import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

import logo from '../image/logo.svg'

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
      setMessage("Verifique sua conta de e-mail e recupere sua senha")
    } catch {
      setError("Falha na recuperação de senha")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4">RECUPERAR A SENHA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Digite seu e-mail"/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              RECUPERAR 
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/login">ENTRAR NA CONTA</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Crie uma conta! <Link to="/signup">CRIAR </Link>
      </div>
    </>
  )
}
