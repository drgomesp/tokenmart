import EventEmitter from "eventemitter3";
import { Web3Provider } from "@ethersproject/providers";

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
    Local = "local"
}

export enum WalletAdapterState {
    Unsupported = "Unsupported",
    NotDetected = "NotDetected",
    Installed = "Installed",
    Connected = "Connected",
}

export interface Wallet {
    address: string;
}

export type WalletAdapterEvents = {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

export type WalletAdapterProps = {
    name: string;
    state: WalletAdapterState;
    provider?: Web3Provider | null;
    wallet: Wallet | null;

    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

export type WalletAdapter = WalletAdapterProps & EventEmitter<WalletAdapterEvents>;

export abstract class GenericWalletAdapter extends EventEmitter<WalletAdapterEvents> {
    abstract connect(): Promise<void>;

    abstract disconnect(): Promise<void>;

    abstract getWallet(): Promise<Wallet | null>;
}

export function detectionStrategy(detect: () => boolean): void {
    detect();
}

export { EventEmitter };
