import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';
import styles from '../styles/components/Backstory.module.css';

export function Backstory() {

    const { legend } = useContext(LegendsContext);

    return (
        <div className={styles.backstoryContainer}>
            <h3>Legend Info</h3>

            <span>{legend?.name}</span>

            <p>{legend?.description}</p>
        </div>
    );
}