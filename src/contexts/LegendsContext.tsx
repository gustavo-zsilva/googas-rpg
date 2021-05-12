import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import localForage from 'localforage';

import { saveLegend, updateSpins } from '../lib/db';
import { firestore } from '../lib/firebase';
import { useAuth } from './AuthContext';

export const LegendsContext = createContext({} as LegendsContextProps);

type Legend = {
    name: string,
    rarity: string,
    imageUrl: string,
    font: string,
    description: string,
    url: string,
}

type User = {
    createdAt: Date,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    name: string,
    photoUrl: string,
    spins: number,
    redeemedCodes: [],
    uid: string,
}

interface LegendsContextProps {
    legends: Legend[];
    spins: number;
    isRevealing: boolean;
    legend: Legend | null;
    legendsHistory: Legend[];
    handleSpin: () => void;
    handleDiscardLegend: () => void;
    handleAddLegend: () => void;
    handleAddSpins: (spinsToSum: number) => void;
    showPopup: boolean;
}

interface LegendsProviderProps {
    children: ReactNode;
    firestoreLegends: Legend[];
    firestoreUser: User;
}

export function LegendsProvider({ children, firestoreLegends, firestoreUser }: LegendsProviderProps) {

    const { user } = useAuth();

    const [spins, setSpins] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [legend, setLegend] = useState(null);
    const [legends, setLegends] = useState([]);
    const [legendsHistory, setLegendsHistory] = useState([]);
    const [luckySpins, setLuckySpins] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    
    let isLuckySpin = false;

    

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

    async function getInfoFromStorage() {
        try {
            
            const savedPopupState = Boolean(localStorage.getItem('showPopup'));
            const legendsJSON = await import('../legends.json');
            
            setLegendsHistory(firestoreLegends);
            setSpins(firestoreUser.spins);
            setLegends(legendsJSON.default)
            setShowPopup(savedPopupState);
            
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInfoFromStorage();
    }, [])

    useEffect(() => {
        updateSpins(firestoreUser.uid, spins);
    }, [spins])
  
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
        saveLegend(firestoreUser.uid, legend)
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