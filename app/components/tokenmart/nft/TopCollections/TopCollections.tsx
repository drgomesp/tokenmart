import { Avatar, Col, createStyles, Grid, Table, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
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
                                  from: 'red',
                                  to: 'grape',
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
                                    <Text size={"lg"} weight={700}
                                          color={"dimmed"}>#1</Text>
                                </td>
                                <td>
                                    <Avatar
                                        size={"lg"}
                                        src={"/img/nfts/world-of-women.gif"}>
                                    </Avatar>
                                </td>
                                <td>
                                    <Text size={"md"}>World of Women</Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Text size={"lg"} weight={700}
                                          color={"dimmed"}>#2</Text>
                                </td>
                                <td>
                                    <Avatar
                                        size={"lg"}
                                        src={"/img/nfts/degen-toonz.gif"}>
                                    </Avatar>
                                </td>
                                <td><Text size={"md"}>Degen Toonz</Text></td>
                            </tr>
                            <tr>
                                <td>
                                    <Text size={"lg"} weight={700}
                                          color={"dimmed"}>#3</Text>
                                </td>
                                <td>
                                    <Avatar
                                        size={"lg"}
                                        src={"/img/nfts/desperate-ape-wives.jpg"}>
                                    </Avatar>
                                </td>
                                <td>
                                    <Text size={"md"}>Desperate Ape Wives</Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Text size={"lg"} weight={700}
                                          color={"dimmed"}>#4</Text>
                                </td>
                                <td>
                                    <Avatar
                                        size={"lg"}
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
