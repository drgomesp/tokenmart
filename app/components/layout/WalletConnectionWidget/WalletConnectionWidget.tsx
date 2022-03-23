import { ActionIcon, Avatar, Badge, Button, createStyles, Group, Menu, Modal, Table, Text } from "@mantine/core";
import { ChevronDown, Logout, Wallet as WalletIcon } from "tabler-icons-react";
import ConnectButton from "~/components/wallet/ConnectButton/ConnectButton";
import { useState } from "react";
import { ClientOnly } from "remix-utils";
import { useWallet } from "~/components/context/WalletContext";
import { ConnectionState } from "~/modules/wallet/connection";

const useStyles = createStyles((theme) => ({
    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    providerButton: {
        root: {
            height: 60,
            maxWidth: 200,
        }
    },
    table: {
        maxWidth: 235,
    },
    modal: {
        maxWidth: 285,
        margin: "0 auto"
    },
    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white}`,
    },
    disconnectBtn: {
        background: "none",
        ["&:hover"]: {
            background: "none",
        }
    },
    fallbackBtn: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
        height: 28,
        width: 152,
    }
}));

function handleDisconnect(setConnectionState: (s: ConnectionState) => void) {
    setConnectionState(ConnectionState.Disconnected);
    sessionStorage.removeItem("address");
    location.reload();
}

export default function WalletConnectionWidget() {
    const { classes } = useStyles();
    const [ modalOpened, setModalOpened ] = useState(false);
    const { connectionState, setConnectionState, wallet } = useWallet();

    return <>
        <ClientOnly fallback={<Button className={classes.fallbackBtn}></Button>}>
            {() => {
                return <Group noWrap spacing={0}>
                    <Button
                        onClick={() => setModalOpened(true)}
                        variant="gradient"
                        gradient={{
                            from: 'red',
                            to: 'grape',
                        }}
                        leftIcon={!wallet?.address ? <WalletIcon size={22}/> :
                            <Avatar size={"xs"}
                                    src={"img/logos/metamask-logo.png"}/>}
                        size="sm"
                        styles={{
                            root: {
                                fontWeight: 700,
                                padding: '0 10px',
                                borderTopRightRadius: wallet?.address ? 0 : 4,
                                borderBottomRightRadius: wallet?.address ? 0 : 4,
                                height: 28
                            },
                        }}>
                        {connectionState === ConnectionState.Disconnected ?
                            "Connect Wallet" : <Text style={{
                                fontFamily: `Greycliff CF`,
                            }}
                                                     size={"xs"}
                                                     weight={300}
                                                     color={"white"}>
                                {wallet?.address?.substring(0, 5)}
                                ...
                                {wallet?.address?.substring(wallet?.address.length - 3, wallet?.address.length)}
                            </Text>}
                    </Button>
                    {connectionState === ConnectionState.Connected ? <Menu
                        control={
                            <ActionIcon
                                className={classes.menuControl}
                                variant="filled"
                                color={"grape"}
                                size={28}>
                                <ChevronDown size={20}/>
                            </ActionIcon>
                        }
                        transition="pop"
                        placement="end">

                        <Menu.Item color={"gray"}
                                   icon={<Logout size={16}/>}>
                            <Button className={classes.disconnectBtn}
                                    onClick={() => handleDisconnect(setConnectionState)}>
                                Disconnect
                            </Button>
                        </Menu.Item>
                    </Menu> : ""}
                </Group>
            }}
        </ClientOnly>

        <Modal className={classes.modal}
               centered
               opened={modalOpened}
               onClose={() => setModalOpened(false)}
               title={<Text size={"md"} weight={100}>
                   Connect Wallet using your favorite
                   provider:</Text>}>
            <Table className={classes.table}>
                <tbody>
                <tr>
                    <td>
                        <ConnectButton onConnect={w => {
                            setModalOpened(false)
                        }} enabled={true}
                                       provider={"metamask"}
                                       label={"MetaMask"}
                                       srcExt={"png"}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Badge style={{
                            position: 'relative',
                            top: 15,
                            left: 175,
                            pointerEvents: 'none',
                            zIndex: 999,
                        }} variant="gradient" gradient={{
                            from: 'indigo',
                            to: 'pink',
                        }}>soon</Badge>
                        <ConnectButton onConnect={w => {
                            setModalOpened(false)
                        }} enabled={false}
                                       provider={"walletconnect"}
                                       label={"walletconnect"}
                                       srcExt={"webp"}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Badge style={{
                            position: 'relative',
                            top: 15,
                            left: 175,
                            marginTop: 0,
                            pointerEvents: 'none',
                            zIndex: 999,
                        }} variant="gradient" gradient={{
                            from: 'indigo',
                            to: 'pink',
                        }}>soon</Badge>
                        <ConnectButton onConnect={w => {
                            setModalOpened(false)
                        }} enabled={false}
                                       provider={"fortmatic"}
                                       label={"Fortmatic"}
                                       srcExt={"webp"}/>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Modal>
    </>
}
