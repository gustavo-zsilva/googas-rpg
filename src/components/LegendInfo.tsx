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
                    <div className="flex items-center gap-3">
                        {!hasLegend && <p className="text-lg px-2 border-2 border-purple-400 text-purple-400 rounded-sm">New!</p>}
                        <span
                            className={styles.legendName}
                            style={{ fontFamily: legend?.font }}
                            >
                            {legend?.name}
                        </span>
                    </div>
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