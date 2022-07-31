import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDUWQtzKCOx4KmX1jwr906iIxXRsWYdiew",
  authDomain: "number-59440.firebaseapp.com",
  databaseURL: "https://number-59440-default-rtdb.firebaseio.com/",
  projectId: "number-59440",
  storageBucket: "number-59440.appspot.com",
  messagingSenderId: "660427551486",
  appId: "1:660427551486:web:6cdfd5f3fd21453805ebaf",
  measurementId: "G-RNS3WHY858"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.database();
const numbersRef = db.ref('numbers')
const auth = firebase.auth();

export { auth, db, numbersRef };