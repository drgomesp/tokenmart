import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "remix";

import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";

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
            <Outlet/>
        </MantineTheme>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
    let initialColorScheme: ColorScheme
    if (typeof window !== 'undefined') {
        initialColorScheme = localStorage.getItem("colorScheme") as ColorScheme
    }

    const [ colorScheme, setColorScheme ] = useState<ColorScheme>(initialColorScheme)

    const toggleColorScheme = (value?: ColorScheme) => {
        console.log(`toggleColorScheme(${value})`);
        setColorScheme(value || colorScheme === "dark" ? "light" : "dark");
    }

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    // linear-gradient(to bottom,  10%, #ec8c69 90%)
                    // primaryColor: 'pink',
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
                withGlobalStyles
            >
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
