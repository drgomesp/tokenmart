import { AppShell, } from '@mantine/core';
import { NavHeader } from "~/components/layout/NavHeader/NavHeader";
import { FeaturesTitle } from "~/components/home/SectionLanding/FeaturesTitle";
import { Footer } from "~/components/layout/FooterLinks/Footer";
import RecentPurchases
    from "~/components/home/SectionRecentPurchases/RecentPurchases";
import RecentlyListed from "~/components/home/SectionNewListings/NewListings";
import TopCollections
    from "~/components/home/SectionTopCollections/TopCollections";

export default function Index() {
    return (
        <>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<NavHeader/>}
                styles={(theme) => ({
                    main: {
                        padding: 0,
                    },
                })}
            >
                <FeaturesTitle/>

                <RecentPurchases/>

                <RecentlyListed/>

                <TopCollections/>

            </AppShell>

            <Footer/>
        </>
    );
}

