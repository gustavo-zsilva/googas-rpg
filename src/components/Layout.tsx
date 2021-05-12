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
            <Header />
            { user && user.emailVerified && <Tabs /> }
            
            {children}
        </div>
    );
}