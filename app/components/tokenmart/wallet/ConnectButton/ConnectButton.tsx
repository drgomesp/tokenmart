import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    button: {
        marginBottom: `${theme.spacing.sm / 2}px`,
    }
}));


interface ConnectButtonProps {
    provider: string;
    label: string;
    srcExt: string;
    onClick: any;
    enabled: boolean;
}

export default function ConnectButton({
                                          provider,
                                          label,
                                          srcExt,
                                          onClick,
                                          enabled = true,
                                      }: ConnectButtonProps) {
    const { classes } = useStyles();

    return (
        <Button onClick={onClick}
                className={classes.button}
                size={"lg"}
                variant={"subtle"}
                fullWidth disabled={!enabled}>
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
