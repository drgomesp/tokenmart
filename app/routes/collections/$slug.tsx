import { json, LoaderFunction, useLoaderData, useParams } from 'remix';
import { Avatar, createStyles } from "@mantine/core";
import { client as sanityClient } from "~/modules/sanity";
import { Collection } from "~/types/collection";

type LoaderData = Collection;

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
    },
}));

export const loader: LoaderFunction = async ({ params }) => {
    const query = `*[_type == "collections" && slug == $slug ] {_id, title, slug, "imageURI": image.asset->url}`;
    const found = await sanityClient.fetch(query, { slug: params.slug });

    if (found) {
        return json(found[0]);
    }

    return json({});
};

export default function CollectionRoute() {
    const params = useParams();

    console.log(params)

    const { classes } = useStyles();
    const { title, slug, imageURI } = useLoaderData<LoaderData>();
    console.log(slug)

    if (!slug) {
        return <>Not Found</>;
    }

    return (
        <div className={classes.wrapper}>
            <Avatar size={"xl"} src={imageURI}/>
            <h2>{title}</h2>
        </div>
    );
}
