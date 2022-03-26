import { Web3Provider } from "@ethersproject/providers";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";

declare let window: { ethereum: any };

export enum ConnectionState {
    Disconnected,
    Connected
}

export interface Connection {
    state: ConnectionState
    provider: Web3Provider | undefined
    // wallet: Wallet | undefined
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
            provider: undefined
        };
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider.on("network", (newNetwork, oldNetwork) => {
        // console.log(`networkChanged`, newNetwork);
    });

    const ret = {
        state: ConnectionState.Connected,
        provider,
        // wallet: await getWallet(provider),
    };

    return ret;
}

// export async function getWallet(provider: Web3Provider): Promise<Wallet> {
//     await provider.send("eth_requestAccounts", []);
//
//     const signer = provider.getSigner();
//
//     // return { }
// }
