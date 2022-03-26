import HomeSectionLanding from "~/components/HomeSectionLanding/HomeSectionLanding";
import HomeSectionRecentPurchases from "~/components/HomeSectionRecentPurchases/HomeSectionRecentPurchases";
import HomeTopCollections from "~/components/HomeSectionTopCollections/HomeTopCollections";
import HomeSectionNewListings from "~/components/HomeSectionNewListings/HomeSectionNewListings";
import { json, LoaderFunction, useLoaderData } from "remix";
import { client as sanityClient } from "~/modules/sanity";
import { Collection, CollectionItem } from "~/types/collection";

interface LoaderData {
    items: CollectionItem[],
    collections: Collection[],
}

export const loader: LoaderFunction = async ({ params }) => {
    const ret = {
        items: [],
        collections: [],
    };

    let query = `
    *[ _type == "items" ] {
        ..., 
        "imageURI": image.asset->url,
        collection-> { 
            ...,
            "imageURI": image.asset->url
        }
    }`;

    let found = await sanityClient.fetch(query, {});

    if (found && found.length > 0) {
        ret.items = found;
    }

    query = `
    *[_type=="collections"]{
        ..., 
        "imageURI": image.asset->url, 
        "items": *[_type=="items" && references(^._id)]{
            ..., 
            "imageURI": image.asset->url
        }
    }`

    found = await sanityClient.fetch(query, {});
    if (found && found.length > 0) {
        ret.collections = found;
    }

    return json(ret);
};

export default function Index() {
    const { items, collections } = useLoaderData<LoaderData>();

    return <>
        <HomeSectionLanding items={items}/>
        <HomeSectionRecentPurchases items={items.slice(0, 3)}/>
        <HomeSectionNewListings items={items.slice(0, 3)}/>
        <HomeTopCollections collections={collections}/>
    </>;
}

