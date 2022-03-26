import { Avatar, Col, createStyles, Grid, Table, Text } from "@mantine/core";
import { Link } from "remix";
import { Collection } from "~/types/collection";
import React from "react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        margin: "0 auto",
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
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
    },
    emptyCard: {
        minWidth: 186,
        minHeight: 224,
        borderRadius: 8,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    },
}));

export interface HomeTopCollectionsProps {
    collections: Collection[];
}

export const HomeTopCollections: React.FC<HomeTopCollectionsProps> = ({ collections }) => {
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
                            {collections.map((col) => {
                                return <tr key={col._id}>
                                    <td>
                                        <Text size={"lg"} weight={700}
                                              color={"dimmed"}>{col._id.substring(9, 11)}</Text>
                                    </td>
                                    <td>
                                        <Avatar size={"lg"} src={col.imageURI}> </Avatar></td>
                                    <td>
                                        <Link to={`/collections/${col.slug}`}>
                                            <Text size={"md"}>{col.title}</Text>
                                        </Link>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Grid>
        </div>
    )
}

export default HomeTopCollections;
