import { AppShell, Title } from "@mantine/core";
import LayoutHeader from "~/tokenmart/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/tokenmart/components/LayoutFooter/LayoutFooter";

export default function About() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<LayoutHeader/>}
                styles={(theme) => ({
                    main: {
                        padding: 20,
                        minHeight: 550,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                    },
                })}>
                <Title order={2}>Collectionry</Title>

            </AppShell>

            <LayoutFooter/>
        </div>
    );
}

