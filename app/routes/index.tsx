import { AppShell, } from '@mantine/core';
import Header from "~/tokenmart/components/layout/Header/Header";
import Footer from "~/tokenmart/components/layout/Footer/Footer";
import SectionLanding from "~/tokenmart/components/home/SectionLanding/SectionLanding";

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

                {/*<SectionRecentPurchases/>*/}

                {/*<RecentlyListed/>*/}

                {/*<TopCollections/>*/}

            </AppShell>

            <Footer/>
        </>
    );
}

