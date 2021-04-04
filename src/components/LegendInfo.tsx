import { useContext } from "react";
import { LegendsContext } from "../contexts/LegendsContext";

import styles from '../styles/components/LegendInfo.module.css';

export function LegendInfo() {

    const { legend, isRevealing, rarityScheme, legendsHistory } = useContext(LegendsContext);
    const rarityColor = rarityScheme[legend?.rarity];
    const hasLegend = legendsHistory.includes(legend);

    return (
        <div className={styles.legendInfo}>
            {isRevealing && (
                <div>
                    <span
                        className={styles.legendName}
                        style={{ fontFamily: legend?.font }}
                    >
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
                    {hasLegend && <span>(You already has this legend)</span>}
                </div>
            )}
        </div>
        
    );
}