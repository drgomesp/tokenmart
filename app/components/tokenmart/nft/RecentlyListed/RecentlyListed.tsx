import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 1.25}px`,
    },

    subtitle: {
        marginTop: 140,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1.1,
        marginBottom: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

export default function RecentlyListed() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Text className={classes.subtitle}
                  component="span" variant="gradient"
                  gradient={{
                      from: 'grape',
                      to: 'orange',
                      deg: 128,
                  }}>
                New Listings
            </Text>
            <Text color={"dimmed"}>
                Explore the newly listed items
            </Text>

        </div>
    )
}
