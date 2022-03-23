import { Web3Provider } from "@ethersproject/providers";
import { Wallet } from "~/tokenmart/types/wallet";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import { getWallet } from "~/tokenmart/modules/wallet/wallet";

declare let window: { ethereum: any };

export enum ConnectionState {
    Disconnected,
    Connected
}

export interface Connection {
    state: ConnectionState
    provider: Web3Provider | undefined
    wallet: Wallet | undefined
}

export async function connect(): Promise<Connection> {
    if (typeof document === 'undefined') {
        throw new Error('provider connection can only be established on the client-side');
    }

    const onBoarding = new MetaMaskOnboarding();

    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        onBoarding.startOnboarding();

        return {
            state: ConnectionState.Disconnected,
            wallet: undefined,
            provider: undefined
        };
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider.on("network", (newNetwork, oldNetwork) => {
        console.log(`networkChanged`, newNetwork);
    });

    const ret = {
        state: ConnectionState.Connected,
        provider,
        wallet: await getWallet(provider),
    };

    return ret;
}
