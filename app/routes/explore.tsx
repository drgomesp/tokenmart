import { AppShell, Title } from "@mantine/core";
import {
    HeaderCustom
} from "~/components/tokenmart/layout/HeaderCustom/HeaderCustom";
import {
    FooterLinks
} from "~/components/tokenmart/layout/FooterLinks/FooterLinks";
import links from "~/links";

export default function Explore() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<HeaderCustom links={links()}/>}
                styles={(theme) => ({
                    main: {
                        padding: 20,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                    },
                })}
            >
                <Title order={2}>Explorery</Title>

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
