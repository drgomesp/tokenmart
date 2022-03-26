import { json, LoaderFunction, useLoaderData, useParams } from 'remix';
import { Avatar, Container, createStyles, Group, Tabs, Title } from "@mantine/core";
import { client as sanityClient } from "~/modules/sanity";
import { CollectionItem } from "~/types/collection";
import NFTStandardCard from "~/components/NFTStandardCard/NFTStandardCard";
import React from "react";
import { ClientOnly } from "remix-utils";

type LoaderData = {
    _id: string,
    imageURI: string,
    slug: string,
    title: string,
    items: CollectionItem[],
};

const useStyles = createStyles((theme) => ({
    background: {
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },

    wrapper: {
        margin: "0 auto",
        padding: `${theme.spacing.xl * 5}px ${theme.spacing.xl}px`,
    },

    items: {
        padding: `${theme.spacing.xl * 5}px ${theme.spacing.xl}px`,
    },

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tabControl: {
        fontWeight: 500,
        height: 38,
        color: `${theme.white} !important`,

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
        },
    },

    tabControlActive: {
        color: `${theme.colorScheme === 'dark' ? theme.white : theme.black} !important`,
        borderColor: `${theme.colors[theme.primaryColor][6]} !important`,
    },
}));

export const loader: LoaderFunction = async ({ params }) => {
    const query = `*[_type=="collections" && slug == $slug ]{
  ..., "imageURI": image.asset->url,
  "items": *[_type=='items' && references(^._id)]{ 
  ...,
  "imageURI": image.asset->url
}
}`;

    const found = await sanityClient.fetch(query, { slug: params.slug });

    if (found && found.length > 0) {
        return json(found[0]);
    }

    return json({});
};

export default function CollectionRoute() {
    const params = useParams();

    const { classes } = useStyles();
    const { _id, imageURI, title, items } = useLoaderData<LoaderData>();

    if (!_id) {
        return <>Not Found</>;
    }

    const tabs = [ "aaa", "bbb", "ccc" ].map((tab) => <Tabs.Tab label={tab} key={tab}/>);

    return (
        <div className={classes.background}>
            <div className={classes.wrapper}>
                <Container>
                    <Group mt="lg" position="center" direction="column" spacing={0}>
                        <Title order={2}>
                            <Avatar size={128} radius={80} mx="auto" mt={-30} src={imageURI}/>
                            {title}
                        </Title>

                        <Tabs
                            variant="default"
                            classNames={{
                                root: classes.tabs,
                                tabsListWrapper: classes.tabsList,
                                tabControl: classes.tabControl,
                                tabActive: classes.tabControlActive,
                            }}
                        >{tabs}</Tabs>
                    </Group>

                    <Group className={classes.items} position="left">
                        <ClientOnly fallback={<div className={""}></div>}>
                            {items.map(item => {
                                return <NFTStandardCard collection={item.title} image={item.imageURI}
                                                        number={item.number}/>;
                            })}
                        </ClientOnly>
                    </Group>
                </Container>
            </div>
        </div>
    );
}
