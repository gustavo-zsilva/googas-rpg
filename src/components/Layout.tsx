import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';

import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/components/Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {

    const { user } = useAuth();

    return (
        <div className={styles.layoutContainer}>
            <div className={styles.contentContainer}>
                <Header />
                { user && user.emailVerified && <Tabs /> }
                
                <div className={styles.content}>
                    {children}
                </div>
            </div>

            <footer>
                <div className={styles.author}>
                    <span>
                        Copyright © Gustavo Silva
                    </span>
                    <div>
                        <a 
                            href="https://github.com/gustavo-zsilva"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                        <a
                            href="https://github.com/gustavo-zsilva/googas-rpg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Site Repository
                        </a>
                    </div>
                </div>
                
                <div className={styles.contributors}>
                    <strong>Top Contributors</strong>
                    <div>
                        <span>Meu pai</span>
                        <span>Mimi</span>
                        <span>Romão</span>
                        <span>Vitão</span>
                        <span>RafaGul</span>
                    </div>
                </div>

            </footer>
        </div>
    );
}