import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';


import logo from '../image/logo.png';
import { childContextTypes } from "qrcode.react";
import Pix from "./Pix";

// const Pix = require("./Pix");
const QRCode = require('qrcode.react');



export default function GenerationQRCode() {

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

    const clientList =  await clientsRef.child(`clients/${user.uid}/PixCreated/`).get();
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

      }}
    );
    setMenseger(resPix[0].menseger);
    setTextId(resPix[0].textId);
    setValorPix(resPix[0].valorPix);

console.log(menseger);
    // get chave do cliente
    const chaveRes =  await chaveRef.child(`clients/${user.uid}/key/`).get();
    
    // console.log(chaveRes.val());
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
    console.log(name);
  };

  GetData();
  // fim de recuperar data


  // gerar qrcode Payload
  const pix = new Pix(
    chave,
    menseger,
    name,
    city,
    textId,
    valorPix
  );
console.log(pix);
  const payload = pix.getPayload();

  return (
    <>
      <Card className="text-light shadow  bg-secondary rounded mb-2">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>

        </div>

        <Card.Body>
          <img src={logo} alt="Gera pix" className="img-fluid " />

          <h4 className="text-center mb-4">LER QRCode</h4>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="text-center">
            <p><span>{menseger}</span></p>
            <p><span>{ chave}</span></p>

            <QRCode value={payload} size={300} level={"H"} />

            <Button className="mr-03" onClick={() => navigator.clipboard.writeText(payload)}>
              Copie o QRCode
            </Button>
          </div>

        </Card.Body>

      </Card>

      <Card.Footer className="shadow p-3 bg-dark text-white rounded">

        <div className="user-info text-center ">

        </div>
        <div className="pl-3 pr-3 row justify-content-between">
          <Link className="btn btn-primary btn-sm" to="/UpData">Atualizar chave</Link>

          <Link to="/QRCode" className="btn btn-primary btn-sm">
            Novo QRCode
          </Link>
        </div>

      </Card.Footer>

    </>
  )
}