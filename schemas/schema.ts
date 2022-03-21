// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    name: 'tokenmart',
    types: schemaTypes.concat([
        {
            title: "Collection",
            name: "collection",
            type: "document",

            // Now we proceed to list the fields of our document
            fields: [
                // This document has only one field
                {
                    // The display name for this field
                    title: "Name",

                    // The identifier for this field used in the api's
                    name: "name",

                    // The type of this field
                    type: "string",
                }
            ]
        }
    ])
})
