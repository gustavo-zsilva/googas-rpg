import { useContext } from "react";
import { LegendsContext } from "../contexts/LegendsContext";

import { GiLightBackpack } from 'react-icons/gi';

import styles from '../styles/components/LegendInfo.module.css';

export function LegendInfo() {

    const { legend, isRevealing, rarityScheme, legendsHistory } = useContext(LegendsContext);
    const rarityColor = rarityScheme[legend?.rarity];
    const hasLegend = JSON.stringify(legendsHistory).includes(JSON.stringify(legend));

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