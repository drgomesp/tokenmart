import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Burger,
    Button,
    Center,
    Container,
    createStyles,
    Group,
    Header as MantineHeader,
    Menu,
    Modal,
    Table,
    Text,
} from '@mantine/core';
import { ChevronDown, Logout, Wallet } from 'tabler-icons-react';
import { useState } from "react";
import ConnectButton from "~/components/wallet/ConnectButton/ConnectButton";
import links from './links'

declare let window: any;

const HEADER_HEIGHT = 50;

const useStyles = createStyles((theme) => ({
    wrapper: {
        // borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.dark[0]}`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.dark[0],
    },
    inner: {
        maxWidth: 960,
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    linkLabel: {
        marginRight: 5,
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
}));

export function NavHeader() {
    const { classes } = useStyles();

    let address: string | null = null;
    if (typeof window !== 'undefined') {

        // const sig = await signer.signMessage("Hello World");
        window.ethereum.on('accountsChanged', (address: any) => {
            if (!address || address.length === 0) {
                localStorage.removeItem("address");
                location.reload();
            }
        })

        window.ethereum.on('chainChanged', () => {
            console.log('networkChanged')
        })

        address = localStorage.getItem("address")
    }

    const items = links().map((link) => {
        // @ts-ignore
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu
                    key={link.label}
                    trigger="hover"
                    delay={0}
                    transitionDuration={0}
                    placement="end"
                    gutter={1}
                    control={
                        <a href={link.link} className={classes.link}>
                            <Center>
                                <span
                                    className={classes.linkLabel}>{link.label}</span>
                                <ChevronDown size={12}/>
                            </Center>
                        </a>
                    }
                >
                    {menuItems}
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {link.label}
            </a>
        );
    });

    const [ modalOpened, setModalModalOpened ] = useState(false);

    return (
        <div className={classes.wrapper}>
            <MantineHeader height={HEADER_HEIGHT}>
                <Container className={classes.inner} fluid>
                    <Group>
                        <Burger
                            opened={modalOpened}
                            onClick={() => setModalModalOpened(true)}
                            className={classes.burger}
                            size="sm"
                        />
                        <Anchor href={"/"}>
                            <Text size="xl" weight="700"
                                  variant="gradient"
                                  gradient={{
                                      from: 'red',
                                      to: 'grape',
                                  }}>TokenMart</Text>
                        </Anchor>
                    </Group>
                    <Group spacing={10} className={classes.links}>
                        {items}
                    </Group>

                    <Group noWrap spacing={0}>
                        <Button
                            onClick={() => !address ? setModalModalOpened(true) : undefined}
                            variant="gradient"
                            gradient={{
                                from: 'red',
                                to: 'grape',
                            }}
                            leftIcon={!address ? <Wallet size={22}/> :
                                <Avatar size={"xs"}
                                        src={"img/logos/metamask-logo.png"}/>}
                            size="sm"
                            // radius="md"
                            styles={{
                                root: {
                                    fontWeight: 700,
                                    padding: '0 10px',
                                    borderTopRightRadius: address ? 0 : 4,
                                    borderBottomRightRadius: address ? 0 : 4,
                                    height: 28
                                },
                            }}>
                            {!address ? "Connect Wallet" :
                                <Text style={{
                                    fontFamily: `Greycliff CF`,
                                }}
                                      size={"xs"} weight={300}
                                      color={"white"}>
                                    {address.substring(0, 5)}
                                    ...
                                    {address.substring(address.length - 3, address.length)}
                                </Text>}
                        </Button>
                        {address ? <Menu
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
                                Disconnect
                            </Menu.Item>
                        </Menu> : ""}
                    </Group>

                    <Modal className={classes.modal}
                           centered
                           opened={modalOpened}
                           onClose={() => setModalModalOpened(false)}
                           title={<Text size={"md"} weight={100}>
                               Connect Wallet using your favorite
                               provider:</Text>}
                    >
                        <Table className={classes.table}>
                            <tbody>
                            <tr>
                                <td>
                                    <ConnectButton enabled={true}
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
                                    <ConnectButton enabled={false}
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
                                    <ConnectButton enabled={false}
                                                   provider={"fortmatic"}
                                                   label={"Fortmatic"}
                                                   srcExt={"webp"}/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal>
                </Container>
            </MantineHeader>
        </div>
    );

}
