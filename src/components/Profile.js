import React, { useState, useEffect } from "react"
import { Card, Button, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import { Link, useHistory  } from "react-router-dom"

import "firebase/database"
import firebase from 'firebase'

import logo from '../image/logo.svg'


export default function Profile() {
  const [ error, setError] = useState('')
  const [ chave, setChave ] = useState('')
  const [city, setCity ] = useState('')
  const [name, setName] = useState('')
  const { logout } = useAuth('')
  const history = useHistory()
 

const user = firebase.auth().currentUser;
if (user !== null) {

  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const uid = user.uid;
  
}

  



  //lendo banco de dados Firebase 


  
     useEffect(() => {
      const clientRef = firebase.database().ref('clients/');
      clientRef.on('value', (snapshot) => {
        const databaseClient = snapshot.val()
        // const firebaseClient: FirebaseClient = databaseClient.clientsRef ??{}
        const parseDatabaseClient = Object.entries(databaseClient).map(([key, value]) => {
          return {
            id: key,
            authorId: value.authorId,
            chave: value.chave,
            city: value.city,
            name: value.name,
          }
        })

        setName(databaseClient.name)
        setCity(databaseClient.city)
        setChave(databaseClient.chave)
  console.log (Object.entries(parseDatabaseClient))
  
});

  },[chave, user.uid])



  async function handleLogout() {
    setError("Algo deu errado")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
    
  }
 
  
  return (
    <>
      <Card className="text-light shadow p-3 mb-5 bg-secondary rounded p-3 mb-2">
    
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mb-4 font-weight-bold text-black">CONTA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="user-info text-center mb-4 ">
                <img className="rounded-circle text-center" src={user.photoURL} alt={user.displayName} />
                <p className="font-weight-bold mb-4">{user.displayName}</p>
                
              </div>
          
        </Card.Body>
      </Card>
      
      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <h2 className="text-center d-block mb-4">SUA CONTA PIX</h2>
        <p className="text-center"> Dados da sua conta, chave, nome e cidade.</p>
        <p>Nome: beneficiário {setName}</p>
        <p>Chave: {setChave}</p>
        <p>Cidade: {setCity}</p>
      
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
