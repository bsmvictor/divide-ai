import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'Modo claro' : 'Modo escuro'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {isDarkMode ? (
          <LightMode sx={{ color: 'text.primary' }} />
        ) : (
          <DarkMode sx={{ color: 'text.primary' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
