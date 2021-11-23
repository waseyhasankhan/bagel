// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCObAlw45eHEm5JR4znwqmSo1isxWDDDfo",
  authDomain: "bagel-c8a6d.firebaseapp.com",
  projectId: "bagel-c8a6d",
  storageBucket: "bagel-c8a6d.appspot.com",
  messagingSenderId: "723473890594",
  appId: "1:723473890594:web:148c662699f72cc566b97b",
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const dbMenuAdd = db.collection("menuItems");
export const dbOrders = db.collection("orderItems");
// const app = newLocal;
// console.log(app);
// export const db = firebase.firestore();
// export const dbMenuAdd = db.collection("menuItems");
