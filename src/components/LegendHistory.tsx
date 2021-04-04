import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';
import styles from '../styles/components/LegendHistory.module.css';

export function LegendHistory() {

    const { legendsHistory, rarityScheme } = useContext(LegendsContext);

    return (
        <div className={styles.legendHistoryContainer}>
            <h3>
                You have <span>{legendsHistory.length}</span> legends
            </h3>

            <ul>
                {legendsHistory.map((legend, index) => {
                    return (
                        <li key={index} style={{ borderLeft: `4px solid ${rarityScheme[legend.rarity]}` }}>
                            <div style={{ backgroundImage: `url(${legend.url})` }} />
                            <span>{legend.name}</span>
                        </li>
                    );
                })}
                
            </ul>
        </div>
    );
}