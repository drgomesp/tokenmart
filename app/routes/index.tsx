import HomeSectionLanding from "~/components/HomeSectionLanding/HomeSectionLanding";
import HomeSectionRecentPurchases from "~/components/HomeSectionRecentPurchases/HomeSectionRecentPurchases";
import HomeTopCollections from "~/components/HomeSectionTopCollections/HomeTopCollections";
import HomeSectionNewListings from "~/components/HomeSectionNewListings/HomeSectionNewListings";
import React from "react";

export default function Index() {
    return (
        <>
            <HomeSectionLanding/>
            <HomeSectionRecentPurchases/>
            <HomeSectionNewListings/>
            <HomeTopCollections/>
        </>
    );
}

