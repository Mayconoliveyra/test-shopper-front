import { useCallback, useEffect, useState } from 'react';

import { HeaderAppBar } from '../components/Painel/HeaderAppBar';
import { MenuSide } from '../components/Painel/MenuSide/MenuSide';

import { Box, Button, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface ILayoutBasePainel {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBtnSave?: boolean;
  dirtyBtnSave?: boolean;
  onClickBtnSave?: () => void;
}

export const LayoutBasePainel = ({
  children,
  title,
  subtitle,
  showBtnSave = false,
  dirtyBtnSave = false,
  onClickBtnSave,
}: ILayoutBasePainel) => {
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));
  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));

  const theme = useTheme();

  const [isMenuSideOpen, setIsMenuSideOpen] = useState(false);
  const toggleMenuSideOpen = useCallback(() => {
    setIsMenuSideOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  useEffect(() => {
    if (desktop) {
      setIsMenuSideOpen(true);
    }
  }, [desktop]);

  return (
    <>
      <HeaderAppBar toggleMenuSideOpen={toggleMenuSideOpen} />
      <MenuSide isMenuSideOpen={isMenuSideOpen} toggleMenuSideOpen={toggleMenuSideOpen} />
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        component="main"
        paddingTop={theme.spacing(17)}
        paddingLeft={(desktop || tablet) && isMenuSideOpen ? theme.spacing(70) : 0}
      >
        <Box padding={4} paddingY={desktop || tablet ? 8 : 5} borderBottom={theme.border.primary}>
          <Typography variant="h6" component="h1" color="text.primary" lineHeight={1.2} paddingBottom={2}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" color="text.primary">
            {subtitle}
          </Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          padding={desktop ? 10 : tablet ? 7 : 0}
          paddingTop={desktop ? 10 : tablet ? 7 : 5}
          component={Paper}
          borderRadius={0}
        >
          <Box
            flex={desktop || tablet ? '' : 1}
            padding={desktop ? 12 : tablet ? 7 : 4}
            display="flex"
            flexDirection="column"
            border={desktop || tablet ? theme.border.primary : ''}
            borderTop={theme.border.primary}
            bgcolor={theme.palette.background.default}
          >
            {children}

            {showBtnSave && (
              <Box
                flex={desktop || tablet ? '' : 1}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                paddingTop={7}
              >
                <Button
                  disabled={dirtyBtnSave}
                  sx={{ padding: 2.5, maxWidth: desktop || tablet ? 250 : 'auto' }}
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  onClick={onClickBtnSave}
                >
                  Salvar
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
