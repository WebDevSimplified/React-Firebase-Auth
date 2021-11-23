import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';
// import Pix from "./Pix";

import logo from '../image/logo.png';

const Pix = require("./Pix");
const QRCode = require('qrcode.react');



export default function GerarPix() {

  //logout incio 

async function handleLogout() {
  setError("Algo deu errado")

  try {
    await logout()
    history.push("/Login")
  } catch {
    setError("Failed to log out")
  }

}
//Logout fim 
  const [error, setError] = useState('');
  const [chave, setChave] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');


  const { logout } = useAuth();
  const history = useHistory();


  const user = firebase.auth().currentUser;
  const clientsRef = firebase.database().ref();


  
  // Recuperara dados do realtime database 

  async function handleCreat() {
    await clientsRef.child("clients/").child(user?.uid).get().then((snapshot) => {
      const dataClient = [];
      const data = snapshot.val();
      for (let id in data) {
        dataClient.push(id, data);


        const dado = dataClient.map(dados =>
          data.name,
          data.authorId,
          data.city,
          data.chave

        )
      };
      setChave(data.chave);
      setName(data.name);
      setCity(data.city);
    });
  }
  // fim de recuperar data

  // gerar pix  QR-Code
  const pix = new Pix(
    chave,
    "mensagem do pagamento",
    name,
    city,
    "TXID",
    55.50 // valor.toFixed(2).replace(',', '.')
  );


  const  payload =  pix.getPayload();

  // fim do gerar pix

  handleCreat()


  return (
    <>
      <Card className="text-light shadow  bg-secondary rounded mb-2">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>

          <img src={logo} alt="Gera pix" className="card-img-top mx-auto mb-4" />
          <h4 className="text-center mb-4">LER QRCode</h4>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="text-center">
          <p>{name}</p>

            <QRCode
              value={payload}
              size={300}
              level={"H"}
            />
          
          <Button className="mr-03" onClick={() => navigator.clipboard.writeText(payload)}>
            Copie o QRCode
          </Button>
</div>

        </Card.Body>
      </Card>

      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        
        <div className="user-info text-center mb-4">
        <Form onSubmit="#">
            <Form.Group className="mb-4 mt-4"id="chave">
              <Form.Label className="mb-0">Chave PIX</Form.Label>
              <Form.Control type="number" name="Valor"required placeholder="R$ 0.00" 
              />
              <small  className="form-text text-muted">R$ 0.00 Digite o valor do PIX </small>
            </Form.Group>
            <Button className="w-100" type="submit">
              CRIAR QR-CODE
            </Button>
          </Form>
        </div>
        <div className="pl-3 pr-3 row justify-content-between">
          <Link className="btn btn-primary btn-sm" to="/UpData">Atualizar chave</Link>

          <Link to="/update-profile" className="btn btn-primary btn-sm mt-8">
            Atualizar senha
          </Link>
        </div>

      </Card.Footer>

    </>
  )
}