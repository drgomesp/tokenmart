import { AppShell, Title } from "@mantine/core";
import Header from "~/components/layout/Header/Header";
import Footer from "~/components/layout/Footer/Footer";
import links from "~/components/layout/Header/links";

export default function Explore() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<Header links={links()}/>}
                styles={(theme) => ({
                    main: {
                        padding: 20,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                    },
                })}>
                <div className={""}>
                    <Title order={2}>Explorery</Title>

                    <h1 className="bg-slate-100 text-3xl font-bold underline">
                        Hello world!
                    </h1>
                </div>

            </AppShell>
            <Footer/>
        </div>
    );
}

