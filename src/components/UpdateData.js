import React, { useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from 'firebase'
import 'firebase/database'


import logo from '../image/logo.png'


export default function UpData() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setError("")

    try {
      await logout()
      setLoading(false)
      history.push("/Login")
    } catch {
      setError("Falha para fazer logout")
    }

  }
  // redirecionar sem login l

  const user = firebase.auth().currentUser;
  //Atualizar  database realtime 

  const [newChave, setNewChave] = useState('')
  const [newCity, setNewcity] = useState('')
  const [newName, setNewName] = useState('')



  async function handUpdateClient(event) {
    event.preventDefault()

    if (newChave.trim() === '') {
      return
    }
    if (newName.trim() === '') {
      return
    }
    if (newCity.trim() === '') {
      return
    }



    const clientRef = firebase.database().ref(`clients/${user?.uid}/key`);

    const firebaseClient = await clientRef.push({
      name: newName,
      authorId: currentUser?.uid,
      city: newCity,
      chave: newChave,
    })
    history.push("/Profile")
console.log(newName)
  }
  // fim do Atualizar database

  return (
    <>
      <Card className="text-light shadow bg-secondary rounded p-3">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>
          <img src={logo} alt="Gera pix" className="card-img-top mx-auto d-block " />
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser?.uid.length > 0 && <div className="user-info text-center">
            <img className="rounded-circle  mb-4  text-center" src={currentUser.photoURL} alt={currentUser.displayName} />
            <p className="font-weight-bold mb-4">{currentUser.displayName}</p>

          </div>}
        </Card.Body>
      </Card>
      <Card.Footer className="shadow mt-2 p-3 bg-dark text-white rounded">
        <h4 className="text-center mb-4">ATUALIZE SEU DADOS PIX</h4>
        <p className="text-center"> verifique se seus dados já estão cadastrados no seu banco para gerar o PIX</p>
        <Form onSubmit={handUpdateClient}>
          <Form.Group className="mb-4" id="chave">
            <Form.Label className="mb-0">Chave PIX</Form.Label>
            <Form.Control className="form-control-sm" type="text" name="newChave" required placeholder="chave"
              onChange={(event) => setNewChave(event.target.value)}
            />
            <small className="form-text text-muted">Chave PIX já cadastrada na instituição financeira (Telefone, E-mail, CPF, CNPJ ou chave Aleatória) </small>
          </Form.Group>
          <Form.Group className="mb-4" id="name">
            <Form.Label className="mb-0">Nome do beneficiário</Form.Label>
            <Form.Control className="form-control-sm" type="text" name="name" required placeholder="Nome beneficiário"
              onChange={(event) => setNewName(event.target.value)}
            />
            <small className="form-text text-muted">Nome do beneficiário (até 25 letras). </small>
          </Form.Group>
          <Form.Group className="mb-4 " id="city">
            <Form.Label className="mb-0">Digite a cidade</Form.Label>
            <Form.Control className="form-control-sm" type="text" name="city" required placeholder="Digite a cidade"
              onChange={(event) => setNewcity(event.target.value)}
            />
            <small className="mt-0 form-text text-muted">Cidade do beneficiário ou da transação (até 15 letras) </small>
          </Form.Group>


          <div className="text-center">
            <Button disabled={loading} className="btn w-100 mb-4 mt-8" type="submit">Atualizar chave</Button>


          </div>
        </Form>
        <div className="pl-3 pr-3 row justify-content-between">
          <Link to="/update-profile" > Atualizar senha </Link>
          <Link to="/">Cancelar</Link>
        </div>
      </Card.Footer>
    

    </>
  )
}
