import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "firebase-adminsdk-xc3b1@mythic-emissary-298019.iam.gserviceaccount.com"
        })
    } catch (err) {
        console.log('Firebase admin initialization error', err.stack)
    }
  
}

export default admin.firestore();