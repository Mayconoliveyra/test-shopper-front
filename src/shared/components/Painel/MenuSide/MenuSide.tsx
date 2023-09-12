import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { parserCustomCookie, setCustomCookie } from '../../../utils/nookies';

import { AddToPhotosOutlined, ExpandLess, ExpandMore, PlaceOutlined } from '@mui/icons-material';
import {
  Avatar,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Theme,
  Collapse,
  Paper,
  Tooltip,
  SvgIconProps,
} from '@mui/material';

interface IMenuSide {
  isMenuSideOpen: boolean;
  toggleMenuSideOpen: () => void;
}

interface IItemButton {
  label: string;
  icon: string | SvgIconProps;
  hrf: string;
  tooltip?: string;
  itemChildren?: boolean;
  onClick?: () => void;
  openCollapse?: boolean;
}

const ItemButton = ({ label, icon, hrf, tooltip, itemChildren = false }: Omit<IItemButton, 'onClick' | 'openCollapse'>) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Tooltip title={tooltip} placement="right" arrow>
      <ListItemButton href={hrf} selected={pathname === hrf} sx={{ paddingLeft: itemChildren ? 8 : '' }}>
        <ListItemIcon>{typeof icon === 'string' ? <Icon>{icon}</Icon> : <>{icon}</>}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Tooltip>
  );
};

const ItemButtonCollapse = ({ label, icon, onClick, openCollapse }: Omit<IItemButton, 'hrf' | 'tooltip' | 'itemChildren'>) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        <ListItemIcon>{typeof icon === 'string' ? <Icon>{icon}</Icon> : <>{icon}</>}</ListItemIcon>
      </ListItemIcon>
      <ListItemText primary={label} />
      {openCollapse ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
};

