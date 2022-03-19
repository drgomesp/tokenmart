import { Avatar, Col, createStyles, Grid, Table, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
        backgroundColor: "white",
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
    table: {
        margin: `${theme.spacing.xl}px auto`,
        maxWidth: 300,
    }
}));

export default function TopCollections() {
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
                            Top Collections
                        </Text>
                        <Text color={"dimmed"}>
                            Find out what collections are trending
                        </Text>
                    </div>

                    <div>
                        <Table className={classes.table} verticalSpacing="xs">
                            <tbody>
                            <tr>
                                <td>
                                    <Avatar
                                        size={"md"}
                                        src={"/img/nfts/world-of-women.gif"}>
                                    </Avatar>
                                </td>
                                <td>
                                    <Text size={"md"}>World of Women</Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Avatar
                                        size={"md"}
                                        src={"/img/nfts/degen-toonz.gif"}>
                                    </Avatar>
                                </td>
                                <td><Text size={"md"}>Degen Toonz</Text></td>
                            </tr>
                            <tr>
                                <td>
                                    <Avatar
                                        size={"md"}
                                        src={"/img/nfts/desperate-ape-wives.jpg"}>
                                    </Avatar>
                                </td>
                                <td>
                                    <Text size={"md"}>Desperate Ape Wives</Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Avatar
                                        size={"md"}
                                        src={"/img/nfts/bored-ape.png"}>
                                    </Avatar>
                                </td>
                                <td><Text size={"md"}>Bored Ape</Text></td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Grid>
        </div>
    )
}
