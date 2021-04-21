import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';

import styles from '../styles/components/Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <Tabs />

            {children}
        </div>
    );
}