export const MenuSide = ({ isMenuSideOpen, toggleMenuSideOpen }: IMenuSide) => {
  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));
  const theme = useTheme();

  const [catalogoOpen, setCatalogoOpen] = useState(false);
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const [contaOpen, setContaOpen] = useState(false);

  const handleCollapse = (tipo: 'catalogo' | 'empresa' | 'conta') => {
    const newCollapse = { catalogoOpen, empresaOpen, contaOpen };

    if (tipo === 'catalogo') {
      setCatalogoOpen(!catalogoOpen);
      newCollapse.catalogoOpen = !catalogoOpen;
    } else if (tipo === 'empresa') {
      setEmpresaOpen(!empresaOpen);
      newCollapse.empresaOpen = !empresaOpen;
    } else if (tipo === 'conta') {
      setContaOpen(!contaOpen);
      newCollapse.contaOpen = !contaOpen;
    }

    setCustomCookie('menuSideCollapse', JSON.stringify(newCollapse), { maxAge: 60 * 1, path: '/' });
  };

  useEffect(() => {
    const memoCollapse = parserCustomCookie('menuSideCollapse');
    if (memoCollapse) {
      const memoCollapseParser = JSON.parse(memoCollapse);
      setCatalogoOpen(memoCollapseParser.catalogoOpen || false);
      setEmpresaOpen(memoCollapseParser.empresaOpen || false);
      setContaOpen(memoCollapseParser.contaOpen || false);
    }
  }, []);

  return (
    <>
      {desktop || tablet ? (
        <Box
          sx={{
            borderRight: theme.border.primary,
            position: 'fixed',
            zIndex: 1,
            marginTop: theme.spacing(17),
          }}
          component={Paper}
          elevation={4}
          boxShadow={0}
          borderRadius={0}
          width={isMenuSideOpen ? theme.spacing(70) : 0}
          visibility={isMenuSideOpen ? 'visible' : 'hidden'}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box width="100%" height={theme.spacing(14.5)} display="flex" alignItems="center" justifyContent="center">
            <Avatar variant="square" sx={{ height: theme.spacing(10), width: theme.spacing(45) }}>
              Tecnosh
            </Avatar>
          </Box>

          <Box flex={1}>
            <List component="nav">
              <ItemButton label="Pedidos" icon="home" hrf="/pedidos" />

              <ItemButtonCollapse
                label="Catálogo"
                icon="menu_book"
                onClick={() => handleCollapse('catalogo')}
                openCollapse={catalogoOpen}
              />
              <Collapse in={catalogoOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ItemButton
                    label="Produtos"
                    icon="qr_code_outlined"
                    hrf="/painel/catalogo/produtos"
                    itemChildren
                    tooltip="Toque para visualizar seus produtos"
                  />
                  <ItemButton
                    label="Complementos"
                    icon={<AddToPhotosOutlined />}
                    hrf="/painel/catalogo/complementos"
                    itemChildren
                    tooltip="Toque para visualizar os complementos dos seus produtos"
                  />
                </List>
              </Collapse>

              <ItemButtonCollapse
                label="Empresa"
                icon="store_rounded"
                onClick={() => handleCollapse('empresa')}
                openCollapse={empresaOpen}
              />
              <Collapse in={empresaOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ItemButton
                    label="Informações"
                    icon="info_outlined"
                    hrf="/painel/empresa/informacoes"
                    itemChildren
                    tooltip="Toque aqui para visualizar as informações gerais da sua empresa."
                  />
                </List>
                <List component="div" disablePadding>
                  <ItemButton
                    label="Meus links"
                    icon="link"
                    hrf="/painel/empresa/meus-links"
                    itemChildren
                    tooltip="Toque aqui para visualizar os links da sua empresa."
                  />
                </List>
                <List component="div" disablePadding>
                  <ItemButton
                    label="Horários"
                    icon="access_time"
                    hrf="/painel/empresa/horarios"
                    itemChildren
                    tooltip="Toque aqui para visualizar suas configurações de horários de funcionamento."
                  />
                </List>
                <List component="div" disablePadding>
                  <ItemButton
                    label="Ajustes de entrega"
                    icon={<PlaceOutlined />}
                    hrf="/painel/empresa/ajustes-de-entrega"
                    itemChildren
                    tooltip="Toque aqui para visualizar suas configurações de entregas."
                  />
                </List>
              </Collapse>
            </List>
          </Box>
        </Box>
      ) : (
        <Drawer open={isMenuSideOpen} variant="temporary" onClose={toggleMenuSideOpen}>
          <Box
            component={Paper}
            elevation={4}
            boxShadow={0}
            borderRadius={0}
            width={isMenuSideOpen ? theme.spacing(70) : 0}
            visibility={isMenuSideOpen ? 'visible' : 'hidden'}
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Box width="100%" height={theme.spacing(14.5)} display="flex" alignItems="center" justifyContent="center">
              <Avatar variant="square" sx={{ height: theme.spacing(10), width: theme.spacing(45) }}>
                Tecnosh
              </Avatar>
            </Box>

            <Box flex={1}>
              <List component="nav">
                <ItemButton label="Pedidos" icon="home" hrf="/pedidos" />

                <ItemButtonCollapse
                  label="Catálogo"
                  icon="menu_book"
                  onClick={() => handleCollapse('catalogo')}
                  openCollapse={catalogoOpen}
                />
                <Collapse in={catalogoOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ItemButton
                      label="Produtos"
                      icon="qr_code_outlined"
                      hrf="/painel/catalogo/produtos"
                      itemChildren
                      tooltip="Toque para visualizar seus produtos"
                    />
                    <ItemButton
                      label="Complementos"
                      icon={<AddToPhotosOutlined />}
                      hrf="/painel/catalogo/complementos"
                      itemChildren
                      tooltip="Toque para visualizar os complementos dos seus produtos"
                    />
                  </List>
                </Collapse>

                <ItemButtonCollapse
                  label="Empresa"
                  icon="store_rounded"
                  onClick={() => handleCollapse('empresa')}
                  openCollapse={empresaOpen}
                />
                <Collapse in={empresaOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ItemButton
                      label="Informações"
                      icon="info_outlined"
                      hrf="/painel/empresa/informacoes"
                      itemChildren
                      tooltip="Toque aqui para visualizar as informações gerais da sua empresa."
                    />
                  </List>
                  <List component="div" disablePadding>
                    <ItemButton
                      label="Meus links"
                      icon="link"
                      hrf="/painel/empresa/meus-links"
                      itemChildren
                      tooltip="Toque aqui para visualizar os links da sua empresa."
                    />
                  </List>
                  <List component="div" disablePadding>
                    <ItemButton
                      label="Horários"
                      icon="access_time"
                      hrf="/painel/empresa/horarios"
                      itemChildren
                      tooltip="Toque aqui para visualizar suas configurações de horários de funcionamento."
                    />
                  </List>
                  <List component="div" disablePadding>
                    <ItemButton
                      label="Ajustes de entrega"
                      icon={<PlaceOutlined />}
                      hrf="/painel/empresa/ajustes-de-entrega"
                      itemChildren
                      tooltip="Toque aqui para visualizar suas configurações de entregas."
                    />
                  </List>
                </Collapse>
              </List>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};
