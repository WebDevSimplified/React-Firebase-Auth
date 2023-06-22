import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_FIREBASE_APP_ID ,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
 
});

// Initialize Firebase

export const firestore = app.firestore()

export const db = {
  tasks: firestore.collection("tasks"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  formatDate: date => firebase.firestore.Timestamp.fromDate(new Date(date)),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const auth = app.auth()
export const storage = firebase.storage()

export default app