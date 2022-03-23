import { AppShell, } from '@mantine/core';
import Header from "~/components/layout/Header/Header";
import Footer from "~/components/layout/Footer/Footer";
import SectionLanding from "~/components/home/SectionLanding/SectionLanding";
import SectionRecentPurchases from "~/components/home/SectionRecentPurchases/SectionRecentPurchases";
import RecentlyListed from "~/components/home/SectionNewListings/SectionNewListings";
import TopCollections from "~/components/home/SectionTopCollections/TopCollections";

export default function Index() {
    return (
        <>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<Header/>}
                styles={(theme) => ({
                    main: {
                        padding: 0,
                    },
                })}>
                <SectionLanding/>

                <SectionRecentPurchases/>

                <RecentlyListed/>

                <TopCollections/>

            </AppShell>

            <Footer/>
        </>
    );
}

