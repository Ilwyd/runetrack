import { ActionIcon, Container, createStyles, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
            paddingTop: theme.spacing.sm,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
            marginTop: 120,
      }
}))

function Footer() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { classes, theme, cx } = useStyles();

    return (
        <div className={classes.footer}>
            <Container>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                </ActionIcon>
            </Container>
        </div>
    );
}

export default Footer;