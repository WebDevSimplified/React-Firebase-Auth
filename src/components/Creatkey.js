import React, {useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from 'firebase'
import 'firebase/database'


import logo from '../image/logo.png'

export default function Dashboard() {
  
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
  
  const firebaseClient = {
    name: newName,
    authorId: currentUser?.uid,
    city: newCity,
    chave: newChave,
  };

  // await firebase.database().ref(`clients/${currentUser?.uid}`).push(firebaseClient);
  await firebase.database().ref('clients/').child(currentUser?.uid).push(firebaseClient);

  
  history.push("/GerarValor")

}
// fim do criar database

  return (
    <>
      <Card className="text-white  shadow  bg-secondary rounded mb-2">
      <div className="text-right">
          <Button className="badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>

        </div>
        
        <Card.Body>
          <div>
            <img src={logo}alt="Gera pix"  className="card-img-top" /> 
          </div>
        
          <h6 className="text-center font-weight-bold ">CONTA</h6>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="user-info text-center ">
                <img className="rounded-circle text-center" src={currentUser.photoURL} alt={currentUser.displayName} />
                <p className="font-weight-bold mb-4">{currentUser.displayName}</p>
              <Link to="/update-profile" className="btn btn-primary btn-sm mt-8">
            Atualizar senha
          </Link>
          
              </div>
          
          
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
      
    </>
  )
}
