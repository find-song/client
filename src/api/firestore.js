import firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: process.env.apiKey,
  authDomain: 'findsong.firebaseapp.com',
  databaseURL: 'https://findsong.firebaseio.com',
  projectId: 'findsong',
  storageBucket: 'findsong.appspot.com',
  messagingSenderId: '53987331938'
}
firebase.initializeApp(config)
const db = firebase.firestore()

export {
  db
}
