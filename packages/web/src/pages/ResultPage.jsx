import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  IconButton,
  Alert,
  Stack
} from '@mui/material';
import {
  Share,
  Home,
  Calculate,
  ArrowBack,
  Person,
  Receipt,
  ContentCopy
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, type } = location.state || {};

  if (!result) {
    navigate('/');
    return null;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const shareResult = async () => {
    try {
      let shareText = 'Divisão da Conta - Divide.AI\n\n';
      
      if (type === 'simple') {
        shareText += `Pessoas: ${result.people}\n`;
        shareText += `Total: ${formatCurrency(result.finalTotal)}\n`;
        shareText += `Por pessoa: ${formatCurrency(result.perPerson)}\n\n`;
        
        if (result.breakdown.discount > 0) {
          shareText += `Desconto: ${formatCurrency(result.breakdown.discount)}\n`;
        }
        if (result.breakdown.tip > 0) {
          shareText += `Gorjeta: ${formatCurrency(result.breakdown.tip)}\n`;
        }
        
        if (result.items && result.items.length > 0) {
          shareText += '\nItens:\n';
          result.items.forEach(item => {
            shareText += `• ${item.name}: ${formatCurrency(item.price)}\n`;
          });
        }
      } else {
        shareText += `Divisão Personalizada\n`;
        shareText += `Total: ${formatCurrency(result.finalTotal)}\n\n`;
        
        Object.values(result.personTotals).forEach(person => {
          shareText += `${person.name}: ${formatCurrency(person.total)}\n`;
        });
      }
      
      shareText += '\nCalculado com Divide.AI';

      if (navigator.share) {
        await navigator.share({
          title: 'Divisão da Conta',
          text: shareText
        });
        toast.success('Resultado compartilhado');
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('Resultado copiado para a área de transferência');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      toast.error('Erro ao compartilhar resultado');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copiado para a área de transferência');
    } catch (error) {
      toast.error('Erro ao copiar');
    }
  };

  const renderSimpleResult = () => (
    <>
      {/* Resultado Principal */}
      <Card sx={{ mb: 3, textAlign: 'center' }}>
        <CardContent sx={{ py: 4 }}>
          <Person sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
          <Typography variant="h2" component="div" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            {formatCurrency(result.perPerson)}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            por pessoa
          </Typography>
          <Chip
            label={`${result.people} pessoas`}
            sx={{ mt: 2 }}
            variant="outlined"
          />
        </CardContent>
      </Card>

      {/* Resumo da Conta */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <Receipt sx={{ mr: 1 }} />
            Resumo da Conta
          </Typography>
          
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="medium">
                {formatCurrency(result.breakdown.subtotal)}
              </Typography>
            </Box>

            {result.breakdown.discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="success.main">Desconto:</Typography>
                <Typography color="success.main" fontWeight="medium">
                  -{formatCurrency(result.breakdown.discount)}
                </Typography>
              </Box>
            )}

            {result.breakdown.tip > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Gorjeta:</Typography>
                <Typography fontWeight="medium">
                  {formatCurrency(result.breakdown.tip)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {formatCurrency(result.breakdown.total)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Pessoas:</Typography>
              <Typography variant="h6" fontWeight="bold">
                {result.people}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Itens da Conta */}
      {result.items && result.items.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Itens da Conta
            </Typography>
            <List sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              {result.items.map((item, index) => (
                <ListItem key={index} divider={index < result.items.length - 1}>
                  <ListItemText
                    primary={item.name}
                    secondary={formatCurrency(item.price)}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );

  const renderCustomResult = () => (
    <>
      {/* Total da Conta */}
      <Card sx={{ mb: 3, textAlign: 'center' }}>
        <CardContent sx={{ py: 4 }}>
          <Receipt sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
          <Typography variant="h2" component="div" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            {formatCurrency(result.finalTotal)}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            total da conta
          </Typography>
          <Chip
            label={`${Object.keys(result.personTotals).length} pessoas`}
            sx={{ mt: 2 }}
            variant="outlined"
          />
        </CardContent>
      </Card>

      {/* Valor por Pessoa */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Valor por Pessoa
      </Typography>
      
      {Object.values(result.personTotals).map((person, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">{person.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {formatCurrency(person.total)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyToClipboard(`${person.name}: ${formatCurrency(person.total)}`)}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            
            {person.items && person.items.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Itens:
                </Typography>
                <List dense sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  {person.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} divider={itemIndex < person.items.length - 1}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">
                              {item.name}
                              {item.sharedWith > 1 && (
                                <Typography component="span" variant="caption" color="text.secondary">
                                  {' '}(dividido com {item.sharedWith})
                                </Typography>
                              )}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {formatCurrency(item.price)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack spacing={0.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(person.subtotal)}
                    </Typography>
                  </Box>
                  
                  {person.discount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="success.main">Desconto:</Typography>
                      <Typography variant="body2" color="success.main">
                        -{formatCurrency(person.discount)}
                      </Typography>
                    </Box>
                  )}
                  
                  {person.tip > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Gorjeta:</Typography>
                      <Typography variant="body2">
                        {formatCurrency(person.tip)}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Resultado da Divisão
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {type === 'simple' ? renderSimpleResult() : renderCustomResult()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Ações
              </Typography>
              
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Share />}
                  onClick={shareResult}
                  sx={{ py: 1.5 }}
                >
                  Compartilhar Resultado
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Calculate />}
                  onClick={() => navigate(type === 'simple' ? '/calculate' : '/custom')}
                  sx={{ py: 1.5 }}
                >
                  Nova Divisão
                </Button>
                
                <Button
                  variant="text"
                  fullWidth
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                  sx={{ py: 1.5 }}
                >
                  Voltar ao Início
                </Button>
              </Stack>

              <Alert severity="success" sx={{ mt: 3, fontSize: '0.875rem' }}>
                Cálculo realizado com sucesso! Use os botões acima para compartilhar ou fazer uma nova divisão.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultPage;
