import { createContext, ReactNode, useState } from "react";

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
    legend: Legend;
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
    const [legend, setLegend] = useState({});
    const isOutOfSpins = spins <= 0;
  
    function getRandomLegend() {
        const randomIndex = Math.floor(Math.random() * legends.length);
        const randomLegend = legends[randomIndex];
    
        return randomLegend;
    }

    const rarityScheme = {
        legendary: '#ff8000',
        epic: '#a335ee',
        rare: '#0070dd',
        common: '#cccccc',
    }
  
    function handleSpin() {

        if (spins <= 0) return;
        
        setSpins(spins - 1);
        setIsRevealing(true);
    
        const randomLegend = getRandomLegend();
    
        setLegend(randomLegend);
    }

    function handleDiscardLegend() {
        setIsRevealing(false);
        setLegend({});
    }

    function handleAddLegend() {
        setIsRevealing(false);
        setLegend({});
    }

    return (
        <LegendsContext.Provider
            value={{
                legends,
                spins,
                isRevealing,
                legend,
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