import { AppShell, } from '@mantine/core';
import LayoutHeader from "~/tokenmart/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/tokenmart/components/LayoutFooter/LayoutFooter";
import HomeSectionLanding from "~/tokenmart/components/HomeSectionLanding/HomeSectionLanding";
import HomeSectionRecentPurchases from "~/tokenmart/components/HomeSectionRecentPurchases/HomeSectionRecentPurchases";
import HomeTopCollections from "~/tokenmart/components/HomeSectionTopCollections/HomeTopCollections";
import HomeSectionNewListings from "~/tokenmart/components/HomeSectionNewListings/HomeSectionNewListings";

export default function Index() {
    return (
        <>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
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

