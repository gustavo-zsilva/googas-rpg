import { FormEvent, useRef, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout';

import { BiArrowBack, BiKey, BiUser } from 'react-icons/bi';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/components/Signup.module.css';

export default function Signup() {

    const { loading, signInWithGoogle, signUpWithEmail } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            await signUpWithEmail(emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <Layout>

            <Head>
                <title>Signup | Googas RPG</title>
            </Head>

            <div className={styles.loginContainer}>

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
                            Login
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

                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={loading}
                            >
                                Login
                            </button>

                            <div className={styles.signUp}>
                                <Link href="/signup">
                                    <a>Don't have an account? Sign Up</a>
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
                                <span>Login with Google</span>
                            </button>
                                
                            <button
                                className={styles.facebookButton}
                                disabled={loading}
                            >
                                <div>
                                    <AiFillFacebook color="#dbdbdb" size={28} />
                                </div>
                                <span>Login with Facebook</span>
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