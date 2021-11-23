import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';


import logo from '../image/logo.png';

const Pix = require("./Pix");
const QRCode = require('qrcode.react');




export default function Profile() {

  const [error, setError] = useState('');
  const [chave, setChave] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');


  const { logout } = useAuth();
  const history = useHistory();


  const user = firebase.auth().currentUser;
  const clientsRef = firebase.database().ref();



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
  // Recuperara dados do realtime database 

  async function GetData() {
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


  GetData();

  // fim de recuperar data

  // gerar pix  

  const pix = new Pix(
    chave,
    "DESCRICAO_PAGAMENTO",
    name,
    city,
    "TXID",
    5.50
  );



  const  payload =  pix.getPayload();

  // fim do gerar pix




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
          <img className="rounded-circle text-center" src={user.photoURL} alt={user.displayName} />
          <p className="font-weight-bold mb-4">{user.displayName}</p>

        </div>
        <div className="user-info">
          <h4 className="text-center mb-4 mp-4">SUA CONTA PIX</h4>
          <p className=" mb-0"> NOME:</p>
          <p className="text-decoration-underline font-italic border-bottom "> {name}}</p>
          <p className=" mb-0"> CIDADE:</p>
          <p className="text-decoration-underline font-italic border-bottom "> {city}</p>
          <p className="mb-0"> CHAVE PIX:</p>
          <p className="text-decoration-underline font-italic border-bottom "> {chave}</p>
        </div>
        <div className="pl-3 pr-3 row justify-content-between">
          <Link className="btn btn-primary btn-sm" to="/UpData">Atualizar chave</Link>

          <Link to="/update-profile" className="btn btn-primary btn-sm ">
            Atualizar senha
          </Link>
        </div>

      </Card.Footer>

    </>
  )
}