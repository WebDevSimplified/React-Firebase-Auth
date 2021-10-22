
import React, { useState, useEffect } from "react"
import { Card, Button, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import { Link, useHistory  } from "react-router-dom"

import "firebase/database"
import firebase from 'firebase'


  //const [loading, setLoading] = useState('')
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

  


// Recuperara dados do realtime database 


const clientsRef = firebase.database().ref();

clientsRef.child("clients/").child(user?.uid).get().then((snapshot) => {
  const dataClient = [];
  const data = snapshot.val();
  for(let key in data) {
  dataClient.push([data]);
  
  setChave(chave);
  setName(name);
  setCity(city);
};
console.log(dataClient)
});