import firebase from 'firebase';
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: process.env.firebaseKey,
  authDomain: "theka-cocktails.firebaseapp.com",
  databaseURL: "https://theka-cocktails.firebaseio.com",
  projectId: "theka-cocktails",
  storageBucket: "theka-cocktails.appspot.com",
  messagingSenderId: "920015725070"
};
const firebaseApp = firebase.initializeApp(config);
// firebaseApp.firestore().settings({ timestampsInSnapshots : true })

// export the firestore db
export default firebaseApp.firestore();