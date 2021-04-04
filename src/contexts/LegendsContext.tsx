import { createContext, ReactNode, useState, useEffect } from "react";
import Cookie from 'js-cookie';

export const LegendsContext = createContext({} as LegendsContextProps);

type Legend = {
    name: string,
    experience: number,
    rarity: string,
    url: string,
    font: string,
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
    legendsHistory: any[];
    isOutOfSpins: boolean;
    handleSpin: () => void;
    handleDiscardLegend: () => void;
    handleAddLegend: () => void;
}

interface LegendsProviderProps {
    legends: Legend[];
    children: ReactNode;
}

export function LegendsProvider({ legends, children }: LegendsProviderProps) {

    const [spins, setSpins] = useState(15);
    const [isRevealing, setIsRevealing] = useState(false);
    const [legend, setLegend] = useState(null);
    const [legendsHistory, setLegendsHistory] = useState([]);

    const isOutOfSpins = spins <= 0;

    function getRandomLegend(legendArray: Legend[]) {
        const randomIndex = Math.floor(Math.random() * legendArray.length);
        return legendArray[randomIndex];
    }
  
    function calculateChances() {
        const randomIndex = Math.floor(Math.random() * 1000);
        let legend: Legend;

        console.log(randomIndex)
        
        
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

    const rarityScheme = {
        legendary: '#ff8000',
        epic: '#a335ee',
        rare: '#0070dd',
        common: '#cccccc',
    }

    useEffect(() => {
        const savedLegendsHistory = JSON.parse(Cookie.get('legendsHistory')) || [];
        const savedSpins = Number(Cookie.get('spins'));

        setLegendsHistory(savedLegendsHistory);
        setSpins(savedSpins);
    }, [])

    useEffect(() => {
        Cookie.set('legendsHistory', JSON.stringify(legendsHistory));
        Cookie.set('spins', String(spins));

    }, [legendsHistory, spins])
  
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
                isRevealing,
                legend,
                legendsHistory,
                rarityScheme,
                isOutOfSpins,
                handleSpin,
                handleDiscardLegend,
                handleAddLegend,
            }}
        >
            {children}
        </LegendsContext.Provider>
    );
}