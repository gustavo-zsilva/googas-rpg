import { FormEvent, useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from "../components/Layout";

import { BiUser, BiKey, BiArrowBack } from 'react-icons/bi';
import { AiFillFacebook, AiFillGoogleCircle } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/pages/Login.module.css';

export default function Login() {

    const { signInWithGoogle, signInWithEmail, signInAnonymously, loading, resetPassword, signInWithFacebook } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            await signInWithEmail(emailRef.current.value, passwordRef.current.value);

            router.push('/')
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleSendResetPasswordEmail() {
        try {
            await resetPassword(emailRef.current.value);

            setMessage(`A password reset email has been sent to ${emailRef.current.value}`);
        } catch (err) {
            setError(err.message);
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
        <div>
            <Head>
                <title>Login | Googas RPG</title>
            </Head>
            <div className={styles.loginContainer}>

                <header>
                    <Link href="/" legacyBehavior>
                        <button>
                            <BiArrowBack size={30} />
                        </button>
                    </Link>
                </header>

                <section>
                    <form onSubmit={handleFormSubmit}>
                        <h2>
                            🔥 Bem-vindo ao Googas RPG 🔥
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

                            <button onClick={handleSendResetPasswordEmail}>
                                <a>Forgot password?</a>
                            </button>

                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={loading}
                            >
                                Login
                            </button>

                            <div className={styles.signUp}>
                                <Link href="/signup">
                                    Don't have an account? Sign Up
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
                                onClick={signInWithGoogle}
                                disabled={loading}
                            >
                                <div>
                                    <AiFillGoogleCircle color="#dbdbdb" size={28} />
                                </div>
                                <span>Login with Google</span>
                            </button>
                                
                            <button
                                type="button"
                                className={styles.facebookButton}
                                onClick={signInWithFacebook}
                                disabled={true}
                            >
                                <div>
                                    <AiFillFacebook color="#dbdbdb" size={28} />
                                </div>
                                <span>Login with Facebook</span>
                            </button>

                            <button
                                type="button"
                                className={styles.anonymousButton}
                                onClick={signInAnonymously}
                                disabled={true}
                            >
                                <div>
                                    <BiUser color="#EFEFEF" size={28} />
                                </div>
                                <span>Login Anonymously</span>
                            </button>
                        </div>
                    </form>
                </section>

                <section>
                    <img src="/assets/logo.png" alt="Lighthouse"/>
                </section>
                
            </div>
        </div>
    );
}

