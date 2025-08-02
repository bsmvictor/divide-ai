import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ minHeight: '64px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.8 },
              fontSize: '1.25rem',
              letterSpacing: '-0.01em'
            }}
            onClick={() => navigate('/')}
          >
            Divide.AI
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              py: 1,
              transition: 'all 0.2s ease',
              bgcolor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Início
          </Button>
          
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
