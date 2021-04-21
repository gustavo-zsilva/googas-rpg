import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import { AiOutlineArrowRight } from 'react-icons/ai';

import styles from '../styles/components/Backstory.module.css';

export function Backstory() {

    const { legend } = useContext(LegendsContext);

    return (
        <div className={styles.backstoryContainer}>
            <h3>Legend Info</h3>

            <span style={{ fontFamily: legend?.font }}>{legend?.name}</span>

            <p>{legend?.description}</p>

            {legend?.url && <a href={legend?.url} rel="noopener noreferrer" target="_blank">
                Ver fonte original
                <AiOutlineArrowRight size={28} />
            </a>}
            
        </div>
    );
}