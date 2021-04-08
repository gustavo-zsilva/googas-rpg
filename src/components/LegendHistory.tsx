import { useContext, useEffect, useState } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import Select from 'react-select';

import styles from '../styles/components/LegendHistory.module.css';

export function LegendHistory() {

    const { legendsHistory, rarityScheme } = useContext(LegendsContext);
    const [legendFilter, setLegendFilter] = useState('all');
    const [filteredLegends, setFilteredLegends] = useState([]);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'legendary', label: 'Legendary' },
        { value: 'epic', label: 'Epic' },
        { value: 'rare', label: 'Rare' },
        { value: 'common', label: 'Common' },
    ]

    useEffect(() => {
        setFilteredLegends(legendsHistory);
    }, [])

    useEffect(() => {
        if (legendFilter === 'all') return setFilteredLegends(legendsHistory);

        const newFilteredLegends = legendsHistory.filter(legend => legend.rarity === legendFilter ? legend : null);

        setFilteredLegends(newFilteredLegends);
    }, [legendFilter, legendsHistory])

    return (
        <div className={styles.legendHistoryContainer}>
            <header>
                <h3>
                    You have <span>{legendsHistory.length}</span> legends
                </h3>
                <Select
                    options={options}
                    className={styles.select}
                    defaultValue={options[0]}
                    onChange={(option) => setLegendFilter(option.value)}
                />
            </header>
            

            <ul>
                {filteredLegends.map((legend, index) => {
                    return (
                        <li key={index} style={{ borderLeft: `4px solid ${rarityScheme[legend.rarity]}` }}>
                            <div style={{ backgroundImage: `url(${legend.imageUrl})` }} />
                            <span>{legend.name}</span>
                        </li>
                    );
                })}
                
            </ul>
        </div>
    );
}