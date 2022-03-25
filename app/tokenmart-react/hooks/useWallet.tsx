import { createContext, useContext } from "react";
import { Wallet, WalletAdapter, WalletAdapterState } from "~/tokenmart-web3/wallets";

const defaultContext: WalletContextState = {
    adapters: [],
    wallet: null,
    adapter: null,
    state: WalletAdapterState.Unsupported,
    connect() {
        return Promise.reject(console.error('defaultContext.connect'));
    },
    disconnect() {
        return Promise.reject(console.error('defaultContext.connect'));
    },
};

export interface WalletContextState {
    adapters: WalletAdapter[];
    wallet: Wallet | null;
    adapter: WalletAdapter | null;
    state: WalletAdapterState,

    connect(): Promise<void>;

    disconnect(): Promise<void>;
}

export const WalletContext = createContext<WalletContextState>(defaultContext);

export default function useWallet(): WalletContextState {
    return useContext(WalletContext);
}
