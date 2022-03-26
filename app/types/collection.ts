export type Collection = {
    _id: string,
    imageURI: string,
    slug: string,
    title: string,
    items: {
        imageURI: string,
    }
}

export type CollectionItem = {
    _createdAt: string,
    _id: string,
    _rev: string,
    _updatedAt: string,
    number: number,
    collection: Collection,
    image: string,
    imageURI: string,
    slug: string,
    title: string,
};
