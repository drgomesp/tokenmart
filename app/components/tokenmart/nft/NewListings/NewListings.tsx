import { Col, createStyles, Grid, Group, Text } from "@mantine/core";
import React from "react";
import StandardCard from "~/components/tokenmart/nft/StandardCard/StandardCard";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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

export default function NewListings() {
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
                            New Listings
                        </Text>
                        <Text color={"dimmed"}>
                            Discover the most wanted items of right now
                        </Text>
                    </div>
                </Col>

                <Group className={classes.purchases}>
                    <StandardCard collection="Degen Toonz"
                                  image={`img/nfts/degen-toonz/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>

                    <StandardCard collection="Ape Wives"
                                  image={`img/nfts/desperate-ape-wives/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>
                    <StandardCard collection="World of Women"
                                  image={`img/nfts/world-of-women/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349}/>
                </Group>
            </Grid>
        </div>
    )
}
