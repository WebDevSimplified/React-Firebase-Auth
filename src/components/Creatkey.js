import React, { useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from 'firebase'
import 'firebase/database'


import logo from '../image/logo.svg'

export default function Dashboard() {
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  
  

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Falha para fazer logout")
    }
  }
  // redirecionar sem login l


  //criar database realtime 
  
  const [newChave, setNewChave] = useState('')
  const [newCity, setNewcity] = useState('')
  const [newName, setNewName] = useState('')
  
  

async function handCreatClient(event){
  event.preventDefault()

  if (newChave.trim()===''){
    return
  }
  if (newName.trim()===''){
    return
  }
  if (newCity.trim()===''){
    return
  }
  
  
  //  console.log(newName, newCity, newChave)

  const clientRef = firebase.database().ref('clients').child(currentUser?.uid);

  const firebaseClient = await clientRef.set({
    name: newName,
    authorId: currentUser?.uid,
    city: newCity,
    chave: newChave,
  })
  history.push(`/profile`)

}
// fim do criar database

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
      <Form onSubmit={handCreatClient}>
            <Form.Group className="mb-4 mt-4"id="chave">
              <Form.Label className="mb-0">Chave PIX</Form.Label>
              <Form.Control type="text" name="newChave"required placeholder="Digite sua chave PIX" 
              onChange={(event) => setNewChave(event.target.value)}
              />
              <small  className="form-text text-muted">PIX cadastrada (Telefone, E-mail, CPF, CNPJ ou chave Aleatória) </small>
            </Form.Group>
            <Form.Group className="mb-4" id="name">
              <Form.Label className="mb-0">Nome do beneficiário</Form.Label>
              <Form.Control type="text" name="name" required placeholder="Nome beneficiário"
              onChange={(event) => setNewName(event.target.value)}
               />
              <small  className="form-text text-muted">Nome do beneficiário (até 25 letras). </small>
            </Form.Group>
            <Form.Group className="mb-4" id="city">
              <Form.Label className="mb-0">Digite a cidade</Form.Label>
              <Form.Control type="text" name="city"required placeholder="Digite a cidade" 
              onChange={(event) => setNewcity(event.target.value)}
              />
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
