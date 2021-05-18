import firebase, { firestore } from '../lib/firebase';

type User = {
    name: string,
    email: string,
    uid: string,
}

type Code = {
    name: string,
    spins: number,
}

export async function createUser(user: User) {
    
}

export async function updateRedeemedCodes(uid: string, redeemedCode: Code) {
    try {
        await firestore
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
        await firestore
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
    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('legends')
        .doc(legend.name)
        .set(legend)
    } catch (err) {
        console.error(err)
    }
}

export async function updateLegendUnities(uid: string, { name, unities }) {
    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('legends')
        .doc(name)
        .update({
            unities,
        })
    } catch (err) {
        console.error(err)
    }  
}

export async function getRedeemedCodes(uid: string) {
    let redeemedCodes = [];

    try {
        const userCollection = firestore.collection('users')
        const userDoc = userCollection.doc(uid)
        const redeemedCodesCollection = await userDoc.collection('redeemedCodes').get();

        redeemedCodes = redeemedCodesCollection.docs.map(doc => doc.data());
        
    } catch (err) {
        console.error(err.message)
    }

    return redeemedCodes;
}