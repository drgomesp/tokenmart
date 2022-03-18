import { Badge, Card, createStyles, Group, Image, Text } from "@mantine/core";

interface TrendingProps {
    id: number;
    image: string;
    collection: string;
    stats: {
        title: string;
        value: string;
    }[];
}

const useStyles = createStyles((theme) => ({
    card: {
        maxWidth: "186px",
        maxHeight: "224px",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    imageSection: {
        // padding: `${theme.spacing.sm}px ${theme.spacing.sm}px 0`,
        display: 'flex',
    },

    infoSection: {
        paddingLeft: "10px",
    }
}));

export default function Trending({
                                     collection,
                                     id,
                                     image,
                                     stats
                                 }: TrendingProps) {
    const { classes } = useStyles();

    const items = stats.map((stat) => (
        <div key={stat.title}>
            <Text size="xs" color="dimmed">
                {stat.title}
            </Text>
            <Text weight={500} size="sm">
                {stat.value}
            </Text>
        </div>
    ));

    return <Card withBorder p="xs" className={classes.card} radius="md">
        <Card.Section className={classes.imageSection}>
            <Image src={image}/>
        </Card.Section>

        <Group position="apart" mt="xs">
            <Text size="xs" weight={500} color="dimmed">{collection}</Text>
            <Badge size="sm" radius="xl">#{Math.floor(Math.random() * 998) + 1}
            </Badge>
        </Group>
    </Card>
}

