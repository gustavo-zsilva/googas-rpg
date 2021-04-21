import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import localForage from 'localforage';
import { LegendsContext } from "./LegendsContext";

export const CodesContext = createContext({} as CodesContextProps);

type Code = {
    name: string,
    spins: number
}

interface CodesContextProps {
    codes: Code[];
    dailyCode: string;
    isDailyCodeRedeemed: boolean;
    redeemedCodes: Code[];
    redeemCode: (code: Code) => void;
    redeemDailyCode: () => void;
}

interface CodesProviderProps {
    children: ReactNode;
}

export function CodesProvider({ children }: CodesProviderProps) {

    const { handleAddSpins } = useContext(LegendsContext);
    const [redeemedCodes, setRedeemedCodes] = useState([]);
    const [codes, setCodes] = useState([]);
    const [dailyCode, setDailyCode] = useState('');
    const [isDailyCodeRedeemed, setIsDailyCodeRedeemed] = useState(false);
    const [previousDay, setPreviousDay] = useState(new Date().getDate());
    let intervalID;
    let currentDay: number;
    let savedIsDailyCodeRedeemed: boolean;

    function connectToDB() {
        return localForage.config({
            driver: localForage.INDEXEDDB,
            name: 'localforage'
        });
    }

    async function getInfoFromStorage() {
        let savedRedeemedCodes: Code[];
        let codesImport;
        let previousDay;

        try {
            connectToDB();

            savedRedeemedCodes = await localForage.getItem('redeemedCodes') || [];
            savedIsDailyCodeRedeemed = await localForage.getItem('isDailyCodeRedeemed');
            previousDay = await localForage.getItem('previousDay') || new Date().getDate();
            codesImport = await import('../codes.json');

            setRedeemedCodes(savedRedeemedCodes);
            setIsDailyCodeRedeemed(savedIsDailyCodeRedeemed);
            setPreviousDay(previousDay);
            setCodes(codesImport.default);

        } catch (err) {
            console.error(err);
        }
    }

    async function updateInfoToStorage() {
        try {
            connectToDB();

            await localForage.setItem('redeemedCodes', redeemedCodes);
            await localForage.setItem('isDailyCodeRedeemed', isDailyCodeRedeemed);
            await localForage.setItem('previousDay', previousDay);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInfoFromStorage();
        generateDailyCode();

        return () => {
            clearInterval(intervalID);
        }
    }, [])
    
    useEffect(() => {
        updateInfoToStorage();
    }, [redeemedCodes, isDailyCodeRedeemed, previousDay])

    useEffect(() => {
        currentDay = new Date().getDate();

        intervalID = setInterval(() => {
           
            currentDay = new Date().getDate();

            if (previousDay !== currentDay) {
                generateDailyCode();
                setIsDailyCodeRedeemed(false);
                setPreviousDay(currentDay);
            }

        }, 1000 * 10)
    }, [previousDay])

    function redeemCode(code: Code) {

        const isCodeRedeemed = redeemedCodes.find(({name}) => code.name === name);

        if (isCodeRedeemed) return;
        
        setRedeemedCodes([...redeemedCodes, code]);
        handleAddSpins(code.spins);
    }

    function redeemDailyCode() {
        handleAddSpins(10);
        setIsDailyCodeRedeemed(true);
    }

    function generateDailyCode() {
        let randomCode = Math.random().toString(36).substring(7);
        setDailyCode(randomCode);
    }

    return (
        <CodesContext.Provider
            value={{
                codes,
                dailyCode,
                isDailyCodeRedeemed,
                redeemedCodes,
                redeemCode,
                redeemDailyCode,
            }}
        >
            {children}
        </CodesContext.Provider>
    );
}