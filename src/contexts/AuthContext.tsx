import { createContext, useContext, useEffect, useState } from "react";

import firebase, { auth } from '../lib/firebase';

import Cookie from 'js-cookie';

export const AuthContext = createContext({} as AuthContextProps);

type User = {
    name: string,
    email: string,
    photoUrl: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    uid: string,
}

interface AuthContextProps {
    user: User;
    loading: boolean;
    signInWithGoogle: () => any;
    signInWithFacebook: () => any;
    signInWithEmail: (email: string, password: string) => any;
    signInAnonymously: () => any;
    signOut: () => any;
    sendEmailVerification: () => any;
    resetPassword: (email: string) => any;
    signUpWithEmail: (email: string, password: string) => any;
    auth: firebase.auth.Auth;
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signInAnonymously() {
        return auth.signInAnonymously()
    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        return auth.signInWithPopup(provider)
    }

    function signInWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();

        return auth.signInWithPopup(provider)
    }

    function signInWithEmail(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    async function signUpWithEmail(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function sendEmailVerification() {
        return auth.currentUser.sendEmailVerification()
    }

    function resetPassword(email: string) {

        return auth.sendPasswordResetEmail(email)
    }

    function signOut() {
        return auth.signOut()
    }

    function formatUser(user: firebase.User) {
        if (!user) return null;

        const formattedUser: User = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
        }

        return formattedUser;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

            setLoading(false);

            if (user) {
                const formattedUser = formatUser(user);
                setUser(formattedUser);
                return;
            }

            setUser(null);
        });

        const tokenUnsubscribe = auth.onIdTokenChanged(async (user) => {
            if (!user) {
                Cookie.set('token', null);
                Cookie.set('uid', null);
                Cookie.set('emailVerified', String(false));
                return;
            }

            const token = await user.getIdToken();

            Cookie.set('token', token);
            Cookie.set('uid', user.uid);
            Cookie.set('emailVerified', String(user.emailVerified));
        })

        return () => {
            unsubscribe();
            tokenUnsubscribe();
        };
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInWithGoogle,
                signInWithFacebook,
                signInWithEmail,
                signInAnonymously,
                signOut,
                sendEmailVerification,
                resetPassword,
                signUpWithEmail,
                auth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}