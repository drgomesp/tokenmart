import { Button, createStyles } from "@mantine/core";
import { MouseEventHandler, useCallback } from "react";
import useWallet from "~/tokenmart-react/hooks/useWallet";

declare let window: any;

const useStyles = createStyles((theme) => ({
    button: {
        marginBottom: `${theme.spacing.sm / 2}px`,
    },
    disconnectBtn: {
        background: "none",
        ["&:hover"]: {
            background: "none",
        }
    },
}));

interface DisconnectButtonProps {}

export default function WalletDisconnectButton({}: DisconnectButtonProps) {
    const { classes } = useStyles();
    const { wallet, adapter, disconnect } = useWallet();

    const handleDisconnect: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {

            await disconnect();
            console.log(`WalletConnectionModal :: disconnected`, wallet, adapter);
        },
        [ adapter, wallet ]
    );

    return (
        <Button className={classes.disconnectBtn}
                onClick={handleDisconnect}>
            Disconnect
        </Button>
    )
}
