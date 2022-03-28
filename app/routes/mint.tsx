import { Button, createStyles, Group, Text } from "@mantine/core";
import React, { MouseEventHandler } from "react";
import useContractLoader from "~/tokenmart-react/hooks/useContractLoader";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { FileUpload } from "tabler-icons-react";
import { mint } from "~/tokenmart-web3/nft/nft";
import useWallet from "~/tokenmart-react/hooks/useWallet";
import { WalletAdapter } from "~/tokenmart-web3/wallets";

const useStyles = createStyles((theme) => ({
    dropzone: {
        width: 450,
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {},
}));

const handleUpload = (adapter: WalletAdapter, files: File[]) => {
    (async () => {
        const provider = adapter.provider;
        if (!provider) {
            throw new Error("no provider");
        }

        // MetaMask requires requesting permission to connect users accounts
        await provider?.send("eth_requestAccounts", []);

        await mint({
            setStatus: status => console.log(status),
            image: files[0],
            contract: "",
            description: "",
            gasPrice: "",
            name: "",
            ownerAddress: "",
            provider,
        });
    })();
};

const handleClick: MouseEventHandler<HTMLButtonElement> =
    (e) => {
        console.log(e);
    };

const Mint: React.FC = () => {
    const { classes } = useStyles();
    const contracts = useContractLoader({});
    const { adapter, wallet } = useWallet();

    if (!adapter) return <>No adapter</>;

    return (
        <>
            <Group direction="row">
                <Text>Hey there! Let's start minting NFTs!</Text>

                <Dropzone
                    onDrop={(files) => {handleUpload(adapter, files)}}
                    className={classes.dropzone}
                    radius="md"
                    accept={[ MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif, MIME_TYPES.svg ]}
                    maxSize={30 * 1024 ** 2}>
                    {(status) => (
                        <div style={{ pointerEvents: 'none' }}>
                            <Group position="center">
                                <FileUpload/>
                            </Group>
                            <Text
                                align="center"
                                weight={700}
                                size="lg"
                                mt="xl">
                                {status.accepted
                                    ? 'Drop files here'
                                    : status.rejected ? 'Rejected' : 'Upload'}
                            </Text>
                            <Text align="center" size="sm" mt="xs" color="dimmed">
                                Drag&apos;n&apos;drop files here to upload.
                            </Text>
                        </div>
                    )}
                </Dropzone>

                <Button className={classes.control} size="md" radius="xl">
                    Select files
                </Button>
            </Group>
        </>
    );
}

export default Mint;
