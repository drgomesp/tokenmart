import { AppShell, Title } from "@mantine/core";
import LayoutHeader from "~/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/components/LayoutFooter/LayoutFooter";

export default function About() {
    return (
        <div className={"container"}>
            <AppShell
                padding="xl"
                // @ts-ignore
                header={<LayoutHeader/>}
                styles={(theme) => ({
                    main: {
                        padding: 0,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
                    },
                })}>
                <Title order={2}>Aboutery</Title>

            </AppShell>

            <LayoutFooter/>
        </div>
    );
}

