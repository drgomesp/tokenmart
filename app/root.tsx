import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "remix";
import type { ColorScheme } from "@mantine/core";
import { AppShell, ColorSchemeProvider, createStyles, MantineProvider } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { MetaMaskWalletAdapter } from "~/tokenmart-web3/wallets/metamask";
import { WalletAdapter, WalletAdapterNetwork } from "~/tokenmart-web3/wallets";
import WalletProvider from "~/tokenmart-react/providers/WalletProvider";
import LayoutHeader from "~/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/components/LayoutFooter/LayoutFooter";

const useStyles = createStyles((theme) => ({
    main: {
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
    },
}));

export const App: React.FC = () => {
    const { classes } = useStyles();

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
            <title>test</title>
            <script> var global = global || window;</script>
        </head>
        <body>
        <MantineTheme>
            <AppShell
                padding="xl"
                header={<LayoutHeader/>}
                styles={(theme) => ({
                    main: {
                        headings: { fontFamily: 'Greycliff CF, sans-serif' },
                        padding: 0,
                    },
                })}>

                <main className={classes.main}>
                    <Outlet/>
                </main>

            </AppShell>
            <LayoutFooter/>
        </MantineTheme>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
    let initialColorScheme: ColorScheme = "light";
    if (typeof document !== 'undefined') {
        initialColorScheme = localStorage.getItem("colorScheme") as ColorScheme
    }

    const [ colorScheme, setColorScheme ] = useState<ColorScheme>(initialColorScheme);
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || colorScheme === "dark" ? "light" : "dark");
    }

    const network = WalletAdapterNetwork.Devnet;

    const adapters: WalletAdapter[] = useMemo(
        () => [
            new MetaMaskWalletAdapter(),
        ],
        [ network ]
    );

    return (
        <ColorSchemeProvider
            colorScheme={initialColorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    primaryColor: 'pink',
                    colorScheme: colorScheme,
                    headings: { fontFamily: 'Greycliff CF, sans-serif' },
                    other: {
                        fontFamilySecondary: 'Arial',
                        lineHeights: [ 1.2, 1.4, 1.6, 1.8, 1.95 ],
                        reduceMotion: true,
                    },
                }}
                withNormalizeCSS
                withGlobalStyles>
                <WalletProvider adapters={adapters} autoConnect={false}>
                    {children}
                </WalletProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
