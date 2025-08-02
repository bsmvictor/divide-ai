import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { ThemeContextProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CalculatePage from './pages/CalculatePage';
import CustomDivisionPage from './pages/CustomDivisionPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <div className="App">
          <Header />
          <Container 
            maxWidth="lg" 
            sx={{ 
              py: { xs: 3, md: 4 },
              minHeight: 'calc(100vh - 64px)'
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculate" element={<CalculatePage />} />
              <Route path="/custom" element={<CustomDivisionPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </Container>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                style: {
                  background: '#10b981',
                  color: '#ffffff',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                  color: '#ffffff',
                },
              },
            }}
          />
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
