import { createContext, useContext, useEffect, useState } from "react";
import { getBogaTokens, updateBogaTokens } from "../lib/db";
import { useAuth } from "./AuthContext";

const TokenContext = createContext({} as TokenContextProps);

type TokenContextProps = {
    bogaTokens: number;
    addBogaTokens: (tokensToAdd: number) => void;
}

type TokenProviderProps = {
    children: React.ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
    const { user } = useAuth();

    const [bogaTokens, setBogaTokens] = useState(0);    // Boga Tokens the user has

    function addBogaTokens(tokensToAdd: number) {
        setBogaTokens(prevState => prevState + tokensToAdd);
    }

    async function getTokensFromFirestore() {
        try {
            const tokens = await getBogaTokens(user.uid);

            setBogaTokens(tokens);
        } catch (err) {
            console.error(err);
        }
    }

    async function updateTokensToFirestore() {
        if (user) {
            await updateBogaTokens(user.uid, bogaTokens);
        }
    }

    useEffect(() => {
        // Get Boga Tokens from firestore
        if (!user) return;
        getTokensFromFirestore();
    }, [user])

    useEffect(() => {
        // Save Boga Tokens to firestore
        updateTokensToFirestore();
    }, [bogaTokens])

    return (
        <TokenContext.Provider
            value={{
                bogaTokens,
                addBogaTokens,
            }}
        >
            {children}
        </TokenContext.Provider>
    )
}

export function useTokens() {
    return useContext(TokenContext);
}