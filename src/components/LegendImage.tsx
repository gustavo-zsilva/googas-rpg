import { useLegends } from '../contexts/LegendsContext';

import Image from "next/legacy/image";
import Shimmer from 'react-shimmer-effect';

import Tilt from 'react-parallax-tilt';

import { rarityScheme } from '../utils/colorSchemes';

import styles from '../styles/components/Image.module.css';

export function LegendImage() {
    const { legend, isRevealing } = useLegends();

    const rarityGlowScheme = {                          // Controls boxShadow spread based on rarity (more rare = more glow)
        'rare': '10px',
        'epic': '30px',
        'legendary': '60px',
        'mythical': '100px',
    }
    
    return (
        <Tilt scale={1.1}>
            <div
                className={styles.imageContainer}
                style={{
                    border: `8px solid ${rarityScheme[legend?.rarity]}`,
                    boxShadow: Object.keys(rarityGlowScheme).includes(legend?.rarity) ? `0 0 ${rarityGlowScheme[legend?.rarity]} ${rarityScheme[legend?.rarity]}` : 'none'
                }}
            >
                <div style={{
                    background: isRevealing ? 'transparent' : null,
                }} />
                
                { legend && (
                    // <Shimmer>
                        <Image
                            width={310}
                            height={310}
                            src={legend?.imageUrl}
                            alt={legend?.name}
                            objectFit="cover"
                        />
                    // </Shimmer>
                ) }
            </div>
        </Tilt>

    );
}