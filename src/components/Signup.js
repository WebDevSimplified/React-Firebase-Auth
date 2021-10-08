import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import logo from '../image/logo.svg'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4">CRIAR CONTA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4"id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Digite seu email"/>
            </Form.Group>
            <Form.Group className="mb-4" id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required placeholder="Digite sua senha"/>
            </Form.Group>
            <Form.Group className="mb-4" id="password-confirm">
              <Form.Label>Confirme sua senha.</Form.Label>
              <Form.Control className="mb-4"type="password" ref={passwordConfirmRef} required placeholder="Confirme sua senha"/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              CRIAR CONTA
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Você já tem uma conta? <Link to="/login">Fazer login</Link>
      </div>
    </>
  )
}
