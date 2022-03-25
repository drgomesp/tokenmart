import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "remix";
import type { ColorScheme } from "@mantine/core";
import { AppShell, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { MetaMaskWalletAdapter } from "~/tokenmart-web3/wallets/metamask";
import { WalletAdapter, WalletAdapterNetwork } from "~/tokenmart-web3/wallets";
import WalletProvider from "~/tokenmart-react/providers/WalletProvider";
import LayoutHeader from "~/components/LayoutHeader/LayoutHeader";
import LayoutFooter from "~/components/LayoutFooter/LayoutFooter";

export default function App() {
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

                <Outlet/>

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
    let initialColorScheme: ColorScheme = "dark"
    if (typeof window !== 'undefined') {
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
