import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { LegendsContext } from "./LegendsContext";

export const CountdownContext = createContext({} as CountdownContextProps);

interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextProps {
    minutes: number;
    seconds: number;
    progress: number;
}

export function CountdownProvider({ children }: CountdownProviderProps) {

    const maxTime = 5 * 60;                                         // 5 minutes

    const { handleAddSpins } = useContext(LegendsContext);
    const [time, setTime] = useState(maxTime);
    const [progress, setProgress] = useState(0);                    // 0% - 100%

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
                setTime(maxTime);
                handleAddSpins(10);
        }, 1000)

        setProgress(Math.round(((maxTime - time) / maxTime) * 100));        // This converts the time left into a percentage

        return () => clearTimeout(timeoutID);
    }, [time])

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                progress,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}