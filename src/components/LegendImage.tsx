import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import Tilt from 'react-tilt';

import styles from '../styles/components/Image.module.css';

export function LegendImage() {

    const { legend, isRevealing, rarityScheme } = useContext(LegendsContext);
    
    return (
        <Tilt>
            <div
                className={styles.imageContainer}
                style={{ border: `8px solid ${rarityScheme[legend?.rarity]}` }}
            >
                <div style={{ background: isRevealing ? 'transparent' : null }} />
                    
                <img src={legend?.imageUrl} alt={legend?.name} />
            </div>
        </Tilt>

    );
}