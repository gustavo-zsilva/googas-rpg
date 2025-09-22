import { createContext, ReactNode, useState, useEffect, useContext } from "react";

import { saveLegend, updateSpins, updateLegendUnities } from '../lib/db';
import { useAuth } from './AuthContext';
import { priceScheme } from "../utils/priceScheme";
import { useTokens } from "./TokenContext";

export const LegendsContext = createContext({} as LegendsContextProps);

type Legend = {
    name: string,
    rarity: string,
    imageUrl: string,
    font: string,
    description: string,
    url: string,
    unities: number,
    collection: string,
}

type User = {
    createdAt: Date,
    email: string,
    name: string,
    spins: number,
    uid: string,
}

interface LegendsContextProps {
    legends: Legend[];
    spins: number;
    isRevealing: boolean;
    legend: Legend | null;
    legendsHistory: Legend[];
    handleSpin: () => void;
    handleSellLegend: () => void;
    handleAddLegend: () => void;
    handleAddSpins: (spinsToSum: number) => void;
    openBundle: () => void;
    handleAddBundleLegends: () => void;
    handleSellBundleLegends: () => void;
    toggleViewOnlyLegend: (legend: Legend | null) => void;
    showPopup: boolean;
    luckySpins: number;
    bundleLegends: Legend[];
    viewOnly: boolean;
}

interface LegendsProviderProps {
    children: ReactNode;
    firestoreLegends: Legend[];
    firestoreUser: User;
}

export function LegendsProvider({ children, firestoreLegends, firestoreUser }: LegendsProviderProps) {

    const { user } = useAuth();
    const { addBogaTokens } = useTokens();

    const [spins, setSpins] = useState(0);                      // Current number of spins the user has
    const [isRevealing, setIsRevealing] = useState(false);      // Controls whether a legend is being revealed or not
    const [legend, setLegend] = useState(null);                 // Current legend being revealed / viewed
    const [legends, setLegends] = useState([]);                 // All legends available to be won
    const [legendsHistory, setLegendsHistory] = useState([]);   // All legends the user has won
    const [luckySpins, setLuckySpins] = useState(0);            // Counts the number of spins to give a guaranteed lucky spin

    const [showPopup, setShowPopup] = useState(false);          // Controls whether to show the sell popup or not
    const [bundleLegends, setBundleLegends] = useState<Legend[]>([]); // Legends obtained from opening a bundle
    const [viewOnly, setViewOnly] = useState(false);                    // Controls if legend being displayed is view-only

    let isLuckySpin = false;

    function toggleViewOnlyLegend(legend: Legend | null) {
        if (!legend) {
            setViewOnly(false);
            setLegend(null);
            setIsRevealing(false);
            return;
        }

        setIsRevealing(false);
        setViewOnly(true);
        setLegend(legend);
    }

    function openBundle() {
        if (spins < 10) return;

        if (luckySpins >= 20) {
            setLuckySpins(0);
            isLuckySpin = true;
        }

        setSpins(spins - 10);
        setLuckySpins((prevState) => prevState + 10);

        const bundleLegends = [];
        for (let i = 0; i < 10; i++) {
            const randomLegend = calculateChances();
            bundleLegends.push(randomLegend);
        }

        setBundleLegends(bundleLegends);
    }

    function handleAddBundleLegends() {
        const newLegendsHistory = [...legendsHistory];

        bundleLegends.forEach(legend => {
            if (newLegendsHistory.some(currentLegend => currentLegend.name === legend.name)) {
                const repeatedLegend = newLegendsHistory.find(currentLegend => currentLegend.name === legend.name);
                const repeatedLegendIndex = newLegendsHistory.indexOf(repeatedLegend);
                newLegendsHistory[repeatedLegendIndex].unities += 1;
                
                updateLegendUnities(firestoreUser.uid, { name: repeatedLegend.name, unities: repeatedLegend.unities });
                
                return;
            }

            const newLegend = {
                ...legend,
                unities: 1,
            }

            saveLegend(firestoreUser.uid, newLegend);
            newLegendsHistory.push(newLegend);
        })

        setLegendsHistory(newLegendsHistory);
        setBundleLegends([]);
    }

    function handleSellBundleLegends() {
        let tokensToAdd = 0;

        bundleLegends.forEach(legend => {
            tokensToAdd += priceScheme[legend.rarity];
        })

        addBogaTokens(tokensToAdd);
        setBundleLegends([]);
    }

    function getRandomLegend(legendArray: Legend[]) {                       // Returns a random legend from an array of legends
        const randomIndex = Math.floor(Math.random() * legendArray.length);
        return legendArray[randomIndex];
    }
    
    function calculateChances() {                                           // Calculates which legend the user wins based on predefined chances
        const multiplier = isLuckySpin ? 20 : 100;
        let randomIndex = Math.random() * multiplier;
        let legend: Legend;

        const filterByRarity = (rarity: string) => legends.filter(legend => legend.rarity === rarity);
        
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
        else if (randomIndex <= 50) {
            const uncommonLegends = filterByRarity('uncommon');
            legend = getRandomLegend(uncommonLegends);
        }
        else if (randomIndex > 50) {
            const commonLegends = filterByRarity('common');
            legend = getRandomLegend(commonLegends);
        }

        isLuckySpin = false;
        
        return legend;
    }

    async function getInfoFromStorage() {                                   // Gets the user's legends and spins from localStorage
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
        if (!user || !firestoreUser) return;
        updateSpins(firestoreUser.uid, spins);
    }, [spins, user, firestoreUser])
  
    function handleSpin() {                                                 // Handles the logic of spinning to win a legend

        if (spins <= 0) return;

        setViewOnly(false);
        setLuckySpins(luckySpins + 1);

        if (luckySpins >= 20) {
            setLuckySpins(0);
            isLuckySpin = true;
        }

        setSpins(spins - 1);
        setIsRevealing(true);
    
        const randomLegend = calculateChances();
        
        setLegend(randomLegend);
    }

    function handleSellLegend() {
        addBogaTokens(priceScheme[legend.rarity]);

        setIsRevealing(false);
        setLegend(null);
    }

    function handleAddLegend() {
        setIsRevealing(false);

        if (legendsHistory.some(currentLegend => currentLegend.name === legend.name)) {
            const repeatedLegend = legendsHistory.find(currentLegend => currentLegend.name === legend.name);
            const repeatedLegendIndex = legendsHistory.indexOf(repeatedLegend);
            const newLegendsHistory = [...legendsHistory];
            newLegendsHistory[repeatedLegendIndex].unities += 1;
            
            updateLegendUnities(firestoreUser.uid, { name: repeatedLegend.name, unities: repeatedLegend.unities });
            
            setLegendsHistory(newLegendsHistory);
            setLegend(null);
            return;
        }

        const newLegend = {
            ...legend,
            unities: 1,
        }

        saveLegend(firestoreUser.uid, newLegend);
        setLegendsHistory([newLegend, ...legendsHistory]);
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
                handleSellLegend,
                handleAddLegend,
                handleAddSpins,
                showPopup,
                openBundle,
                luckySpins,
                bundleLegends,
                handleAddBundleLegends,
                handleSellBundleLegends,
                viewOnly,
                toggleViewOnlyLegend,
            }}
        >
            {children}
        </LegendsContext.Provider>
    );
}

export const useLegends = () => {
    return useContext(LegendsContext);
}