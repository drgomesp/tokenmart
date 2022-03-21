import { AppShell, } from '@mantine/core';
import NavHeader from "~/components/layout/NavHeader/NavHeader";
import {
    SectionLanding
} from "~/components/home/SectionLanding/SectionLanding";
import { Footer } from "~/components/layout/FooterLinks/Footer";
import SectionRecentPurchases
    from "~/components/home/SectionRecentPurchases/SectionRecentPurchases";
import RecentlyListed
    from "~/components/home/SectionNewListings/SectionNewListings";
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
                <SectionLanding/>

                <SectionRecentPurchases/>

                <RecentlyListed/>

                <TopCollections/>

            </AppShell>

            <Footer/>
        </>
    );
}

