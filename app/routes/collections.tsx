import { AppShell, Title } from "@mantine/core";
import Header from "~/components/layout/Header/Header";
import Footer from "~/components/layout/Footer/Footer";

export default function About() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<Header/>}
                styles={(theme) => ({
                    main: {
                        padding: 20,
                        minHeight: 550,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                    },
                })}>
                <Title order={2}>Collectionry</Title>

            </AppShell>

            <Footer/>
        </div>
    );
}

