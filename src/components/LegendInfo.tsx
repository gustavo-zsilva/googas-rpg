import { useLegends } from "../contexts/LegendsContext";

import { GiLightBackpack } from 'react-icons/gi';

import { collectionScheme, rarityScheme } from '../utils/colorSchemes';

import styles from '../styles/components/LegendInfo.module.css';

export function LegendInfo() {

    const { legend, isRevealing, legendsHistory, viewOnly } = useLegends();
    const rarityColor = rarityScheme[legend?.rarity];
    const hasLegend = legendsHistory && legendsHistory.some(currentLegend => currentLegend.name === legend?.name);

    return (
        <div className={styles.legendInfo}>
            {(viewOnly || isRevealing) && (
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
                    <div className="flex items-center mt-2 gap-3">
                         <p
                            className="text-lg capitalize border-2 rounded-full px-2"
                            style={{
                                color: rarityColor,
                            }}
                        >
                            {legend?.rarity}
                        </p>
                        <p
                            className="text-lg uppercase border-2 rounded-full px-2"
                            style={{
                                background: `${collectionScheme[legend?.collection] + '30'}`,
                                borderColor: collectionScheme[legend?.collection],
                                color: collectionScheme[legend?.collection],
                            }}
                        >
                            {legend?.collection}
                        </p>
                    </div>
                </div>
            )}
        </div>
        
    );
}