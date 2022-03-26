import { Avatar, Col, createStyles, Grid, Table, Text } from "@mantine/core";
import { FC } from "react";
import { Link } from "remix";
import { Collection } from "~/types/collection";

const useStyles = createStyles((theme) => ({
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
}));

export interface HomeTopCollectionsProps {
    collections: Collection[];
}

export const HomeTopCollections: FC<HomeTopCollectionsProps> = ({ collections }) => {
    const { classes } = useStyles();

    return (
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
    )
}

export default HomeTopCollections;
