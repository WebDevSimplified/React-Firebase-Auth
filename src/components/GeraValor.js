import React, { useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from 'firebase'
import 'firebase/database'

import logo from '../image/logo.png'

export default function GerarValor() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [setLoading] = useState(false)

  const [newPix, setPix] = useState('')
  const [newTextId, setTextId] = useState(' ')
  const [newMenseger, setMenseger] = useState(' ')

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


  //Criar pix realtime 


  async function handCreatPix(event) {
    event.preventDefault()

    // if (newPix.trim() === '') {
    //   return
    // }
    // if (newTextId.trim() === '') {
    //   return
    // }
    // if (newMenseger.trim() === '') {
    //   return
    // }

    const firebaseClient = {
      valorPix: newPix,
      authorId: currentUser.uid,
      textId: newTextId,
      menseger: newMenseger,
      date: new Date().toLocaleString().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    };
    await firebase.database().ref(`clients/${currentUser?.uid}/PixCreated`).push(firebaseClient);
    history.push("/QRCode")
  };

  // fim do criar pix database
  return (
    <>
      <Card className="text-white  shadow  bg-secondary rounded mb-2">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>
          <div className="text-center">
            <img src={logo} alt="Gera pix" className="img-fluid " />
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
        </Card.Body>
      </Card>
      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <div className="user-info text-center mb-4">
          <Form>
            <Form.Group className="mb-4 mt-4" id="chave">
              <Form.Label className="mb-0">Valor da conta</Form.Label>
              <Form.Control type="tel" name="newPix" required placeholder="R$ 0.00"
                onChange={(event) => setPix(event.target.value)} />
              <small className="form-text text-muted">R$ 0.00 Digite o valor do PIX </small>
            </Form.Group>
            <Form.Control type="text" name="newTextId" required placeholder="Digite um Identificador da venda"
              onChange={(event) => setTextId(event.target.value)} />
            <small className="form-text text-right text-muted">Digite mensagem para o cliente </small>
            <Form.Control type="text" name="newMenseger" required placeholder="Mensagem para o cliente"
              onChange={(event) => setMenseger(event.target.value)} />
            <small className="form-text text-right text-muted">Digite um identificador da venda </small>
            <Button onClick={handCreatPix} className="w-100 mb-4 " type="submit">
              CRIAR QR-CODE
            </Button>
          </Form>
        </div>
        <div className="pl-3 pr-3 row justify-content-between mt-4">
          <Link className="btn btn-primary btn-sm" to="/UpData">Atualizar chave</Link>

          <Link to="/update-profile" className="btn btn-primary btn-sm mt-8">
            Atualizar senha
          </Link>
        </div>

      </Card.Footer>
    </>
  )
}
