import { destroyCustomCookie } from '../../../utils/nookies';

import { DarkMode, LightMode, Logout, Menu, NotificationsNone } from '@mui/icons-material';
import { Box, Button, Tooltip, useTheme } from '@mui/material';

import { useAppThemeContext } from '../../../context/ThemeContext';

interface IHeaderAppBar {
  toggleMenuSideOpen: () => void;
}

const handleSignOut = async () => {
  console.log('CHAMAR FUNÇÃO DE SAIR AQUI');
  destroyCustomCookie('accessToken');
};

export const HeaderAppBar = ({ toggleMenuSideOpen }: IHeaderAppBar) => {
  const theme = useTheme();

  const { themeName, toggleTheme } = useAppThemeContext();

  return (
    <Box
      display="flex"
      alignItems="center"
      component="header"
      height={theme.spacing(17)}
      width="100%"
      paddingX={2}
      sx={{
        borderBottom: theme.border.primary,
        background: theme.palette.background.default,
        position: 'fixed',
        zIndex: 1,
      }}
    >
      <Button onClick={toggleMenuSideOpen} variant="outlined" sx={{ padding: 1.5, minWidth: 0, borderRadius: 2 }}>
        <Menu sx={{ width: 20, height: 20 }} />
      </Button>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <Tooltip title="Alterar tema" arrow>
          <Button onClick={toggleTheme} variant="outlined" sx={{ padding: 1.5, minWidth: 0, borderRadius: 2, marginLeft: 2 }}>
            {themeName === 'dark' ? <DarkMode sx={{ width: 20, height: 20 }} /> : <LightMode sx={{ width: 20, height: 20 }} />}
          </Button>
        </Tooltip>

        <Tooltip title="Ver notificações" arrow>
          <Button variant="outlined" sx={{ padding: 1.5, minWidth: 0, borderRadius: 2, marginLeft: 2 }}>
            <NotificationsNone sx={{ width: 20, height: 20 }} />
          </Button>
        </Tooltip>

        <Tooltip title="Sair da sua conta" arrow>
          <Button onClick={handleSignOut} variant="outlined" sx={{ padding: 1.5, minWidth: 0, borderRadius: 2, marginLeft: 2 }}>
            <Logout sx={{ width: 20, height: 20 }} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
