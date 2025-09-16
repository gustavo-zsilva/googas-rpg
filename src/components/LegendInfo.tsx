import { useLegends } from "../contexts/LegendsContext";

import { GiLightBackpack } from 'react-icons/gi';

import { rarityScheme } from '../utils/rarityScheme';

import styles from '../styles/components/LegendInfo.module.css';

export function LegendInfo() {

    const { legend, isRevealing, legendsHistory } = useLegends();
    const rarityColor = rarityScheme[legend?.rarity];
    const hasLegend = legendsHistory && legendsHistory.some(currentLegend => currentLegend.name === legend?.name);

    return (
        <div className={styles.legendInfo}>
            {isRevealing && (
                <div>
                    <span
                        className={styles.legendName}
                        style={{ fontFamily: legend?.font }}
                    >
                        {hasLegend && <GiLightBackpack size={32} style={{ marginRight: '.4rem' }} />}
                        {legend?.name}
                    </span>
                    <span
                        className={styles.legendRarity}
                        style={{
                            color: rarityColor,
                            borderLeft: `2px solid ${rarityColor}`,
                            borderRight: `2px solid ${rarityColor}`
                        }}
                    >
                        {legend?.rarity}
                    </span>
                </div>
            )}
        </div>
        
    );
}