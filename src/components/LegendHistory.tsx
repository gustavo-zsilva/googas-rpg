import { useEffect, useState } from 'react';
import { useLegends } from '../contexts/LegendsContext';

import Select from 'react-select';
import { BiGhost } from 'react-icons/bi';
import { CgPacman } from 'react-icons/cg';

import { rarityScheme } from '../utils/rarityScheme';

import styles from '../styles/components/LegendHistory.module.css';

export function LegendHistory() {

    const { legendsHistory } = useLegends();
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

    const customStyles = {
        control: (provided, state) => ({
            backgroundColor: state.isFocused ? '#5865f2' : 'transparent', // cor quando ativo
            color: 'var(--primary)',
            width: '8rem',
            display: 'flex',
            border: '1px solid #c0c0c0',
            borderRadius: '4px',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--background)', // fundo das opções
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
            ? '#5865f2'
            : state.isSelected
            ? '#4f5bd5'
            : '#2f3136', // cor quando hover ou selecionado
            color: state.isFocused || state.isSelected ? '#fff' : '#ccc', // cor do texto
            cursor: 'pointer',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#fff', // cor do texto selecionado
        }),
    }

    useEffect(() => {
        setFilteredLegends(legendsHistory);
    }, [])

    useEffect(() => {
        if (legendFilter === 'all') return setFilteredLegends(legendsHistory);
        const newLegends = legendsHistory.filter(legend => legend.rarity === legendFilter);
        setFilteredLegends(newLegends);
    }, [legendFilter, legendsHistory])

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
                    styles={customStyles}
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
                                
                                <span className={styles.legendUnities}>
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