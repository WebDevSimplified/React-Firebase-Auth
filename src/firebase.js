import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  // ENTER YOUR APP'S FIREBASE CONFIG HERE
});

export const auth = app.auth()
export default app
