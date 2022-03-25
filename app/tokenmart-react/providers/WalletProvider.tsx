import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Wallet, WalletAdapter, WalletAdapterState } from "~/tokenmart-web3/wallets";
import { WalletContext } from "~/tokenmart-react/hooks/useWallet";
import { useSessionStorage } from "~/tokenmart-react/hooks/useSessionStorage";

export type WalletProviderProps = {
    children: ReactNode,
    adapters: WalletAdapter[];
    autoConnect: boolean;
    sessionStorageKey?: string;
}

const initialState: {
    wallet: Wallet | null;
    adapter: WalletAdapter | null;
    state: WalletAdapterState;
} = {
    wallet: null,
    adapter: null,
    state: WalletAdapterState.Unsupported,
};

const WalletProvider: React.FC<WalletProviderProps> = (
    {
        children,
        adapters,
        autoConnect = false,
        sessionStorageKey = "wallet"
    }
) => {
    const [ storageWallet, setStorageWallet ] = useSessionStorage<Wallet | null>(sessionStorageKey, null);
    const [ { wallet, adapter, state }, setState ] = useState(initialState);
    const [ connecting, setConnecting ] = useState(false);
    const [ disconnecting, setDisconnecting ] = useState(false);

    const connect = useCallback(async () => {
        if (!adapter) return;

        console.log(`WalletProvider::connect`, { adapter, autoConnect });

        try {
            setConnecting(true);
            await adapter.connect();
        } catch (error: any) {
            setStorageWallet(() => null);
            throw error;
        } finally {
            setConnecting(false);
            setStorageWallet(() => adapter.wallet);
            setState({
                adapter,
                wallet: adapter.wallet,
                state: adapter.state,
            });

        }
    }, [ connecting, disconnecting, adapter, state, storageWallet ]);

    // handler for the connect event from the adapter
    const handleDisconnect = useCallback(() => {
        console.log(`WalletProvider :: handleDisconnect`);
        setStorageWallet(() => null);
    }, [ adapter, state, wallet, disconnecting ]);

    const disconnect = useCallback(async () => {
        if (!adapter) return;

        try {
            console.log(`WalletProvider :: disconnect`);

            setDisconnecting(true);
            await adapter.disconnect();
        } catch (error: any) {
            throw error;
        } finally {
            setStorageWallet(() => null);
            setDisconnecting(false);
            setState({
                adapter,
                wallet: null,
                state: WalletAdapterState.Installed,
            });
        }
    }, [ disconnecting, setDisconnecting, adapter, state ]);

    const handleConnect = useCallback(() => {
        if (!adapter) return;

        setStorageWallet(() => null);
        setState((s) => {
            return {
                ...s,
                wallet,
                adapter,
                state,
            }
        });
    }, [ adapter ]);

    useEffect(function setupProvider() {
        if (!adapter) return;

        console.log(`WalletProvider :: setup`, adapter);

        adapter.on('connect', handleConnect);
        adapter.on('disconnect', handleDisconnect);

        return () => {
            adapter.off('connect', handleConnect);
            adapter.off('disconnect', handleDisconnect);
        };
    }, [ adapter, handleConnect, wallet ]);

    useEffect(function initState() {
        const adapter = adapters[0];

        if (adapter) {
            console.log(`WalletProvider :: `, {
                storageWallet,
            });

            if (storageWallet) {
                (async () => {
                    await connect();
                })();
            }

            setState({
                wallet: storageWallet || wallet,
                adapter,
                state: adapter.state
            });

            console.log(`WalletProvider :: useEffect :: setState`, {
                wallet: storageWallet,
                adapter,
                state: adapter.state
            })
        } else {
            setState(initialState);
        }
    }, [ adapters ]);

    useEffect(function autoConnectFromSessionStore() {
        if (adapter && !autoConnect && !storageWallet) return;

        if (autoConnect || storageWallet) {
            console.log('WalletProvider :: auto-connecting');
            (async () => {
                await connect();
            })();
        }
    }, [ autoConnect, adapter, state ]);

    return <WalletContext.Provider
        value={{
            adapters,
            wallet,
            adapter,
            state,
            connect,
            disconnect,
        }}
    >
        {children}
    </WalletContext.Provider>
};

export default WalletProvider;
