import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from "firebase"

import logo from '../image/logo.svg'
import googleIconImg from '../image/google-icon.svg';


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { user, signup} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
 


  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas não combinam")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Erro ao criar a conta - Tente novamente")
    }

    setLoading(false)
  }
//Login google incio
  async function handLoginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
   
    // ...
    history.push("/")
  }).catch((error) => {
    setError("Algo deu errado")
    console.log();
  });

// login google fim 
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <Card.Body>
    
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h3 className="text-center mb-4 font-weight-bold">CRIAR CONTA</h3>
          <p className="text-center">Cria sua conta, é grátis!</p>
            <button onClick={handLoginGoogle}  className="w-100 mt-4 btn btn-primary btn-lg btn btn-danger" >
            <img className="pr-4" src={googleIconImg} alt="Logo do Google" />
             Crie com o Google
          </button>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 mt-4"id="email">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Digite seu email"/>
            </Form.Group>
            <Form.Group className="mb-4" id="password">
              <Form.Label className="mb-0">Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required placeholder="Digite sua senha"/>
            </Form.Group>
            <Form.Group className="mb-4" id="password-confirm">
              <Form.Label className="mb-0">Confirme sua senha.</Form.Label>
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
