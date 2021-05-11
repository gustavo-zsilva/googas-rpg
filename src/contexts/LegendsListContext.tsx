import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const LegendsListContext = createContext({} as LegendsListContextProps);

type Legend = {
    name: string,
    rarity: string,
    imageUrl: string,
    font: string,
    description: string,
    url: string,
}

interface LegendsListContextProps {
    legends: Legend[];
    ownedLegends: string[];
}

interface LegendsListProviderProps {
    children: ReactNode;
    legends: Legend[];
    firestoreLegends: Legend[];
}

export function LegendsListProvider({ children, legends, firestoreLegends }: LegendsListProviderProps) {

    const [ownedLegends, setOwnedLegends] = useState([]);
    
    useEffect(() => {
        const ownedLegendsName = firestoreLegends.map(({ name }) => name);
        setOwnedLegends(ownedLegendsName);
    }, [])

    return (
        <LegendsListContext.Provider
            value={{
                legends,
                ownedLegends,
            }}
        >
            {children}
        </LegendsListContext.Provider>
    );
}

export const useLegendsList = () => {
    return useContext(LegendsListContext);
}