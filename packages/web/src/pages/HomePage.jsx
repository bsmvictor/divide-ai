import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Container,
  Stack,
  Divider
} from '@mui/material';
import {
  Receipt,
  Group,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    'Cálculos precisos',
    'Interface limpa',
    'Compartilhamento fácil'
  ];

  return (
    <Container maxWidth="md">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3,
            color: 'text.primary',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Divide.AI
        </Typography>
        
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ 
            mb: 6, 
            maxWidth: 500, 
            mx: 'auto',
            fontWeight: 400,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            lineHeight: 1.6
          }}
        >
          Divida contas entre amigos de forma simples e precisa
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="center" 
          sx={{ mb: 8 }}
        >
          {features.map((feature, index) => (
            <Typography 
              key={index}
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              {feature}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Cards de Opções */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => navigate('/calculate')}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Receipt sx={{ fontSize: 24, color: 'text.secondary', mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  Divisão Simples
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Divida o valor total igualmente entre todos os participantes. 
                Ideal para refeições onde todos consomem similarmente.
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/calculate');
                }}
                sx={{ 
                  width: '100%',
                  py: 1.5,
                  fontWeight: 500
                }}
              >
                Começar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => navigate('/custom')}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Group sx={{ fontSize: 24, color: 'text.secondary', mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  Divisão Personalizada
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Divida itens específicos entre pessoas diferentes. 
                Perfeito quando cada pessoa consome itens distintos.
              </Typography>

              <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/custom');
                }}
                sx={{ 
                  width: '100%',
                  py: 1.5,
                  fontWeight: 500
                }}
              >
                Começar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Como funciona */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Divider sx={{ mb: 4 }} />
        
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Como funciona
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          justifyContent="center"
          alignItems="center"
        >
          {[
            'Escolha o tipo de divisão',
            'Adicione valores e pessoas',
            'Configure gorjetas',
            'Compartilhe o resultado'
          ].map((step, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {index + 1}
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ maxWidth: 120 }}
              >
                {step}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default HomePage;
