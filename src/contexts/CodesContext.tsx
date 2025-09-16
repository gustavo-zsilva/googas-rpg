import { createContext, ReactNode, useEffect, useState } from "react";

import localForage from 'localforage';
import { useLegends } from "./LegendsContext";
import { useAuth } from "./AuthContext";
import { getRedeemedCodes, updateRedeemedCodes } from "../lib/db";

export const CodesContext = createContext({} as CodesContextProps);

type Code = {
    name: string,
    spins: number,
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

    const { user } = useAuth();
    const { handleAddSpins } = useLegends();

    const [redeemedCodes, setRedeemedCodes] = useState([]);
    const [codes, setCodes] = useState([]);
    const [dailyCode, setDailyCode] = useState('');
    const [isDailyCodeRedeemed, setIsDailyCodeRedeemed] = useState(false);
    const [previousDay, setPreviousDay] = useState(new Date().getDate());
    let intervalID;
    let currentDay: number;
    let savedIsDailyCodeRedeemed: boolean;

    async function getInfoFromStorage() {

        try {

            const savedRedeemedCodes = await getRedeemedCodes(user?.uid);
            const savedIsDailyCodeRedeemed = await localForage.getItem('isDailyCodeRedeemed');
            const previousDay = (await localForage.getItem('previousDay')) || new Date().getDate();
            const codesJSON = await import('../codes.json');

            setRedeemedCodes(savedRedeemedCodes);
            // setIsDailyCodeRedeemed(savedIsDailyCodeRedeemed);
            // setPreviousDay(previousDay);
            setCodes(codesJSON.default);

        } catch (err) {
            console.error(err);
        }
    }

    async function updateInfoToStorage() {
        try {
            // await localForage.setItem('isDailyCodeRedeemed', isDailyCodeRedeemed);
            // await localForage.setItem('previousDay', previousDay);
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
    
    // useEffect(() => {
    //     updateInfoToStorage();
    // }, [redeemedCodes])

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

        return () => clearInterval(intervalID)
    }, [previousDay])

    function redeemCode(code: Code) {

        const isCodeRedeemed = redeemedCodes.find(({name}) => code.name === name);

        if (isCodeRedeemed) return;
        
        setRedeemedCodes([...redeemedCodes, code]);
        updateRedeemedCodes(user?.uid, code);
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