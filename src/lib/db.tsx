import firebase, { firestore } from '../lib/firebase';

type User = {
    createdAt: Date,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    name: string,
    photoUrl: string,
    spins: number,
    redeemedCodes: [],
    uid: string,
}

type Code = {
    name: string,
    spins: number,
}

type Props = {
    spins?: number,
}

export async function updateRedeemedCodes(uid: string, redeemedCode: Code) {
    try {
        firestore
        .collection('users')
        .doc(uid)
        .collection('redeemedCodes')
        .add({
            ...redeemedCode,
            redeemedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    } catch (err) {
        console.error(err);
    }
}

export async function updateSpins(uid: string, spins: number) {
    try {
        firestore
        .collection('users')
        .doc(uid)
        .update({
            spins,
        })
    } catch (err) {
        console.error(err);
    }
}

export async function saveLegend(uid: string, legend) {

    return firestore
        .collection('users')
        .doc(uid)
        .collection('legends')
        .add(legend)
}

export async function getRedeemedCodes(uid: string) {
    let redeemedCodes = [];

    try {
        const userCollection = firestore.collection('users')
        const userDoc = userCollection.doc(uid)
        const redeemedCodesCollection = await userDoc.collection('redeemedCodes').get();

        redeemedCodes = redeemedCodesCollection.docs.map(doc => doc.data());
        
    } catch (err) {
        console.error(err)
    }

    return redeemedCodes;
}