import Image from 'next/image';

import { useLegends } from '../contexts/LegendsContext';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import styles from '../styles/components/LegendsList.module.css';

export function LegendsList() {

    const { legends, rarityScheme, ownedLegends } = useLegends();

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
                                    <div style={{ border: `2px solid ${rarityScheme[legend.rarity]}` }}>
                                        <Image
                                            width={40}
                                            height={40}
                                            src={legend.imageUrl}
                                            alt={legend.name}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <strong style={{ fontFamily: legend.font }}>{legend.name}</strong>
                                </td>
                                <td>{ownedLegends.includes(legend.name) ? (
                                    <AiFillCheckCircle color="#02e902" size={32} />
                                ) : (
                                    <AiFillCloseCircle color="#ff4e4e" size={32} />
                                )}</td>
                                <td
                                    className={styles.legendRarity}
                                    style={{ color: rarityScheme[legend.rarity] }}
                                >
                                    {legend.rarity}
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
                    
                
            </table>
        </div>
    );
}