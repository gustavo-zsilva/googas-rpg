import { useLegends } from '../contexts/LegendsContext';

import Image from 'next/image';
import Shimmer from 'react-shimmer-effect';

import Tilt from 'react-tilt';

import { rarityScheme } from '../utils/rarityScheme';

import styles from '../styles/components/Image.module.css';

export function LegendImage() {

    const { legend, isRevealing } = useLegends();
    
    return (
        <Tilt>
            <div
                className={styles.imageContainer}
                style={{ border: `8px solid ${rarityScheme[legend?.rarity]}` }}
            >
                <div style={{ background: isRevealing ? 'transparent' : null }} />
                
                { legend && (
                    <Shimmer>
                        <Image
                            width={310}
                            height={310}
                            src={legend?.imageUrl}
                            alt={legend?.name}
                            objectFit="cover"
                        />
                    </Shimmer>
                ) }
            </div>
        </Tilt>

    );
}