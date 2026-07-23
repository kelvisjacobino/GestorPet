import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Avatar,
  ListSubheader
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Gavel as GavelIcon,
  Description as DescriptionIcon,
  History as HistoryIcon,
  Assessment as AssessmentIcon,
  BusinessCenter as BusinessCenterIcon
} from '@mui/icons-material';
import { Link, useLocation, Outlet } from 'react-router-dom';

const drawerWidth = 260;

const menuGroups = [
  {
    label: 'Principal',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
      { text: 'Petições', icon: <GavelIcon />, path: '/peticoes' },
      { text: 'Modelos', icon: <DescriptionIcon />, path: '/modelos' },
    ]
  },
  {
    label: 'Cadastros',
    items: [
      { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
      { text: 'Advogados', icon: <BusinessCenterIcon />, path: '/advogados' },
    ]
  },
  {
    label: 'Sistema',
    items: [
      { text: 'Histórico', icon: <HistoryIcon />, path: '/historico' },
      { text: 'Relatórios', icon: <AssessmentIcon />, path: '/relatorios' },
    ]
  }
];

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: 14 }}>
          GP
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '-0.5px' }}>
          GestãoPetições
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {menuGroups.map((group) => (
          <List 
            key={group.label}
            subheader={
              <ListSubheader sx={{ 
                bgcolor: 'transparent', 
                fontSize: 11, 
                textTransform: 'uppercase', 
                letterSpacing: 1, 
                color: 'text.secondary', 
                fontWeight: 600,
                lineHeight: '24px',
                mb: 1,
                pl: 1.5
              }}>
                {group.label}
              </ListSubheader>
            }
          >
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    component={Link} 
                    to={item.path}
                    selected={isActive}
                    onClick={() => isMobile && setMobileOpen(false)}
                    sx={{
                      borderRadius: 2,
                      px: 1.5,
                      py: 1.25,
                      '&.Mui-selected': {
                        bgcolor: '#eff6ff',
                        color: 'primary.main',
                        '&:hover': { bgcolor: '#eff6ff' },
                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                        '& .MuiListItemText-primary': { fontWeight: 600 }
                      },
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography sx={{ 
                          fontSize: 14, 
                          fontWeight: isActive ? 600 : 500 
                        }}>
                          {item.text}
                        </Typography>
                      } 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
              Pesquisar petições ou clientes...
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>Dr. Ricardo Silva</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>OAB/SP 123.456</Typography>
            </Box>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#e2e8f0', color: 'text.secondary', fontSize: 12, fontWeight: 700 }}>
              RS
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 4 }, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          mt: '64px'
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
