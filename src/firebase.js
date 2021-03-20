import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCWFKmHXR8ryQKu9eOLws8tN3AFb6s2IuI",
  authDomain: "niroggyan-6de20.firebaseapp.com",
  projectId: "niroggyan-6de20",
  storageBucket: "niroggyan-6de20.appspot.com",
  messagingSenderId: "477773047041",
  appId: "1:477773047041:web:58f48e8a0aa96ff170e700",
  measurementId: "G-NMTH0YQH66"
})

export const auth = app.auth()
export default app
