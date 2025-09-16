import { useEffect, useState } from 'react';

import Link from 'next/link';

import { AiOutlineStar, AiFillStar, AiOutlineHome, AiFillHome } from 'react-icons/ai';

import styles from '../styles/components/Tabs.module.css';

export function Tabs() {
    const [activeTab, setActiveTab] = useState('home');

    function changeTab(tab: string) {
        sessionStorage.setItem('activeTab', tab);
        setActiveTab(tab);
    }

    useEffect(() => {
        const sessionActiveTab = sessionStorage.getItem('activeTab') || 'home';
        setActiveTab(sessionActiveTab);
    }, [])

    return (
        <div className={styles.tabsContainer}>
            <Link href="/" legacyBehavior>
                <button
                    onClick={() => changeTab('home')}
                    style={{ borderLeft: activeTab === 'home' ? '6px solid var(--primary)' : '' }}
                >
                    { activeTab === 'home'
                    ? (
                        <div>
                            <AiFillHome size={32} color="var(--primary)" />
                            <span>Home</span>
                        </div>
                    ) : (
                        <AiOutlineHome size={32} color="#c0c0c0" />
                    ) }
                </button>
            </Link>
            <Link href="/legends" legacyBehavior>
                <button
                    onClick={() => changeTab('legends')}
                    style={{ borderLeft: activeTab === 'legends' ? '6px solid var(--primary)' : '' }}
                >
                    { activeTab === 'legends'
                    ? (
                        <div>
                            <AiFillStar size={32} color="var(--primary)" />
                            <span>Legends</span>
                        </div>
                    ) : (
                        <AiOutlineStar size={32} color="#c0c0c0" />
                    ) }
                </button>
            </Link>
        </div>
    );
}