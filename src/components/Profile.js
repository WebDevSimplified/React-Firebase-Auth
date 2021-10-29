import React, { useState} from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "firebase/database";
import firebase from 'firebase';

import logo from '../image/logo.png';


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
    history.push("/Login")
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
  
   
  });

  // fim de recuperar data

  

  return (
    <>
      <Card className="text-light shadow p-3 mb-5 bg-secondary rounded p-3 mb-2">

        <Card.Body>
          <img src={logo} alt="Gera pix" className="card-img-top mx-auto d-block mb-4" />
          <h4 className="text-center mb-4 text-black">SUA CONTA</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>Os dados que aparecem aqui são os dados que você cadastrou no seu perfil.
          </p>
    


        </Card.Body>
      </Card>

      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
      <div className="user-info text-center mb-4 ">
            <img className="rounded-circle text-center" src={user.photoURL} alt={user.displayName} />
            <p className="font-weight-bold mb-4">{user.displayName}</p>

          </div>
        <h4 className="text-center border border-info mb-4 mp-4">SUA CONTA PIX</h4>
        <p className=" mb-0"> NOME:</p>
        <p className="text-uppercase border font-italic font-weight-light border-info"> {name}</p>
        <p className=" mb-0"> CIDADE:</p>
        <p className="text-uppercase border font-italic font-weight-light border-info"> {city}</p>
        <p className="mb-0"> CHAVE PIX:</p>
        <p className="text-uppercase border font-italic font-weight-light border-info"> {chave}</p>
        <Link className="btn btn-primary btn-sm" to="/UpData">Editar</Link>
        

      </Card.Footer>

      <div className="w-100 text-center mt-2">
        <Link to="/update-profile" className="btn btn-primary mt-3">
          Atualizar senha
        </Link>
        <Button variant="link" onClick={handleLogout}>
          SAIR
        </Button>
      </div>
    </>
  )
}