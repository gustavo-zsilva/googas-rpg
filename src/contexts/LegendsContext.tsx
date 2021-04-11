import { createContext, ReactNode, useState, useEffect } from "react";
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
    minutes: number;
    seconds: number;
    isRevealing: boolean;
    legend: Legend | null;
    legendsHistory: any[];
    handleSpin: () => void;
    handleDiscardLegend: () => void;
    handleAddLegend: () => void;
    handleAddSpins: (spinsToSum: number) => void;
}

interface LegendsProviderProps {
    children: ReactNode;
}

export function LegendsProvider({ children }: LegendsProviderProps) {

    const [spins, setSpins] = useState(0);
    const [time, setTime] = useState(10 * 60);
    const [isRevealing, setIsRevealing] = useState(false);
    const [legends, setLegends] = useState([]);
    const [legend, setLegend] = useState(null);
    const [legendsHistory, setLegendsHistory] = useState([]);
    const [luckySpins, setLuckySpins] = useState(0);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let timeoutID: NodeJS.Timeout;
    let isLuckySpin = false;


    const rarityScheme = {
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
        const randomIndex = Math.floor(Math.random() * multiplier);
        let legend: Legend;

        const filterByRarity = (rarity: string) => legends.filter(legend => legend.rarity == rarity ? legend : null);
        
        if (randomIndex <= 0.5) {
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

    async function getInfoFromStorage() {
        const legendsImport = await import('../legends.json');
        const legends = legendsImport.default;

        const sessionTime: number = Number(sessionStorage.getItem('time')) || time;

        let savedLegends: Legend[];
        let savedSpins: number;
      
        try {
            localForage.config({
                driver: localForage.INDEXEDDB,
                name: 'googasrpg',
            })
        
            savedLegends = await localForage.getItem('legendsHistory');
            savedSpins = await localForage.getItem('spins');
      
        } catch (err) {
            console.error(err);
        }

        setLegends(legends);
        setLegendsHistory(savedLegends);
        setSpins(savedSpins);

        clearTimeout(timeoutID);
        setTime(sessionTime);
    }

    async function updateInfoToStorage() {
        await localForage.setItem('legendsHistory', legendsHistory);
        await localForage.setItem('spins', spins);
        sessionStorage.setItem('time', String(time));
    }

    useEffect(() => {
        getInfoFromStorage();
        
    }, [])

    useEffect(() => {
        updateInfoToStorage();
    }, [legendsHistory, spins, time])

    useEffect(() => {
        timeoutID = setTimeout(() => {
            if (time > 0) {
                setTime(previousState => previousState - 1);
                return;
            }
                setTime(10 * 60);
                setSpins(previousState => previousState + 10);
        }, 1000)

    }, [time])
  
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
                minutes,
                seconds,
                isRevealing,
                legend,
                legendsHistory,
                rarityScheme,
                handleSpin,
                handleDiscardLegend,
                handleAddLegend,
                handleAddSpins,
            }}
        >
            {children}
        </LegendsContext.Provider>
    );
}