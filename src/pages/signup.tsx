import { FormEvent, useRef, useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout';

import { BiArrowBack, BiKey, BiUser } from 'react-icons/bi';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/pages/Signup.module.css';
import { createUser } from '../lib/db';
import { firestore } from '../lib/firebase';

export default function Signup() {

    const {
        loading,
        signInWithGoogle,
        signInWithFacebook,
        signUpWithEmail,
        signInWithEmail,
        sendEmailVerification,
        user,
        auth
    } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPassword = useRef(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    function formatUser(user) {
        const formattedUser = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
        }

        return formattedUser;
    }

    async function handleCreateUser() {
        const authUser = formatUser(auth.currentUser);
            
        try {
            await firestore
            .collection('users')
            .doc(authUser.uid)
            .set({
                ...authUser,
                spins: 0,
                // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch (err) {
            console.error(err);
        }

        setMessage('Your account has been successfully created!');
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        if (passwordRef.current.value !== confirmPassword.current.value) {
            return setError('Passwords do not match. Please retry.')
        }

        try {
            await signUpWithEmail(emailRef.current.value, passwordRef.current.value);

            await handleSendEmailVerification();

            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPassword.current.value = '';

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }

    async function handleSignUpWithGoogle() {
        try {
            await signInWithGoogle();
            await handleCreateUser();
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSignUpWithFacebook() {
        
    }

    async function handleSendEmailVerification() {
        try {
            await sendEmailVerification();

            setMessage(`An email verification has been sent to ${emailRef.current.value}`)
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleCreateUserIfEmailVerified() {
        await handleCreateUser();
    }

    useEffect(() => {
        let timeoutID: NodeJS.Timeout;

        timeoutID = setTimeout(() => {
            setError('')
            setMessage('')
        }, 6000)

        return () => clearTimeout(timeoutID);
    }, [message, error])

    useEffect(() => {
        if (user?.emailVerified) {
            handleCreateUserIfEmailVerified();
        }
    }, [user])

    return (
        <div>

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
                                type="button"
                                className={styles.googleButton}
                                onClick={handleSignUpWithGoogle}
                                disabled={loading}
                            >
                                <div>
                                    <AiFillGoogleCircle color="#dbdbdb" size={28} />
                                </div>
                                <span>Signup with Google</span>
                            </button>
                                
                            <button
                                type="button"
                                className={styles.facebookButton}
                                onClick={handleSignUpWithFacebook}
                                disabled={true}
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
        </div>
    );
}

