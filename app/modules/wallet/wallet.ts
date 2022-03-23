import { Web3Provider } from "@ethersproject/providers";
import { Wallet } from "~/types/wallet";

export async function getWallet(provider: Web3Provider): Promise<Wallet> {
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    return { address: await signer.getAddress() }
}
