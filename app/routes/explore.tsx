import { AppShell, Title } from "@mantine/core";
import { NavHeader } from "~/components/layout/NavHeader/NavHeader";
import { Footer } from "~/components/layout/FooterLinks/Footer";
import links from "~/components/layout/NavHeader/links";

export default function Explore() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<NavHeader links={links()}/>}
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

