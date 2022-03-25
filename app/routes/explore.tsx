import { AppShell, Title } from "@mantine/core";
import LayoutHeader from "~/tokenmart/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/tokenmart/components/LayoutFooter/LayoutFooter";
import links from "~/tokenmart/components/LayoutHeader/links";

export default function Explore() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<LayoutHeader links={links()}/>}
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
            <LayoutFooter/>
        </div>
    );
}

