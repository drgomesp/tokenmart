import { Badge, Card, createStyles, Group, Text } from "@mantine/core";
import NFTImage from "~/components/NFTImage/NFTImage";

interface TrendingProps {
    number: number;
    image: string;
    collection: string;
}

const useStyles = createStyles((theme) => ({
    card: {
        maxWidth: 215,
        maxHeight: "265px",
        border: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    imageSection: {
        // padding: `${theme.spacing.sm}px ${theme.spacing.sm}px 0`,
        display: 'flex',
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs + 2,
        pointerEvents: 'none',
    },

    infoSection: {
        paddingLeft: "5px",
    }
}));


export default function NFTTrendingCard({
                                            collection,
                                            number,
                                            image
                                        }: TrendingProps) {
    const { classes } = useStyles();

    return <Card withBorder p="xs" className={classes.card} radius="md">
        <Card.Section className={classes.imageSection}>
            <NFTImage uri={image}/>
        </Card.Section>

        <Badge className={classes.rating} variant="gradient"
               gradient={{
                   from: 'grape',
                   to: 'indigo',
               }}>
            Trending
        </Badge>

        <Group position="apart" mt="xs">
            <Text size="xs" weight={500}
                  color="dimmed">{collection}</Text>
            <Badge size="md" radius="xl" variant={"dot"}>
                #{number}
            </Badge>
        </Group>
    </Card>
}

