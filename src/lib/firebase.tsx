import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-c8Uh7B5xqEau37ObHcz26MpXQjsFVJM",
    authDomain: "mythic-emissary-298019.firebaseapp.com",
    projectId: "mythic-emissary-298019",
    storageBucket: "mythic-emissary-298019.appspot.com",
    messagingSenderId: "337149164742",
    appId: "1:337149164742:web:787aed9e916faee6e82bc7",
    measurementId: "G-F364FMYVK9"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();