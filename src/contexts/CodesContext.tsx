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
    redeemedCodes: Code[];
    redeemCode: (code: Code) => void;
}

interface CodesProviderProps {
    children: ReactNode;
}

export function CodesProvider({ children }: CodesProviderProps) {

    const { handleAddSpins } = useContext(LegendsContext);
    const [redeemedCodes, setRedeemedCodes] = useState([]);
    const [codes, setCodes] = useState([]);

    async function getInfoFromStorage() {
        let savedRedeemedCodes: Code[];
        let codesImport;

        try {
            localForage.config({
                driver: localForage.INDEXEDDB,
                name: 'localforage'
            })

            savedRedeemedCodes = await localForage.getItem('redeemedCodes') || [];
            codesImport = await import('../codes.json');

            setCodes(codesImport.default);
            setRedeemedCodes(savedRedeemedCodes);

        } catch (err) {
            console.error(err);
        }
    }

    async function updateInfoToStorage() {
        try {
            await localForage.setItem('redeemedCodes', redeemedCodes);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInfoFromStorage();
    }, [])
    
    useEffect(() => {
        updateInfoToStorage();
    }, [redeemedCodes])

    async function redeemCode(code: Code) {

        const isCodeRedeemed = redeemedCodes.find(({name}) => code.name === name);

        if (isCodeRedeemed) return;
        
        // setRedeemedCodes([...redeemedCodes, code]);
        setRedeemedCodes([...redeemedCodes, code]);
        handleAddSpins(code.spins);
    }

    return (
        <CodesContext.Provider
            value={{
                codes,
                redeemedCodes,
                redeemCode
            }}
        >
            {children}
        </CodesContext.Provider>
    );
}