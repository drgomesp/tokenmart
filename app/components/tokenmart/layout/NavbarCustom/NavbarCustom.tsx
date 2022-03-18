import React from 'react';
import { createStyles, Navbar, ScrollArea } from '@mantine/core';
import { CirclePlus, World, } from 'tabler-icons-react';
import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from '../LinksGroup/LinksGroup';

const mockdata = [
    {
        label: 'Create',
        icon: CirclePlus,
    },
    {
        label: 'Explore',
        icon: World,
        initiallyOpened: true,
        links: [
            { label: 'Collections', link: '/' },
        ],
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },
}));

export default function NavbarCustom() {
    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item}
                                                     key={item.label}/>);

    return (
        <Navbar height={800} width={{ sm: 300 }} p="md"
                className={classes.navbar}>

            <Navbar.Section grow className={classes.links}
                            component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UserButton
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name="Ann Nullpointer"
                    email="anullpointer@yahoo.com"
                />
            </Navbar.Section>
        </Navbar>
    );
}
