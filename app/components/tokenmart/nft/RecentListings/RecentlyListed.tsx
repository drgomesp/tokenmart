import { Col, createStyles, Grid, Group, Text } from "@mantine/core";
import React from "react";
import StandardCard from "~/components/tokenmart/nft/StandardCard/StandardCard";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
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
    }
}));

export default function RecentListings() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Grid gutter={50} className={classes.child}>
                <Col span={12} md={12}>
                    <div className={classes.title}>
                        <Text className={classes.subtitle}
                              component="span" variant="gradient"
                              gradient={{
                                  from: 'grape',
                                  to: 'orange',
                                  deg: 128,
                              }}>
                            New Listings
                        </Text>
                        <Text color={"dimmed"}>
                            Discover the most wanted items of right now
                        </Text>
                    </div>
                </Col>

                <Group className={classes.purchases}>
                    <StandardCard collection="Bored Ape"
                                  image={`img/nfts/bored-ape/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>

                    <StandardCard collection="Ape Wives"
                                  image={`img/nfts/desperate-ape-wives/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>

                    <StandardCard collection="Degen Toonz"
                                  image={`img/nfts/degen-toonz/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>
                </Group>
            </Grid>
        </div>
    )
}
