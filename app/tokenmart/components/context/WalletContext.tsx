import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Wallet } from "~/tokenmart/types/wallet";
import { ConnectionState } from "~/tokenmart-web3";

declare let window: any;

const STORE_WALLET = true;

const defaultState: WalletContextProps = {
    connectionState: ConnectionState.Connected,
    wallet: { address: null },

    setWallet: (w: Wallet): void => { },
    setConnectionState: (s: ConnectionState): void => { },
};

export interface WalletContextProps {
    connectionState: ConnectionState,
    setConnectionState: (s: ConnectionState) => void | null;

    wallet: Wallet;
    setWallet: (w: Wallet) => void | null;
}

const WalletContext = createContext<WalletContextProps>(defaultState);

interface WalletProviderProps {
    children: ReactNode
}

export function useWallet() {
    return useContext(WalletContext);
}

export function WalletProvider({ children }: WalletProviderProps) {
    const [ w, setWallet ] = useState<Wallet>(defaultState.wallet);
    const [ connectionState, setConnectionState ] = useState(ConnectionState.Disconnected);

    // Loads the wallet address from session storage
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const stored = sessionStorage.getItem("address");

            if (STORE_WALLET && stored !== null) {
                setWallet({ address: sessionStorage.getItem("address") });
                setConnectionState(ConnectionState.Connected);

                return;
            }
        }
    }, []);

    return <WalletContext.Provider
        value={{
            connectionState,
            setConnectionState,
            wallet: w,
            setWallet
        }}>
        {children}
    </WalletContext.Provider>
}
