import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXWj5M9W_2AdCgOaGChBB00HZMq7dWjTs",
  authDomain: "book-n-chat.firebaseapp.com",
  databaseURL: "https://book-n-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-n-chat",
  storageBucket: "book-n-chat.appspot.com",
  messagingSenderId: "320577125176",
  appId: "1:320577125176:web:c696df768185bb774e9fcd",
  measurementId: "G-MNM0PDDJ4S"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default firebase;