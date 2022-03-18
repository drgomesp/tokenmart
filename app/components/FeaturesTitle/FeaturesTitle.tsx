import React from 'react';
import {
    Button,
    Col,
    createStyles,
    Grid,
    Group,
    Text,
    ThemeIcon,
    Title
} from '@mantine/core';
import { CircleDotted, FileCode, Flame, ReceiptOff } from 'tabler-icons-react';
import Trending from "~/components/tokenmart/nft/Trending";

const useStyles = createStyles((theme) => ({
    wrapper: {
        maxWidth: 960,
        margin: '0 auto',
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
        minHeight: 750,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 36,
        fontWeight: 900,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

const features = [
    {
        icon: ReceiptOff,
        title: 'Free and open source',
        description: 'All packages are published under MIT license, you can use Mantine in any project',
    },
    {
        icon: FileCode,
        title: 'TypeScript based',
        description: 'Build type safe applications, all components and hooks export types',
    },
    {
        icon: CircleDotted,
        title: 'No annoying focus ring',
        description:
            'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
    },
    {
        icon: Flame,
        title: 'Flexible',
        description:
            'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    },
];

export function FeaturesTitle() {
    const { classes } = useStyles();

    const items = features.map((feature) => (
        <div key={feature.title}>
            <ThemeIcon
                size={48}
                radius="lg"
                variant="gradient"
                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            >
                <feature.icon size={26}/>
            </ThemeIcon>
            <Text size="lg" mt="sm" weight={500}>
                {feature.title}
            </Text>
            <Text color="dimmed" size="sm">
                {feature.description}
            </Text>
        </div>
    ));

    const stats = [ {
        title: "price",
        value: "0.05 ETH"
    }, { title: "price", value: "0.05 ETH" }
    ];

    return (
        <div className={classes.wrapper}>
            <Grid gutter={50}>
                <Col span={6} md={6}>

                    <Title className={classes.title}>
                        <Title className={classes.title}>
                            <Text component="span" variant="gradient"
                                  gradient={{
                                      from: 'grape',
                                      to: 'orange',
                                      deg: 178,
                                  }} inherit>
                                Discover, Collect, Create and Sell
                            </Text>
                            <Text color="dimmed">
                                The marketplace for your most valuable NFTs
                            </Text>
                        </Title>
                    </Title>

                    <Group spacing={"sm"}>
                        <Button
                            color={"pink"}
                            variant="outline"
                            size="sm"
                            radius="md"
                            mt="sm"
                        >
                            Sell NFTs
                        </Button>
                        <Button
                            variant="gradient"
                            gradient={{ deg: 133, from: 'pink', to: 'red' }}
                            size="sm"
                            radius="md"
                            mt="sm"
                        >
                            Explore NFTs
                        </Button>
                    </Group>
                </Col>
                <Col span={6} md={6}>
                    <Group>
                        <Trending collection="Ape Wives"
                                  image={`img/nfts/desperate-ape-wives/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={349} stats={stats}/>
                        <Trending collection="Degen Toonz"
                                  image={`img/nfts/degen-toonz/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={217} stats={stats}/>
                        <Trending collection="The Doge Pound"
                                  image={`img/nfts/the-doge-pound/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={763} stats={stats}/>
                        <Trending collection="World of Women"
                                  image={`img/nfts/world-of-women/${Math.floor(Math.random() * 10) + 1}.png`}
                                  id={122} stats={stats}/>
                    </Group>
                </Col>
            </Grid>
        </div>
    );
}
