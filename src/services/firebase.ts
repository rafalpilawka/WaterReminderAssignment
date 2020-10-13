import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcCBNCrkAmTuWDeXRqnzrvWZjYCc7jqzk",
  authDomain: "dirnkaglassremminder.firebaseapp.com",
  databaseURL: "https://dirnkaglassremminder.firebaseio.com",
  projectId: "dirnkaglassremminder",
  storageBucket: "dirnkaglassremminder.appspot.com",
  messagingSenderId: "744420695494",
  appId: "1:744420695494:web:980bebec9bdd6e549b66c7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
