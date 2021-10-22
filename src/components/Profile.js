import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';

import logo from '../image/logo.svg';


export default function Profile() {
  
  const [error, setError] = useState('');
  const [chave, setChave] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const { logout } = useAuth()
  const history = useHistory();


  const user = firebase.auth().currentUser;

//logout incio 

async function handleLogout() {
  setError("Algo deu errado")

  try {
    await logout()
    history.push("/login")
  } catch {
    setError("Failed to log out")
  }

}
//Logout fim 


  // Recuperara dados do realtime database 

  const clientsRef = firebase.database().ref();

  clientsRef.child("clients/").child(user?.uid).get().then((snapshot) => {
    const dataClient = [];
    const data = snapshot.val();
    for (let id in data) {
      dataClient.push(id, data);




    };
    const dado = dataClient.map(dados =>
      data.name,
      data.authorId,
      data.city,
      data.chave
    )
    setChave(data.chave);
    setName(data.name);
    setCity(data.city);
  
    // console.log(dado)
  });


  // fim de recuperar data

  

  return (
    <>
      <Card className="text-light shadow p-3 mb-5 bg-secondary rounded p-3 mb-2">

        <Card.Body>
          <img src={logo} alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h4 className="text-center mb-4 text-black">CONTA</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="user-info text-center mb-4 ">
            <img className="rounded-circle text-center" src={user.photoURL} alt={user.displayName} />
            <p className="font-weight-bold mb-4">{user.displayName}</p>

          </div>


        </Card.Body>
      </Card>

      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <h4 className="text-center border border-info mb-4 mp-4">SUA CONTA PIX</h4>
        <p className="text-uppercase font-weight-normal"> Nome: {name}</p>
        <p className="text-uppercase font-weight-normal"> Cidade: {city}</p>
        <p className="text-uppercase font-weight-normal"> ChavePix: {chave}</p>
        

      </Card.Footer>

      <div className="w-100 text-center mt-2">
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Atualizar dados
        </Link>
        <Button variant="link" onClick={handleLogout}>
          SAIR
        </Button>
      </div>
    </>
  )
}