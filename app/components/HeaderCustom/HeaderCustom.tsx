import {
    Burger,
    Button,
    Center,
    Container,
    createStyles,
    Group,
    Header,
    Menu,
    Text,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown, Wallet } from 'tabler-icons-react';

const HEADER_HEIGHT = 50;

const useStyles = createStyles((theme) => ({
    outer: {
        borderBottom: `1px solid ${theme.colors.gray[7]}`
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
}));

interface HeaderActionProps {
    links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderCustom({ links }: HeaderActionProps) {
    const { classes } = useStyles();
    const [ opened, toggleOpened ] = useBooleanToggle(false);
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
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
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
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </a>
        );
    });

    return (
        <Header height={HEADER_HEIGHT}
                sx={{
                    borderBottom: classes.outer,
                    maxWidth: 960,
                    margin: '0 auto'
                }}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                    <Text size="xl" weight="700"
                          variant="gradient"
                          gradient={{
                              from: 'grape',
                              to: 'orange',
                              deg: 45
                          }}>TokenMart</Text>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Button variant="gradient"
                        gradient={{
                            from: 'grape',
                            to: 'orange',
                            deg: 45
                        }}
                        rightIcon={<Wallet size={20}/>}
                        size="md"
                        radius="md"
                        styles={{
                            root: {
                                paddingRight: 8,
                                paddingLeft: 12,
                                height: 32
                            },
                            rightIcon: { marginLeft: 5 },
                        }}>
                    Connect Wallet
                </Button>
            </Container>
        </Header>
    );
}
