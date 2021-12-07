import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';


import logo from '../image/logo.png';
import { childContextTypes } from "qrcode.react";
import Pix from "./Pix";


const QRCode = require('qrcode.react');



export default function GenerationQRCode() {

  const [error, setError] = useState('');
  const [chave, setChave] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [valorPix, setValorPix] = useState('');
  const [textId, setTextId] = useState('');
  const [menseger, setMenseger] = useState('');

  const { logout } = useAuth();
  const history = useHistory();

  const user = firebase.auth().currentUser;



  // Recuperara dados do realtime database 
  const clientsRef = firebase.database().ref();
  const chaveRef = firebase.database().ref();
  async function GetData() {

    const clientList = await clientsRef.child(`clients/${user.uid}/PixCreated/`).get();
    const dataClient = [];
    const data = clientList.val();
    for (let id in data) {
      dataClient.push(id, data);
    };

    const resPix = Object.entries(clientList.val() ?? {}).map(([key, value]) => {
      return {
        'menseger': value.menseger,
        'textId': value.textId,
        'valorPix': value.valorPix

      }
    }
    );
    setMenseger(resPix[0].menseger);
    setTextId(resPix[0].textId);
    setValorPix(resPix[0].valorPix);

    // get chave do cliente
    const chaveRes = await chaveRef.child(`clients/${user.uid}/key/`).get();

    const dataChave = [];
    const dataRes = chaveRes.val();
    for (let id in dataRes) {
      dataChave.push(id, dataRes);
    };

    const resChave = Object.entries((chaveRes.val()) ?? {}).map(([key, value]) => {
      return {
        'chave': value.chave,
        'city': value.city,
        'name': value.name
      }
    }
    );
    setChave(resChave[0].chave);
    setCity(resChave[0].city);
    setName(resChave[0].name);


  };

  GetData();
  // fim de recuperar data


  // gerar qrcode Payload
  const pix = new Pix(
    chave,
    menseger.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    city.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    textId.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    valorPix
  );

  const payload = pix.getPayload();
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

  return (
    <>
      <Card className="text-light shadow  bg-secondary rounded mb-2">
        
          <div className="pl-3 pr-3 row justify-content-between">
          <Link className="badge badge-secondary" to="/UpData">EDITAR CHAVE</Link>
          <Link to="/GerarValor" className="badge badge-secondary" >
            CRIAR NOVO PIX
          </Link>
          <Button className="badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
       

        <Card.Body>
          <img src={logo} alt="Gera pix" className="img-fluid " />

          {error && <Alert variant="danger">{error}</Alert>}
         
        </Card.Body>

      </Card>

      <Card.Footer className="shadow text-center bg-dark text-white rounded">
      <h4 className="text-center mb-4">LER QRCode</h4>

        <QRCode value={payload} size={280} className="mb-4 mr-3" />
        <Button className="mr-03 mt-4 " onClick={() => navigator.clipboard.writeText(payload)}>
           COPIE E ENVIE O CÓDIGO 
        </Button>
        

      </Card.Footer>

    </>
  )
}