import { ActionIcon, Container, createStyles, Group, Text } from '@mantine/core';
import { BrandInstagram, BrandTwitter, BrandYoutube } from 'tabler-icons-react';
import links from './links'

const useStyles = createStyles((theme) => ({
    footer: {
        padding: `0 ${theme.spacing.lg}px ${theme.spacing.lg}px`,
        position: "relative",
        width: '100%',
        bottom: -50,
    },

    logo: {
        maxWidth: 200,

        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl * 1.5,
        paddingTop: theme.spacing.xl / 2,
        paddingBottom: theme.spacing.xl / 2,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0]
        }`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

export default function LayoutFooter() {
    const { classes } = useStyles();

    const groups = links().map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Text size="xs" color="dimmed"
                          className={classes.description}>
                        Build fully functional accessible web applications
                        faster than ever
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    ?? 2020 mantine.dev. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right"
                       noWrap>
                    <ActionIcon size="lg">
                        <BrandTwitter size={18}/>
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={18}/>
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18}/>
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
