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
    usedCodes: Code[];
    setUsedCode: (code: Code) => void;
}

interface CodesProviderProps {
    children: ReactNode;
}

export function CodesProvider({ children }: CodesProviderProps) {

    const { handleAddSpins } = useContext(LegendsContext);
    const [usedCodes, setUsedCodes] = useState([]);
    const codes = [
        {
            name: 'martin',
            spins: 10
        },
        {
            name: 'moliammo144p',
            spins: 20
        },
        {
            name: 'Floppa4Life',
            spins: 20
        },
        {
            name: 'h',
            spins: 20
        }
    ]

    async function getInfoFromStorage() {
        const savedUsedCodes: Code[] = await localForage.getItem('usedCodes') || [];
        setUsedCodes(savedUsedCodes);
    }

    async function updateInfoToStorage() {
        await localForage.setItem('usedCodes', usedCodes);
    }

    useEffect(() => {
        getInfoFromStorage()
    }, [])
    
    useEffect(() => {
        updateInfoToStorage()
    }, [usedCodes])

    async function setUsedCode(code: Code) {
        if (usedCodes.includes(code)) return;
        setUsedCodes([...usedCodes, code]);

        handleAddSpins(10);
    }

    return (
        <CodesContext.Provider
            value={{
                codes,
                usedCodes,
                setUsedCode
            }}
        >
            {children}
        </CodesContext.Provider>
    );
}