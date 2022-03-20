import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";
import { ethers } from 'ethers'

declare let window: any;

const useStyles = createStyles((theme) => ({
    button: {
        marginBottom: `${theme.spacing.sm / 2}px`,
    }
}));

interface ConnectButtonProps {
    provider: string;
    label: string;
    srcExt: string;
    enabled: boolean;
}

interface ConnectArgs {
    provider: string;
}

async function connect(args: ConnectArgs) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    if (address) {
        if (typeof window !== 'undefined') {
            localStorage.setItem("address", address);
        }
    }
}

export default function ConnectButton({
                                          provider,
                                          label,
                                          srcExt,
                                          enabled = true,
                                      }: ConnectButtonProps) {
    const { classes } = useStyles();

    const address = localStorage.getItem("address");

    return (
        <Button
            onClick={async () => {
                await connect({ provider })
            }}
            className={classes.button}
            size={"lg"}
            variant={"subtle"}
            fullWidth disabled={(!!address || !enabled)}>
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
