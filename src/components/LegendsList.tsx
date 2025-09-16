import Image from "next/legacy/image";

import { rarityScheme } from '../utils/rarityScheme';
import { useLegendsList } from '../contexts/LegendsListContext';

import Shimmer from 'react-shimmer-effect';

import styles from '../styles/components/LegendsList.module.css';

export function LegendsList() {

    const { legends, ownedLegends } = useLegendsList();

    return (
        <div className={styles.legendsListContainer}>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owned</th>
                        <th>Rarity</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    { legends.map(legend => {
                        return (
                            <tr key={legend.name}>
                                <td
                                    className={styles.legendName}
                                    style={{ borderLeft: `3px solid ${rarityScheme[legend.rarity]}` }}
                                >
                                    <div>
                                        {/* <Shimmer> */}
                                            <Image
                                                width={40}
                                                height={40}
                                                src={legend.imageUrl}
                                                alt={legend.name}
                                                objectFit="cover"
                                            />
                                        {/* </Shimmer> */}
                                    </div>
                                    <strong style={{ fontFamily: legend.font }}>{legend.name}</strong>
                                </td>
                                <td className={styles.ownedLegend}>
                                    {ownedLegends.includes(legend.name) ? (
                                        <span className={styles.owned}>
                                            Owned
                                        </span>
                                    ) : (
                                        <span className={styles.notOwned}>
                                            Not Owned
                                        </span>
                                    )}
                                </td>
                                <td
                                    className={styles.legendRarity}
                                    style={{ color: rarityScheme[legend.rarity] }}
                                >
                                    <div>
                                        {legend.rarity}
                                    </div>
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
                    
                
            </table>
        </div>
    );
}