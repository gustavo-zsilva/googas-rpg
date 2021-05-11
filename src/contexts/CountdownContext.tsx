import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { LegendsContext } from "./LegendsContext";

export const CountdownContext = createContext({} as CountdownContextProps);

interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextProps {
    minutes: number;
    seconds: number;
}

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { handleAddSpins } = useContext(LegendsContext);
    const [time, setTime] = useState(10 * 60);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let timeoutID: NodeJS.Timeout;

    useEffect(() => {
        const sessionTime: number = Number(sessionStorage.getItem('time')) || time;
        setTime(sessionTime);
    }, [])

    useEffect(() => {
        sessionStorage.setItem('time', String(time));

        timeoutID = setTimeout(() => {
            if (time > 0) {
                setTime(previousState => previousState - 1);
                return;
            }
                setTime(10 * 60);
                handleAddSpins(10);
        }, 1000)

        return () => clearTimeout(timeoutID);
    }, [time])

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}