import { ActionIcon, Avatar, Button, createStyles, Group, Menu, Modal, Table, Text } from "@mantine/core";
import { ChevronDown, Logout, Wallet as WalletIcon } from "tabler-icons-react";
import WalletConnectButton from "~/tokenmart/components/WalletConnectButton/WalletConnectButton";
import WalletDisconnectButton from "~/tokenmart/components/WalletDisconnectButton/WalletDisconnectButton";
import { useCallback, useState } from "react";
import { ClientOnly } from "remix-utils";
import useWallet from "~/tokenmart-react/hooks/useWallet";
import { WalletAdapterState } from "~/tokenmart-web3/wallets";


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

export default function WalletConnectModal() {
    const { classes } = useStyles();
    const [ modalOpened, setModalOpened ] = useState(false);
    const { adapter, wallet } = useWallet();

    const connected = adapter && adapter?.state === WalletAdapterState.Connected;

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
                        leftIcon={!connected ? <WalletIcon size={22}/> :
                            <Avatar size={"xs"}
                                    src={"img/logos/metamask-logo.png"}/>}
                        size="sm"
                        styles={{
                            root: {
                                fontWeight: 700,
                                padding: '0 10px',
                                borderTopRightRadius: wallet ? 0 : 4,
                                borderBottomRightRadius: wallet ? 0 : 4,
                                height: 28
                            },
                        }}>
                        {!connected ?
                            "Connect Wallet" :
                            <Text style={{ fontFamily: `Greycliff CF`, }}
                                  size={"xs"}
                                  weight={300}
                                  color={"white"}>
                                {wallet?.address.substring(0, 5)}
                                ...
                                {wallet?.address?.substring(wallet?.address.length - 3, wallet?.address.length)}
                            </Text>}
                    </Button>
                    {connected ? <Menu
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

                            <WalletDisconnectButton></WalletDisconnectButton>

                        </Menu.Item>
                    </Menu> : ""}
                </Group>
            }}
        </ClientOnly>

        <Modal className={classes.modal} centered opened={modalOpened} onClose={
            () => setModalOpened(false)
        } title={<Text size={"md"} weight={100}> Connect Wallet using your favorite provider:</Text>}>
            <Table className={classes.table}>
                <tbody>
                <tr>
                    <td>
                        <WalletConnectButton onClick={useCallback(
                            (e: MouseEvent) => {
                                console.log('WalletConnectionModal.onClick');
                                setModalOpened(false);
                            }, [ setModalOpened ])}
                                             enabled={true}
                                             provider={"metamask"}
                                             srcExt={"png"}/>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Modal>
    </>
}
