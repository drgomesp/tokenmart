import { Anchor, Center, Container, createStyles, Group, Header as MantineHeader, Menu, Text, } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import links from './links'
import ColorSchemeToggle from "~/tokenmart/components/layout/ColorSchemeToggle/ColorSchemeToggle";
import WalletConnectionWidget from "~/tokenmart/components/layout/WalletConnectionWidget/WalletConnectionWidget";

const HEADER_HEIGHT = 50;

const useStyles = createStyles((theme) => ({
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
}));

export default function Header() {
    const { classes } = useStyles();

    const items = links().map((link) => {
        // @ts-ignore
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <>
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
                        }>
                        {menuItems}
                    </Menu>
                </>
            );
        }

        return (
            <a key={link.label}
               href={link.link}
               className={classes.link}>
                {link.label}
            </a>
        );
    });

    return (
        <MantineHeader style={{ border: 0 }} height={HEADER_HEIGHT}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Anchor href={"/"}>
                        <Text size="xl" weight="700"
                              variant="gradient"
                              gradient={{
                                  from: 'red',
                                  to: 'grape',
                              }}>TokenMart</Text>
                    </Anchor>
                    <ColorSchemeToggle/>
                </Group>
                <Group spacing={10} className={classes.links}>
                    {items}
                </Group>

                <WalletConnectionWidget/>
            </Container>
        </MantineHeader>
    );

}
