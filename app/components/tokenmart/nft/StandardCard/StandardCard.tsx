import {
    Badge,
    Button,
    Card,
    createStyles,
    Group,
    Image,
    Text
} from "@mantine/core";

interface TrendingProps {
    id: number;
    image: string;
    collection: string;
}

const useStyles = createStyles((theme) => ({
    card: {
        maxWidth: 256,
        maxHeight: 525,
        border: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    imageSection: {
        display: 'flex',
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs + 2,
        pointerEvents: 'none',
    },

    infoSection: {
        marginTop: 10,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
    },

    infoSymbol: {
        marginRight: -25,
    }
}));

export default function StandardCard({ collection, image, }: TrendingProps) {
    const { classes } = useStyles();

    return <Card withBorder p="xs" className={classes.card} radius="md">
        <Card.Section className={classes.imageSection}>
            <Image src={image}/>
        </Card.Section>

        <Group position="apart" mt="xs">
            <Text size="xs" weight={500}
                  color="dimmed">{collection}</Text>
            <Badge size="sm" radius="xl" variant={"dot"}>
                #{Math.floor(Math.random() * 998) + 1}
            </Badge>
        </Group>

        <Card.Section className={classes.infoSection}>
            <Group spacing={15} position={"apart"}>
                <Image className={classes.infoSymbol}
                       src={"img/ethereum-symbol.png"}
                       width={12}></Image>
                <div>
                    <Text size="xl" weight={700}
                          sx={{ lineHeight: 1 }}>
                        ETH
                        0.{Math.floor(Math.random() * 10) + 1}
                    </Text>
                    <Text size="md" color="dimmed" weight={500}
                          sx={{ lineHeight: 1 }} mt={3}>
                        (${Math.floor(Math.random() * 10) + 1}{Math.floor(Math.random() * 10) + 1}0.32)
                    </Text>
                </div>


                <Button radius="xl"
                        style={{
                            marginLeft: 25,
                            flex: 1,
                            maxWidth: 65,
                        }}
                        variant="gradient"
                        gradient={{ from: 'purple', to: 'grape' }}>
                    Buy
                </Button>
            </Group>
        </Card.Section>
    </Card>
}

