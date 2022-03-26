import { ColorScheme, createStyles, Group, Switch, useMantineColorScheme } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    root: {
        marginRight: 5,
        top: 1,
        position: 'relative',
        '& *': {
            cursor: 'pointer',
        },
    },

    icon: {
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 1,
        top: 3,
    },

    iconLight: {
        left: 4,
        color: theme.white,
    },

    iconDark: {
        right: 4,
        color: theme.colors.gray[6],
    },
}));


export default function ColorSchemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes, cx } = useStyles();

    const toggleLocalStorageColorScheme = (selected: ColorScheme) => {
        console.log(`toggleLocalStorageColorScheme(${selected})`);

        if (typeof window !== 'undefined') {
            let storedChoice: ColorScheme =
                window.localStorage.getItem("colorScheme") as ColorScheme
                ?? undefined;

            if (storedChoice === undefined) {
                storedChoice = colorScheme;
            }

            window.localStorage.setItem("colorScheme", colorScheme == "dark" ? "light" : "dark")
            toggleColorScheme();
        }
    };


    return (
        <Group position="center" my={30}>
            <div className={classes.root}>
                <Sun className={cx(classes.icon, classes.iconLight)} size={18}/>
                <MoonStars className={cx(classes.icon, classes.iconDark)}
                           size={18}/>
                <Switch checked={colorScheme === 'dark'}
                        onChange={() => toggleLocalStorageColorScheme(
                            colorScheme === "dark" ? 'light' : "dark"
                        )}
                        size="md"/>
            </div>
        </Group>
    );
}
