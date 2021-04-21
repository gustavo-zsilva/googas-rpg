import { useContext, useEffect, useState } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import Select from 'react-select';
import { BiGhost } from 'react-icons/bi';
import { CgPacman } from 'react-icons/cg';

import styles from '../styles/components/LegendHistory.module.css';

export function LegendHistory() {

    const { legendsHistory, rarityScheme } = useContext(LegendsContext);
    const [legendFilter, setLegendFilter] = useState('all');
    const [filteredLegends, setFilteredLegends] = useState([]);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'mythical', label: 'Mythical' },
        { value: 'legendary', label: 'Legendary' },
        { value: 'epic', label: 'Epic' },
        { value: 'rare', label: 'Rare' },
        { value: 'common', label: 'Common' },
    ]


    useEffect(() => {
        // Runs every time a new legend is added to the historic
        stackLegends();
    }, [legendsHistory, legendFilter])

    function stackLegends() {
        const legendsCache = [];
        let newLegends = [];
        let newFilteredLegends = [];

        newLegends = legendsHistory.map(legend => ({ ...legend, unities: 1 }))

        let count = {};
        newLegends.forEach(({name}) => { count[name] = (count[name]||0) + 1;});

        newLegends.map(legend => {
            if (legendsCache.find(({name}) => legend.name === name)) return;

            const newLegend = {
                ...legend,
                unities: count[legend.name]
            }

            legendsCache.push(newLegend);
        })

        if (legendFilter === 'all') return setFilteredLegends(legendsCache);
        newFilteredLegends = legendsCache.filter(legend => legend.rarity === legendFilter ? legend : null);

        setFilteredLegends(newFilteredLegends);
    }

    useEffect(() => {
        stackLegends();
    }, [])

    return (
        <div className={styles.legendHistoryContainer}>
            <header>
                <h3>
                    You have <span>{filteredLegends.length}</span> {legendFilter}
                </h3>
                <Select
                    options={options}
                    className={styles.select}
                    defaultValue={options[0]}
                    onChange={(option) => setLegendFilter(option.value)}
                    instanceId="filter-select"
                />
            </header>

            <ul>
                {filteredLegends.length > 0 ? (
                    filteredLegends.map((legend, index) => (
                        <li key={index} style={{ borderLeft: `4px solid ${rarityScheme[legend?.rarity]}` }}>
                            <div style={{ backgroundImage: `url(${legend?.imageUrl})` }} />
                            <span>
                                <span>
                                    {legend?.name}
                                </span>
                                
                                <span>
                                    {legend?.unities > 1 && legend?.unities}
                                </span>
                            </span>
                        </li>
                    ))
                ) : (
                    <span>
                        <CgPacman size={32} />
                        You don't have any legends of this type.
                        <BiGhost size={32} />
                    </span>
                )}
                
            </ul>
        </div>
    );
}