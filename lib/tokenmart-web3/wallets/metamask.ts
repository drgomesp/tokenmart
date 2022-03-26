import { detectionStrategy, GenericWalletAdapter, Wallet, WalletAdapterState } from "./index";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

declare let window: { ethereum: any; };

export class MetaMaskWalletAdapter extends GenericWalletAdapter {
    name: string = "metamask";
    state: WalletAdapterState = WalletAdapterState.NotDetected;
    onboarding?: MetaMaskOnboarding | null;
    provider?: Web3Provider | null;
    wallet: Wallet | null;

    constructor() {
        super();

        this.wallet = null;

        if (typeof document === "undefined" || typeof window === "undefined") {
            this.state = WalletAdapterState.Unsupported;
        } else {
            detectionStrategy((): boolean => {
                if (MetaMaskOnboarding.isMetaMaskInstalled()) {
                    this.onboarding = new MetaMaskOnboarding();
                    this.state = WalletAdapterState.Installed;
                    return true;
                }

                return false;
            });
        }
    }

    async connect(): Promise<void> {
        if (!this.onboarding) return;

        try {
            if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
                this.onboarding.startOnboarding();
            }

            this.provider = new ethers.providers.Web3Provider(window.ethereum);

            this.provider.on("network", (newNetwork, oldNetwork) => {
                // console.log('MetaMaskWalletAdapter :: network change detected')
            });

            this.state = WalletAdapterState.Connected;
            this.wallet = await this.getWallet();

            return Promise.resolve();
        } catch (e: any) {
            console.error(e);
        } finally {

        }
    }

    async disconnect(): Promise<void> {
        this.state = WalletAdapterState.Installed;
        this.wallet = null;

        return Promise.resolve();
    }

    async getWallet(): Promise<Wallet> {
        if (!this.wallet) {
            const addresses = await this.provider?.send("eth_requestAccounts", []);

            // const signer = this.provider?.getSigner();
            // const address = await signer?.getAddress();

            if (addresses.length !== 0) {
                this.wallet = { address: addresses[0] };
            }
        }

        return this.wallet || Promise.reject('kurwa');
    }
}
