import { Col, createStyles, Grid, Group, Text } from "@mantine/core";
import React from "react";
import NFTStandardCard from "~/components/NFTStandardCard/NFTStandardCard";
import { ClientOnly } from "remix-utils";
import { CollectionItem } from "~/types/collection";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    },

    child: {
        margin: "0 auto",
        maxWidth: 960,
    },

    title: {},

    subtitle: {
        marginTop: 140,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1.1,
        marginBottom: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    purchases: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl * 1.25}px`,
        margin: "0 auto",
    },

    emptyCard: {
        minWidth: 256,
        minHeight: 358,
        borderRadius: 8,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
}));

interface HomeSectionRecentPurchasesProps {
    items: CollectionItem[];
}

export const HomeSectionRecentPurchases: React.FC<HomeSectionRecentPurchasesProps> = ({ items }) => {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Grid gutter={50} className={classes.child}>
                <Col span={12} md={12}>
                    <div className={classes.title}>
                        <Text className={classes.subtitle}
                              component="span" variant="gradient"
                              gradient={{
                                  from: 'red',
                                  to: 'grape',
                              }}>
                            Recent Purchases
                        </Text>
                        <Text color={"dimmed"}>
                            Discover the most wanted items of right now
                        </Text>
                    </div>
                </Col>

                <Group className={classes.purchases}>
                    {items.map(item =>
                        <ClientOnly key={item._id} fallback={<div className={classes.emptyCard}></div>}>
                            {() => <NFTStandardCard collection={item.collection.title} image={item.imageURI}
                                                    number={item.number}/>}
                        </ClientOnly>
                    )}
                </Group>
            </Grid>
        </div>
    )
}

export default HomeSectionRecentPurchases;
