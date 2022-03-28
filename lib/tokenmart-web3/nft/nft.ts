import { NFTStorage } from "nft.storage";
import { Web3Provider } from "@ethersproject/providers";
import NFTMinter from '~/../artifacts/contracts/NFTMinter.sol/NFTMinter.json';
import { ethers } from "ethers";
import Executor from "~/tokenmart-web3/transaction";

const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdiMjkxQWQwOGY4NUY0NmZCNTYzMEY5OGE3OGE3RDRGZTdlYzVEYzciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODMzNjQ2NzQ0NSwibmFtZSI6InRva2VubWFydCJ9.5OehTU-zCBWv7GPXoSwtUkY75yS0BXUH_eAcxJnodvU";
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface MintArgs {
    contract: string;
    ownerAddress: string;
    provider: Web3Provider;
    gasPrice: string;
    setStatus: (_: string) => void;
    image: File;
    name: string;
    description: string;
}

export async function mint({ provider, setStatus, image, name, description }: MintArgs) {
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    setStatus("Uploading to nft.storage...")

    const metadata = await client.store({
        name,
        description,
        image,
    });
    setStatus(`Upload complete! Minting token with metadata URI: ${metadata.url}`);

    // the returned metadata.url has the IPFS URI we want to add.
    // our smart contract already prefixes URIs with "ipfs://", so we remove it
    // before calling the `mintToken` function
    const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");

    console.log(`provider`, provider);
    const signer = provider?.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMinter.abi, signer?.connectUnchecked());
    // const tx = withSigner.

    const overrides = {
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        value: ethers.utils.parseEther("0.01").toHexString(),
        gasPrice: ethers.utils.parseUnits("4.1", "gwei"),
    };

    const tx = Executor(contract.connect(signer));
    const res = await tx(contract.payToMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", metadataURI, overrides),
        (r: any) => {
            console.log('callback? ', { r })
        })

    console.log({ res });
}
