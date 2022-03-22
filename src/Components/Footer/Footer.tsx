import { ActionIcon, Container, createStyles, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

function Footer() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    
    return (
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
    );
}

export default Footer;