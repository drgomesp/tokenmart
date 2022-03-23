import { AppShell, } from '@mantine/core';
import Header from "~/tokenmart/components/layout/Header/Header";
import Footer from "~/tokenmart/components/layout/Footer/Footer";
import SectionLanding from "~/tokenmart/components/home/SectionLanding/SectionLanding";
import SectionRecentPurchases from "~/tokenmart/components/home/SectionRecentPurchases/SectionRecentPurchases";
import RecentlyListed from "~/tokenmart/components/home/SectionNewListings/SectionNewListings";
import TopCollections from "~/tokenmart/components/home/SectionTopCollections/TopCollections";

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

