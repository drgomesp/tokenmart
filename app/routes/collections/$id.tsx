import type {LoaderFunction} from "remix";
import {useLoaderData} from 'remix';

type Collection = {
    name: String,
}

type LoaderData = {
    collection: Collection
};

export let loader: LoaderFunction = async ({params}): Promise<LoaderData> => {
    console.log(params);

    let collection: Collection = {name: 'Bored Ape Clone'};

    return {collection}
};

export default function RenderCollection() {
    const {collection} = useLoaderData<LoaderData>()

    return (
        <h1>{collection.name}</h1>
    );
}
