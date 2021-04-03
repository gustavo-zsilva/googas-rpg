import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';
import styles from '../styles/components/Image.module.css';

export function Image() {

    const { legend, isRevealing } = useContext(LegendsContext);
    
    return (
        <div className={styles.imageContainer}>

            <div style={{ background: isRevealing ? 'transparent' : null }} />

            <img src={legend.url} alt={legend.name} />

        </div>
    );
}