import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Stack
} from '@mui/material';
import {
  Add,
  Delete,
  Calculate,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { billService } from '../services/api';

const CalculatePage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('total');
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState('');
  const [discount, setDiscount] = useState('');
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    if (!newItemName.trim() || !newItemPrice.trim()) {
      toast.error('Preencha o nome e preço do item');
      return;
    }

    const price = parseFloat(newItemPrice.replace(',', '.'));
    if (isNaN(price) || price <= 0) {
      toast.error('Preço deve ser um número válido');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: price
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    toast.success('Item adicionado');
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
    toast.success('Item removido');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateBill = async () => {
    const peopleCount = parseInt(people);
    if (!peopleCount || peopleCount <= 0) {
      toast.error('Número de pessoas deve ser maior que zero');
      return;
    }

    if (method === 'total' && (!total || parseFloat(total.replace(',', '.')) <= 0)) {
      toast.error('Informe um valor total válido');
      return;
    }

    if (method === 'items' && items.length === 0) {
      toast.error('Adicione pelo menos um item');
      return;
    }

    setLoading(true);

    try {
      const billData = {
        people: peopleCount,
        tip: parseFloat(tip.replace(',', '.')) || 0,
        discount: parseFloat(discount.replace(',', '.')) || 0,
      };

      if (method === 'items') {
        billData.items = items;
      } else {
        billData.total = parseFloat(total.replace(',', '.'));
      }

      const response = await billService.calculateBill(billData);
      
      navigate('/result', { 
        state: { 
          result: response.data,
          type: 'simple'
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const quickTipSelect = (tipValue) => {
    setTip(tipValue.toString());
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton 
          onClick={() => navigate('/')} 
          sx={{ mr: 2, p: 1 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Divisão Simples
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Método de Cálculo */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Método de Cálculo
              </Typography>
              <ToggleButtonGroup
                value={method}
                exclusive
                onChange={(e, newMethod) => newMethod && setMethod(newMethod)}
                fullWidth
                sx={{ 
                  '& .MuiToggleButton-root': {
                    py: 1.5,
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'transparent',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }
                  }
                }}
              >
                <ToggleButton value="total">
                  Valor Total
                </ToggleButton>
                <ToggleButton value="items">
                  Por Itens
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          {/* Valor Total ou Itens */}
          {method === 'total' ? (
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Valor Total
                </Typography>
                <TextField
                  label="Valor total da conta"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ step: "0.01" }}
                  placeholder="120.50"
                  helperText="Digite o valor total da conta em reais"
                />
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Itens da Conta
                </Typography>
                
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nome do item"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        fullWidth
                        placeholder="Pizza Margherita"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Preço"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        fullWidth
                        type="number"
                        inputProps={{ step: "0.01" }}
                        placeholder="45.90"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="contained"
                        onClick={addItem}
                        fullWidth
                        sx={{ height: '56px' }}
                        startIcon={<Add />}
                      >
                        Adicionar
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>

                {items.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      Itens ({items.length})
                    </Typography>
                    <List sx={{ bgcolor: 'transparent', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      {items.map((item, index) => (
                        <ListItem key={item.id} divider={index < items.length - 1}>
                          <ListItemText
                            primary={item.name}
                            secondary={formatCurrency(item.price)}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => removeItem(item.id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Total:</strong> {formatCurrency(items.reduce((sum, item) => sum + item.price, 0))}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Detalhes */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Detalhes
              </Typography>
              
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Número de pessoas"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      fullWidth
                      type="number"
                      inputProps={{ min: 1 }}
                      placeholder="4"
                      helperText="Quantas pessoas vão dividir?"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Desconto (R$)"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "0.01", min: 0 }}
                      placeholder="10.00"
                      helperText="Desconto em reais (opcional)"
                    />
                  </Grid>
                </Grid>

                <Box>
                  <TextField
                    label="Gorjeta (%)"
                    value={tip}
                    onChange={(e) => setTip(e.target.value)}
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.1", min: 0 }}
                    placeholder="10"
                    helperText="Porcentagem de gorjeta (opcional)"
                  />
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      Sugestões:
                    </Typography>
                    {[10, 15, 20].map((tipValue) => (
                      <Chip
                        key={tipValue}
                        label={`${tipValue}%`}
                        onClick={() => quickTipSelect(tipValue)}
                        size="small"
                        variant={tip === tipValue.toString() ? 'filled' : 'outlined'}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Resumo
              </Typography>
              
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Método:</Typography>
                  <Typography variant="body2">{method === 'total' ? 'Valor Total' : 'Por Itens'}</Typography>
                </Box>
                {method === 'items' && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Itens:</Typography>
                    <Typography variant="body2">{items.length}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Pessoas:</Typography>
                  <Typography variant="body2">{people || '0'}</Typography>
                </Box>
                {tip && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Gorjeta:</Typography>
                    <Typography variant="body2">{tip}%</Typography>
                  </Box>
                )}
                {discount && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Desconto:</Typography>
                    <Typography variant="body2">R$ {discount}</Typography>
                  </Box>
                )}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={calculateBill}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Calculate />}
                sx={{ mb: 2, py: 1.5 }}
              >
                {loading ? 'Calculando...' : 'Calcular Divisão'}
              </Button>

              <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                O resultado será exibido na próxima tela com todos os detalhes da divisão.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalculatePage;
