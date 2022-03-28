import { ethers, Transaction } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";

const Executor = (handler: any) => {
    return async (tx: Transaction | Promise<Transaction>, callback?: any | null) => {
        if (typeof handler === "undefined") {
            return;
        }

        let provider: Provider;
        let signer, network;

        if (ethers.Signer.isSigner(handler) === true) {
            provider = handler.provider;
            signer = handler;
            network = handler.provider && (await handler.provider.getNetwork());
        } else if (handler._isProvider) {
            provider = handler;
            signer = handler.getSigner();
            network = await handler.getNetwork();
        } else {
            provider = handler.provider;
            console.log(`something wrong`, { provider: null, handler });
        }

        try {
            let result;

            if (tx instanceof Promise) {
                console.log(`waiting for transaction`, { tx });
                result = await tx;
            } else {
                console.log('executing transaction', { tx, provider, signer, network });
                // @ts-ignore
                tx.gasLimit = ethers.utils.hexlify(120000);
                tx.gasPrice = ethers.utils.parseEther("0.01");

                result = await signer.sendTransaction(tx);
                console.log({ result })
            }

            if (callback) {
                console.log('callback');
                const res = await tx;
                console.log('callback now');
                const listeningInterval = setInterval(async () => {
                    if (res.hash) {
                        const currentTransactionReceipt = await provider.getTransactionReceipt(res.hash);
                        if (currentTransactionReceipt && currentTransactionReceipt.confirmations) {
                            callback({ ...res, ...currentTransactionReceipt });
                            clearInterval(listeningInterval);
                        }
                    }
                }, 500);
            }

            if (typeof result.wait === "function") {
                await result.wait();
            }
        } catch (err: any) {
            console.error(`kurwa!!!`, { err });
        }
        // tx.to = CONTRACT_ADDRESS;
        // tx.chainId = 0;
        // tx.from = "";
        // tx.gasLimit = ethers.utils.hexlify(120000);
        //
        // tx = await handler.sendTransaction(tx);
        //
        // console.log(tx);
        // tx.wait();
        // console.log('sending transaction', { tx });
    };
};

export default Executor;
