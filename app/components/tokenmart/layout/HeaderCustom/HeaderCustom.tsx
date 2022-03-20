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
    Header,
    Menu,
    Modal,
    Table,
    Text,
} from '@mantine/core';
import { ChevronDown, Logout, Wallet } from 'tabler-icons-react';
import { useState } from "react";
import ConnectButton
    from "~/components/tokenmart/wallet/ConnectButton/ConnectButton";

declare let window: any;

const HEADER_HEIGHT = 50;

const useStyles = createStyles((theme) => ({
    outer: {
        borderBottom: `1px solid ${theme.colors.gray[4]}`
    },
    inner: {
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
            width: 200,
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
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

interface HeaderActionProps {
    links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderCustom({ links }: HeaderActionProps) {
    const { classes } = useStyles();

    let address: string | null = null;
    if (typeof window !== 'undefined') {

        // const sig = await signer.signMessage("Hello World");
        window.ethereum.on('accountsChanged', (addr: any) => {
            if (!addr || addr.length === 0) {
                localStorage.removeItem("address");
                location.reload();
            }
        })

        window.ethereum.on('chainChanged', () => {
            console.log('networkChanged')
        })

        address = localStorage.getItem("address")
    }

    const items = links.map((link) => {
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
        <>
            <Header height={HEADER_HEIGHT}
                    sx={{
                        borderBottom: classes.outer,
                        maxWidth: 960,
                        margin: '0 auto'
                    }}>
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
                                      from: 'grape',
                                      to: 'orange',
                                      deg: 45
                                  }}>TokenMart</Text>
                        </Anchor>
                    </Group>
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>

                    <Group noWrap spacing={0}>
                        <Button
                            onClick={() => !address ? setModalModalOpened(true) : undefined}
                            variant="gradient"
                            gradient={{
                                from: 'grape',
                                to: 'orange',
                                deg: 90
                            }}
                            leftIcon={!address ? <Wallet size={20}/> :
                                <Avatar size={"xs"}
                                        src={"img/logos/metamask-logo.png"}/>}
                            size="md"
                            // radius="md"
                            styles={{
                                root: {
                                    paddingRight: address ? 8 : 15,
                                    paddingLeft: 12,
                                    borderTopRightRadius: address ? 0 : 4,
                                    borderBottomRightRadius: address ? 0 : 4,
                                    height: 32
                                },
                                rightIcon: { marginLeft: 5 },
                            }}>
                            {!address ? "Connect Wallet" :
                                <Text style={{
                                    fontFamily: `Greycliff CF`,
                                }}
                                      size={"sm"} weight={500}
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
                                    color={"orange"}
                                    size={32}>
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
                                        right: 5,
                                        pointerEvents: 'none',
                                        zIndex: 999,
                                    }} variant="gradient" gradient={{
                                        from: 'orange',
                                        to: 'red'
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
                                        right: 5,
                                        marginTop: 0,
                                        pointerEvents: 'none',
                                        zIndex: 999,
                                    }} variant="gradient" gradient={{
                                        from: 'orange',
                                        to: 'red'
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
            </Header>
        </>
    );

}
