import { useLegends } from '../contexts/LegendsContext';

import Image from 'next/image';

import Tilt from 'react-tilt';

import styles from '../styles/components/Image.module.css';

export function LegendImage() {

    const { legend, isRevealing, rarityScheme } = useLegends();
    
    return (
        <Tilt>
            <div
                className={styles.imageContainer}
                style={{ border: `8px solid ${rarityScheme[legend?.rarity]}` }}
            >
                <div style={{ background: isRevealing ? 'transparent' : null }} />
                
                { legend && <Image
                    width={310}
                    height={310}
                    src={legend?.imageUrl}
                    alt={legend?.name}
                    objectFit="cover"
                /> }
                
            </div>
        </Tilt>

    );
}