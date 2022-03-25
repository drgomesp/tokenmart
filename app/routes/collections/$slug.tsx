import { json, LoaderFunction, useLoaderData, useParams } from 'remix';
import { Avatar, createStyles } from "@mantine/core";
import { client as sanityClient } from "~/modules/sanity";
import NFTImage from "~/components/NFTImage/NFTImage";
import { CollectionItem } from "~/types/collection";

type LoaderData = {
    _id: string,
    imageURI: string,
    slug: string,
    title: string,
    items: CollectionItem[],
};

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
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

    console.log(found)
    if (found) {
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

    console.log(items);
    return (
        <div className={classes.wrapper}>
            <Avatar size={"xl"} src={imageURI}/>
            <h2>{title}</h2>

            {items.length > 0 ? items.map(item => {
                return <NFTImage key={item._id} style={{ width: 300 }} id={item.number} uri={item.imageURI}/>;
            }) : <></>}
        </div>
    );
}
