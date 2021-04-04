import { useContext } from "react";
import { LegendsContext } from "../contexts/LegendsContext";

import styles from '../styles/components/LegendInfo.module.css';

export function LegendInfo() {

    const { legend, isRevealing, rarityScheme } = useContext(LegendsContext);

    return (
        <div className={styles.legendInfo}>
            {isRevealing && (
                <div>
                    <span
                        className={styles.legendName}
                        style={{ fontFamily: legend.font }}
                    >
                        {legend.name}
                    </span>
                    <span
                        className={styles.legendRarity}
                        style={{
                            color: rarityScheme[legend.rarity],
                            borderLeft: `2px solid ${rarityScheme[legend.rarity]}`,
                            borderRight: `2px solid ${rarityScheme[legend.rarity]}`
                        }}
                    >
                        {legend.rarity}
                    </span>
                </div>
            )}
        </div>
        
    );
}