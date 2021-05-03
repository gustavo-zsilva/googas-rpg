import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import localForage from 'localforage';

export const LegendsContext = createContext({} as LegendsContextProps);

type Legend = {
    name: string,
    experience: number,
    rarity: string,
    imageUrl: string,
    font: string,
    description: string,
    url: string,
}

type Rarity = {
    legendary: string,
    epic: string,
    rare: string,
    common: string,
}

interface LegendsContextProps {
    legends: Legend[];
    rarityScheme: Rarity;
    spins: number;
    isRevealing: boolean;
    legend: Legend | null;
    legendsHistory: Legend[];
    ownedLegends: string[];
    handleSpin: () => void;
    handleDiscardLegend: () => void;
    handleAddLegend: () => void;
    handleAddSpins: (spinsToSum: number) => void;
    showPopup: boolean;
}

interface LegendsProviderProps {
    children: ReactNode;
}

export function LegendsProvider({ children }: LegendsProviderProps) {

    const [spins, setSpins] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [legends, setLegends] = useState([]);
    const [legend, setLegend] = useState(null);
    const [legendsHistory, setLegendsHistory] = useState([]);
    const [luckySpins, setLuckySpins] = useState(0);
    const [ownedLegends, setOwnedLegends] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    
    let isLuckySpin = false;

    const rarityScheme = {
        mythical: '#08f7fe',
        legendary: '#ff8000',
        epic: '#a335ee',
        rare: '#0070dd',
        common: '#cccccc',
    }

    function getRandomLegend(legendArray: Legend[]) {
        const randomIndex = Math.floor(Math.random() * legendArray.length);
        return legendArray[randomIndex];
    }
    
    function calculateChances() {
        const multiplier = isLuckySpin ? 50 : 100;
        let randomIndex = Math.random() * multiplier;
        let legend: Legend;

        const filterByRarity = (rarity: string) => legends.filter(legend => legend.rarity == rarity ? legend : null);
        
        if (randomIndex <= 0.02) {
            const mythicalLegends = filterByRarity('mythical');
            legend = getRandomLegend(mythicalLegends);
        }
        else if (randomIndex <= 0.5) {
            const legendaryLegends = filterByRarity('legendary');
            legend = getRandomLegend(legendaryLegends);
        }
        else if (randomIndex <= 2.5) {
            const epicLegends = filterByRarity('epic');
            legend = getRandomLegend(epicLegends);
        }
        else if (randomIndex <= 15) {
            const rareLegends = filterByRarity('rare');
            legend = getRandomLegend(rareLegends);
        }
        else if (randomIndex > 15) {
            const commonLegends = filterByRarity('common');
            legend = getRandomLegend(commonLegends);
        }

        isLuckySpin = false;
        
        return legend;
    }

    function connectToDB() {
        return localForage.config({
            driver: localForage.INDEXEDDB,
            name: 'localforage'
        });
    }

    async function getInfoFromStorage() {

        let savedLegends: Legend[];
        let savedSpins: number;
        let legendsImport;
        let savedPopupState: boolean;
        
        try {
            connectToDB();
        
            savedLegends = await localForage.getItem('legendsHistory') || [];
            savedSpins = await localForage.getItem('spins') || 0;
            savedPopupState = Boolean(localStorage.getItem('showPopup'));
            legendsImport = await import('../legends.json');
            
            setLegends(legendsImport.default);
            setLegendsHistory(savedLegends);
            setSpins(savedSpins);
            setShowPopup(savedPopupState);
            
        } catch (err) {
            console.error(err);
        }
    }

    async function updateInfoToStorage() {
        try {
            connectToDB();

            await localForage.setItem('legendsHistory', legendsHistory);
            await localForage.setItem('spins', spins);
        } catch (err) {
            console.error(err);
        }   
    }

    useEffect(() => {
        getInfoFromStorage();
    }, [])

    useEffect(() => {
        updateInfoToStorage();
    }, [legendsHistory, spins])

    useEffect(() => {
        const ownedLegendsName = legendsHistory.map(({ name }) => name);
        setOwnedLegends(ownedLegendsName);
    }, [legendsHistory])
  
    function handleSpin() {

        if (spins <= 0) return;

        setLuckySpins(luckySpins + 1);

        if (luckySpins === 15) {
            setLuckySpins(0);
            isLuckySpin = true;
        }
        
        setSpins(spins - 1);
        setIsRevealing(true);
    
        const randomLegend = calculateChances();
    
        setLegend(randomLegend);
    }

    function handleDiscardLegend() {
        setIsRevealing(false);
        setLegend(null);
    }

    function handleAddLegend() {
        if (!ownedLegends.includes(legend.name)) {
            setOwnedLegends([...ownedLegends, legend.name]);
        }

        setIsRevealing(false);
        setLegendsHistory([legend, ...legendsHistory]);
        setLegend(null);
    }

    function handleAddSpins(spinsToSum: number) {
        setSpins(spins + spinsToSum);
    }

    return (
        <LegendsContext.Provider
            value={{
                legends,
                spins,
                isRevealing,
                legend,
                legendsHistory,
                ownedLegends,
                rarityScheme,
                handleSpin,
                handleDiscardLegend,
                handleAddLegend,
                handleAddSpins,
                showPopup,
            }}
        >
            {children}
        </LegendsContext.Provider>
    );
}

export const useLegends = () => {
    return useContext(LegendsContext);
}