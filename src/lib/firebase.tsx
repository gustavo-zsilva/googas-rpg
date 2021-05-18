import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDM0BWt4Xq2S3aZLihg09kD51CSnfBCApo",
    authDomain: "googas-rpg-prod.firebaseapp.com",
    projectId: "googas-rpg-prod",
    storageBucket: "googas-rpg-prod.appspot.com",
    messagingSenderId: "943763231511",
    appId: "1:943763231511:web:6fa5504d693dc161015d52",
    measurementId: "G-11YLGS0P8R"
}

firebase.auth.Auth.Persistence.LOCAL;

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();