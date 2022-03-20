import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/tokenmart/layout/Header/Header";
import { Footer } from "~/components/tokenmart/layout/FooterLinks/Footer";
import navlinks from "~/navlinks";

export default function About() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // navbar={<NavbarCustom/>}
                // @ts-ignore
                header={<Header links={navlinks()}/>}
                styles={(theme) => ({
                    main: {
                        padding: 20,
                        minHeight: 550,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                    },
                })}
            >
                <Title order={2}>Collectionry</Title>

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
        </div>
    );
}

