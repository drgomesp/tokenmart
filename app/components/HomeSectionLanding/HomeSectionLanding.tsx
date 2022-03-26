import { Button, Col, createStyles, Grid, Group, Text, Title } from '@mantine/core';
import NFTTrendingCard from "~/components/NFTTrendingCard/NFTTrendingCard";
import { ClientOnly } from "remix-utils";
import { CollectionItem } from "~/types/collection";

const useStyles = createStyles((theme) => ({
    outer: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },

    wrapper: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
        minHeight: 500,
    },

    title: {
        marginTop: 140,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 36,
        fontWeight: 900,
        lineHeight: 1.1,
        marginBottom: theme.spacing.sm,
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

export default function HomeSectionLanding({ items }: HomeSectionLandingProps) {
    const { classes } = useStyles();

    return (
        <div className={classes.outer}>
            <div className={classes.wrapper}>
                <Grid gutter={50}>
                    <Col span={4} md={4}>
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

                        <Group spacing={"sm"}>
                            <Button
                                color={"pink"}
                                variant="outline"
                                size="sm"
                                radius="md"
                                mt="sm"
                            >
                                Sell NFTs
                            </Button>
                            <Button
                                variant="gradient"
                                gradient={{
                                    from: 'red',
                                    to: 'grape',
                                }}
                                size="sm"
                                radius="md"
                                mt="sm"
                            >
                                Explore NFTs
                            </Button>
                        </Group>
                    </Col>
                    <Col span={8} md={8}>
                        <Group>
                            {items.map(item => {
                                return <ClientOnly key={item._id} fallback={<div className={classes.emptyCard}></div>}>
                                    {() => <NFTTrendingCard collection={item.collection.title} image={item.imageURI}
                                                            number={item.number}/>}
                                </ClientOnly>
                            })}
                        </Group>
                    </Col>
                </Grid>
            </div>
        </div>
    );
}
