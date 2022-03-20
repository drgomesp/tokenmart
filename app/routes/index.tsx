import { AppShell, } from '@mantine/core';
import { Header } from "~/components/tokenmart/layout/Header/Header";
import {
    FeaturesTitle
} from "~/components/tokenmart/layout/FeaturesTitle/FeaturesTitle";
import { Footer } from "~/components/tokenmart/layout/FooterLinks/Footer";
import RecentPurchases
    from "~/components/tokenmart/nft/RecentPurchases/RecentPurchases";
import RecentlyListed from "~/components/tokenmart/nft/NewListings/NewListings";
import navlinks from "~/navlinks";
import TopCollections
    from "~/components/tokenmart/nft/TopCollections/TopCollections";

export default function Index() {
    return (
        <>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<Header links={navlinks()}/>}
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

            <Footer data={[
                {
                    title: "About",
                    links: [
                        { label: "Features", link: "" },
                        { label: "Team", link: "" },
                    ],
                }, {
                    title: "Help",
                    links: [
                        { label: "Creating a Collection", link: "" },
                        { label: "Listing an NFT", link: "" },
                    ],
                }, {
                    title: "Other",
                    links: [
                        { label: "API Documentation", link: "" },
                        { label: "Help", link: "" },
                        { label: "Contact Us", link: "" },
                    ],
                }

            ]}/>
        </>
    );
}

