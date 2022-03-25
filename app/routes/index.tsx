import HomeSectionLanding from "~/components/HomeSectionLanding/HomeSectionLanding";
import HomeSectionRecentPurchases from "~/components/HomeSectionRecentPurchases/HomeSectionRecentPurchases";
import HomeTopCollections from "~/components/HomeSectionTopCollections/HomeTopCollections";
import HomeSectionNewListings from "~/components/HomeSectionNewListings/HomeSectionNewListings";
import { json, LoaderFunction, useLoaderData } from "remix";
import { client as sanityClient } from "~/modules/sanity";
import { Collection } from "~/types/collection";

export const loader: LoaderFunction = async ({ params }) => {
    const query = `
    *[_type=="collections"]{
        ..., 
        "imageURI": image.asset->url, 
        "items": *[_type=="items" && references(^._id)]{
            ..., 
            "imageURI": image.asset->url
        }
    }`

    return json(await sanityClient.fetch(query, {}));
};

export default function Index() {
    const collections = useLoaderData<Collection[]>();

    return (
        <>
            <HomeSectionLanding/>
            <HomeSectionRecentPurchases/>
            <HomeSectionNewListings/>
            <HomeTopCollections collections={collections}/>
        </>
    );
}

