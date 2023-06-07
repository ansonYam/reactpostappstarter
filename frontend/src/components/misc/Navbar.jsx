import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState('/');
  const { classes, cx } = useStyles();

  const loggedInLinks = [
    { link: '/', label: 'Home' },
    { link: 'posts', label: 'Posts' },
    { link: '#', label: 'Logout', clicks: onLogout },
  ];

  const loggedOutLinks = [
    { link: '/', label: 'Home' },
    { link: 'login', label: 'Login' },
  ];

  const links = !!user
    ? loggedInLinks
    : loggedOutLinks;

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        link.clicks();
        setActive(link.link);      
      }}
    >
      {link.label}
    </NavLink>
  ))

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <NavLink to="/">
          <h3 style={{ color: "black" }}>LOGO</h3>
        </NavLink>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

      </Container>
    </Header>

  );
};

export default Navbar;
