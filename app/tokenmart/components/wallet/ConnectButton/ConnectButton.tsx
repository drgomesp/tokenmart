import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";
import { connect, ConnectionState } from "~/tokenmart-web3"
import { useWallet } from "~/tokenmart/components/context/WalletContext";
import { getWallet } from "~/tokenmart/modules/wallet/wallet";
import { Wallet } from "~/tokenmart/types/wallet";

declare let window: any;

const useStyles = createStyles((theme) => ({
    button: {
        marginBottom: `${theme.spacing.sm / 2}px`,
    }
}));

export interface ConnectArgs {
    provider: string;
}

async function connectAndStoreWallet({}: ConnectArgs): Promise<{ state: ConnectionState, wallet: Wallet | null }> {
    if (typeof document !== 'undefined') {
        const { state, provider, } = await connect();

        if (state === ConnectionState.Connected && provider !== undefined) {
            const wallet = await getWallet(provider);

            if (wallet === undefined) {
                throw new Error("kurwaerror!");
            }

            console.log(`found wallet = `, wallet)

            if (state === ConnectionState.Connected && wallet.address !== null) {
                sessionStorage.setItem("address", wallet.address);
                return { state, wallet };
            }
        }
    }

    return { state: ConnectionState.Disconnected, wallet: null };
}

interface ConnectButtonProps {
    onConnect: (w: Wallet) => void | null;
    provider: string;
    label: string;
    srcExt: string;
    enabled: boolean;
}

export default function ConnectButton({
                                          onConnect,
                                          provider,
                                          label,
                                          srcExt,
                                          enabled = true,
                                      }: ConnectButtonProps) {
    const { classes } = useStyles();
    const { connectionState, setConnectionState, wallet, setWallet } = useWallet();

    return (
        <Button
            onClick={async () => {
                const { state, wallet } = await connectAndStoreWallet({ provider });
                if (state === ConnectionState.Connected) {
                    if (wallet !== null) {
                        setWallet(wallet);
                        setConnectionState(state);

                        console.log(`connected (${state}) to wallet ${wallet.address}`, onConnect);

                        if (typeof onConnect === "function") {
                            onConnect(wallet);
                        }
                    }
                }
            }}
            className={classes.button}
            size={"lg"}
            variant={"subtle"}
            fullWidth disabled={(!!wallet.address || !enabled)}>
            <Group>
                <Avatar style={{ padding: 2 }}
                        size={"md"}
                        src={`img/logos/${provider}-logo.${srcExt}`}/>
                <Text size={"md"}
                      color={"dimmed"}>{label}</Text>
            </Group>
        </Button>
    )
}
