import { createContext, ReactNode, useState, useEffect } from "react";
import Cookie from 'js-cookie';
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
}

interface LegendsProviderProps {
    legends: Legend[];
    children: ReactNode;
}

export function LegendsProvider({ legends, children }: LegendsProviderProps) {

    const [spins, setSpins] = useState(0);
    const [time, setTime] = useState(10 * 60);
    const [isRevealing, setIsRevealing] = useState(false);
    const [legend, setLegend] = useState(null);
    const [legendsHistory, setLegendsHistory] = useState([]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let timeoutID: NodeJS.Timeout;

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
        const randomIndex = Math.floor(Math.random() * 1000);
        let legend: Legend;
        
        if (randomIndex <= 3) {
            const legendaryLegends = legends.filter(legend => legend.rarity == 'legendary' ? legend : null);
            legend = getRandomLegend(legendaryLegends);
        }
        else if (randomIndex <= 12) {
            const epicLegends = legends.filter(legend => legend.rarity == 'epic' ? legend : null);
            legend = getRandomLegend(epicLegends);
        }
        else if (randomIndex <= 36) {
            const rareLegends = legends.filter(legend => legend.rarity == 'rare' ? legend : null);
            legend = getRandomLegend(rareLegends);
        }
        else if (randomIndex > 36) {
            const commonLegends = legends.filter(legend => legend.rarity == 'common' ? legend : null);
            legend = getRandomLegend(commonLegends);
        }
        
        return legend;
    }

    async function getInfoFromStorage() {
        const savedLegendsHistory: Legend[] = await localForage.getItem('legendsHistory');
        const savedSpins: number = await localForage.getItem('spins');
        const sessionTime: number = Number(sessionStorage.getItem('time'));

        setLegendsHistory(savedLegendsHistory);
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
            }}
        >
            {children}
        </LegendsContext.Provider>
    );
}