import { AppShell, } from '@mantine/core';
import LayoutHeader from "~/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/components/LayoutFooter/LayoutFooter";
import HomeSectionLanding from "~/components/HomeSectionLanding/HomeSectionLanding";
import HomeSectionRecentPurchases from "~/components/HomeSectionRecentPurchases/HomeSectionRecentPurchases";
import HomeTopCollections from "~/components/HomeSectionTopCollections/HomeTopCollections";
import HomeSectionNewListings from "~/components/HomeSectionNewListings/HomeSectionNewListings";

export default function Index() {
    return (
        <>
            <AppShell
                padding="xl"
                header={<LayoutHeader/>}
                styles={(theme) => ({
                    main: {
                        padding: 0,
                    },
                })}>

                <HomeSectionLanding/>
                <HomeSectionRecentPurchases/>
                <HomeSectionNewListings/>
                <HomeTopCollections/>

            </AppShell>

            <LayoutFooter/>
        </>
    );
}

