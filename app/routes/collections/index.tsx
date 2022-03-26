import { createStyles, List, ListItem, Title } from "@mantine/core";
import { client as sanityClient } from "~/modules/sanity";
import { Collection } from "~/types/collection";
import { json, Link, LoaderFunction, useLoaderData } from "remix";

type LoaderData = Collection[];

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
    },
}));

export const loader: LoaderFunction = async ({ params }) => {
    const query = `*[_type == "collections" ] {_id, title, slug, "imageURI": image.asset->url}`;

    return json(await sanityClient.fetch(query, {}));
};

export default function Index() {
    const collections = useLoaderData<LoaderData>();

    return (
        <>
            <Title order={2}>Collections</Title>

            <List>
                {collections.map((c) => {
                    return <ListItem key={c._id}>
                        <Link to={`/collections/${c.slug}`} reloadDocument>{c.title}</Link>;
                    </ListItem>
                })}
            </List>
        </>
    );
}
