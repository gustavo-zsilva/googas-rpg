import Link from 'next/link';

import { AiOutlineStar, AiFillStar, AiOutlineHome, AiFillHome } from 'react-icons/ai';

import styles from '../styles/components/Tabs.module.css';

export function Tabs() {
    return (
        <div className={styles.tabsContainer}>
            <Link href="/">
                <button>
                    <AiOutlineHome size={32} />
                </button>
            </Link>
            
            <Link href="/legends">
                <button>
                    <AiOutlineStar size={32} />
                </button>
            </Link>
        </div>
    );
}