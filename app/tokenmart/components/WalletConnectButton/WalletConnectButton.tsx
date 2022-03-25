import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";
import useWallet from "~/tokenmart-react/hooks/useWallet";
import { WalletAdapterState } from "~/tokenmart-web3/wallets";
import { EventHandler, MouseEventHandler, useCallback, useMemo } from "react";

declare let window: any;

const useStyles = createStyles((theme) => ({
    button: {
        marginBottom: `${theme.spacing.sm / 2}px`,
    }
}));

interface ConnectButtonProps {
    onClick: EventHandler<any>;
    provider: string;
    srcExt: string;
    enabled: boolean;
}

export default function WalletConnectButton({
                                          onClick,
                                          provider,
                                          srcExt,
                                          enabled = true,
                                      }: ConnectButtonProps) {
    const { classes } = useStyles();
    const { wallet, adapter, state, connect } = useWallet();

    console.log('ConnectButton :: ', { wallet, adapter, state });

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            console.log(`ConnectButton.handleClick`, wallet, adapter, connect, state);

            if (onClick) onClick(event);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            // Silently catch because any errors are caught by the context `onError` handler
            if (!event.defaultPrevented) await connect().catch(() => {});
        },
        [ onClick, connect ]
    );

    const content = useMemo(() => {
        if (state === WalletAdapterState.Connected) return 'Connected';
        return 'MetaMask';
    }, [ state ]);

    return (
        <Button
            onClick={handleClick}
            className={classes.button}
            size={"lg"}
            variant={"subtle"}
            fullWidth disabled={(adapter?.state === WalletAdapterState.Connected || !enabled)}>
            <Group>
                <Avatar style={{ padding: 2 }}
                        size={"md"}
                        src={`img/logos/${provider}-logo.${srcExt}`}/>
                <Text size={"md"}
                      color={"dimmed"}>{content}</Text>
            </Group>
        </Button>
    )
}
