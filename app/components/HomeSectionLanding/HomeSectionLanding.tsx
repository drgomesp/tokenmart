import { Button, Container, createStyles, Grid, Group, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { CollectionItem } from "~/types/collection";
import { ClientOnly } from "remix-utils";
import NFTTrendingCard from "~/components/NFTTrendingCard/NFTTrendingCard";

const useStyles = createStyles((theme) => ({
    outer: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },

    wrapper: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 2}px`,
    },

    lead: {
        maxWidth: 350,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 36,
        fontWeight: 900,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    emptyCard: {
        minWidth: 186,
        minHeight: 224,
        borderRadius: 8,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
}));

export interface HomeSectionLandingProps {
    items: CollectionItem[];
}

const PRIMARY_COL_HEIGHT = 300;

export default function HomeSectionLanding({ items }: HomeSectionLandingProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <div className={classes.outer}>
            <div className={classes.wrapper}>
                <Container my="md">
                    <SimpleGrid cols={2} spacing="sm" breakpoints={[ { maxWidth: 'sm', cols: 2 } ]}>
                        <Group className={classes.lead}>
                            <Title order={2} className={classes.title}>
                                <Text className={classes.title}>
                                    <Text component="span" variant="gradient"
                                          gradient={{
                                              from: 'red',
                                              to: 'grape',
                                          }} inherit>
                                        Discover, Collect, Create and Sell
                                    </Text>
                                    <Text weight={500} color="dimmed">
                                        The marketplace for your most valuable NFTs
                                    </Text>
                                </Text>
                            </Title>
                            <Button
                                color={"pink"}
                                variant="outline"
                                size="sm"
                                radius="md">
                                Sell NFTs
                            </Button>
                            <Button
                                variant="gradient"
                                gradient={{
                                    from: 'red',
                                    to: 'grape',
                                }}
                                size="sm"
                                radius="md">
                                Explore NFTs
                            </Button>
                        </Group>
                        <Grid gutter="md">
                            <Grid.Col>
                                <Group direction={"row"}>
                                    {items.slice(0, 4).map(item => {
                                        return <ClientOnly key={item._id}
                                                           fallback={<div className={classes.emptyCard}></div>}>
                                            {() => <NFTTrendingCard collection={item.collection.title}
                                                                    image={item.imageURI}
                                                                    number={item.number}/>}
                                        </ClientOnly>
                                    })}
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>
                </Container>
            </div>
        </div>
    );
}
