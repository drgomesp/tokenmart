import { AppShell, Header } from '@mantine/core';
import { NavbarSearch } from "~/components/NavbarSearch/NavbarSearch";

export default function Index() {
    return (
        <AppShell
            padding="md"
            navbar={<NavbarSearch/>}
            header={<Header height={60} p="xs">{/* Header content */}</Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {/* Your application here */}
        </AppShell>
    );
}
