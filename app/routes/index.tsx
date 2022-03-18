import { AppShell, } from '@mantine/core';
import {
    HeaderCustom
} from "~/components/tokenmart/layout/HeaderCustom/HeaderCustom";
import {
    FeaturesTitle
} from "~/components/tokenmart/layout/FeaturesTitle/FeaturesTitle";
import {
    FooterLinks
} from "~/components/tokenmart/layout/FooterLinks/FooterLinks";

const links = [
    { "link": "/explore", "label": "Browse" },
    { "link": "/collections", "label": "Collections" },
    { "link": "/pricing", "label": "About" },
];

export default function Index() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<HeaderCustom links={links}/>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                <FeaturesTitle/>

            </AppShell>

            <FooterLinks data={[
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
        </div>
    );
}

