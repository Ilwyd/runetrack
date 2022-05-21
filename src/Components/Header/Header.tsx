import {
  createStyles,
  Container,
  Group,
  Tabs,
  Button,
  Image,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: theme.spacing.xl,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tabControl: {
    fontWeight: 500,
    height: 38,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },

  tabControlActive: {
    borderColor: `${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    } !important`,
  },
}));

interface HeaderTabs {
  tabs: string[];
  tabChange: any;
}

export default function Header({ tabs, tabChange }: HeaderTabs) {
  const { classes, theme, cx } = useStyles();

  const items = tabs.map((tab) => <Tabs.Tab key={tab} label={tab} tabKey={tab} />);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
            <Image 
                radius="md" 
                src="/RuneTrackLogo.png"
                width={200}
                height={50}
            />
        </Group>
      </Container>
      <Container>
        <Tabs
          onTabChange={tabChange}
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsListWrapper: classes.tabsList,
            tabControl: classes.tabControl,
            tabActive: classes.tabControlActive,
          }}
        >
          {items}
        </Tabs>
      </Container>
    </div>
  );
}