import { FormEvent, useRef, useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout';

import { BiArrowBack, BiKey, BiUser } from 'react-icons/bi';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';

import firebase, { firestore } from '../lib/firebase';

import styles from '../styles/pages/Signup.module.css';

export default function Signup() {

    const { loading, signInWithGoogle, signUpWithEmail, signInWithEmail, sendEmailVerification, user, auth } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPassword = useRef(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        if (passwordRef.current.value !== confirmPassword.current.value) {
            return setError('Passwords do not match. Please retry.')
        }

        function formatUser(user) {
            const formattedUser = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                uid: user.uid,
            }

            return formattedUser;
        }

        try {
            await signUpWithEmail(emailRef.current.value, passwordRef.current.value);
            
            await signInWithEmail(emailRef.current.value, passwordRef.current.value);

            await handleSendEmailVerification();

            const authUser = formatUser(auth.currentUser);
            
            const usersCollection = firestore.collection('users');
            const userDoc = usersCollection.doc(authUser.uid);
            await userDoc.set({
                ...authUser,
                spins: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => console.log('Success in Saving User.'))
            .catch(err => console.error(err))

            setMessage('Your account has been successfully created!');

            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPassword.current.value = '';

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }

    async function handleSendEmailVerification() {
        try {
            await sendEmailVerification();

            setMessage(`An email verification has been sent to ${emailRef.current.value}`)
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        let timeoutID: NodeJS.Timeout;

        timeoutID = setTimeout(() => {
            setError('')
            setMessage('')
        }, 6000)

        return () => clearTimeout(timeoutID);
    }, [message, error])

    return (
        <Layout>

            <Head>
                <title>Signup | Googas RPG</title>
            </Head>

            <div className={styles.signupContainer}>

                <header>
                    <Link href="/">
                        <button>
                            <BiArrowBack size={30} />
                        </button>
                    </Link>
                </header>

                <section>
                    <form onSubmit={handleFormSubmit}>
                        <h2>
                            Sign Up
                        </h2>

                        { error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        ) }

                        { message && (
                            <div className={styles.successMessage}>
                                {message}
                            </div>
                        ) }

                        <div>
                            <div className={styles.username}>
                                <BiUser color="#dbdbdb" size={28} />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    ref={emailRef}
                                />
                            </div>
                            <div className={styles.password}>
                                <BiKey color="#dbdbdb" size={28} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                />
                            </div>
                            <div className={styles.confirmPassword}>
                                <BiKey color="#dbdbdb" size={28} />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={confirmPassword}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.signUpButton}
                                disabled={loading}
                            >
                                Sign Up
                            </button>

                            <div className={styles.login}>
                                <Link href="/login">
                                    <a>Already have an account? Login</a>
                                </Link>
                            </div>
                        </div>
                        
                        <div className={styles.separator}>
                            <span>or</span>
                        </div>

                        <div className={styles.providers}>
                            <button
                                className={styles.googleButton}
                                onClick={signInWithGoogle}
                                disabled={loading}
                            >
                                <div>
                                    <AiFillGoogleCircle color="#dbdbdb" size={28} />
                                </div>
                                <span>Signup with Google</span>
                            </button>
                                
                            <button
                                className={styles.facebookButton}
                                disabled={loading}
                            >
                                <div>
                                    <AiFillFacebook color="#dbdbdb" size={28} />
                                </div>
                                <span>Signup with Facebook</span>
                            </button>
                        </div>
                    </form>
                </section>

                <section>
                    <img src="/assets/lighthouse.svg" alt="Lighthouse"/>
                </section>

                </div>
        </Layout>
    );
}