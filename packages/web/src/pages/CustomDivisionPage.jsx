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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack
} from '@mui/material';
import {
  Add,
  Delete,
  Calculate,
  ArrowBack,
  Person
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { billService } from '../services/api';

const CustomDivisionPage = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [selectedPeople, setSelectedPeople] = useState({});
  const [tip, setTip] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);

  const addPerson = () => {
    if (!newPersonName.trim()) {
      toast.error('Digite o nome da pessoa');
      return;
    }

    if (people.some(person => person.name.toLowerCase() === newPersonName.trim().toLowerCase())) {
      toast.error('Já existe uma pessoa com este nome');
      return;
    }

    const newPerson = {
      id: Date.now().toString(),
      name: newPersonName.trim()
    };

    setPeople([...people, newPerson]);
    setNewPersonName('');
    toast.success('Pessoa adicionada');
  };

  const removePerson = (personId) => {
    setPeople(people.filter(person => person.id !== personId));
    
    setItems(items.map(item => ({
      ...item,
      people: item.people.filter(id => id !== personId)
    })));

    const newSelectedPeople = { ...selectedPeople };
    delete newSelectedPeople[personId];
    setSelectedPeople(newSelectedPeople);
    
    toast.success('Pessoa removida');
  };

  const togglePersonSelection = (personId) => {
    setSelectedPeople(prev => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

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

    const selectedPeopleIds = Object.keys(selectedPeople).filter(id => selectedPeople[id]);
    if (selectedPeopleIds.length === 0) {
      toast.error('Selecione pelo menos uma pessoa para este item');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: price,
      people: selectedPeopleIds
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    setSelectedPeople({});
    toast.success('Item adicionado');
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
    toast.success('Item removido');
  };

  const getPersonName = (personId) => {
    const person = people.find(p => p.id === personId);
    return person ? person.name : 'Pessoa não encontrada';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateCustomBill = async () => {
    if (people.length === 0) {
      toast.error('Adicione pelo menos uma pessoa');
      return;
    }

    if (items.length === 0) {
      toast.error('Adicione pelo menos um item');
      return;
    }

    setLoading(true);

    try {
      const billData = {
        people: people,
        items: items,
        tip: parseFloat(tip.replace(',', '.')) || 0,
        discount: parseFloat(discount.replace(',', '.')) || 0,
      };

      const response = await billService.calculateCustomBill(billData);
      
      navigate('/result', { 
        state: { 
          result: response.data,
          type: 'custom'
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Divisão Personalizada
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Pessoas */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Pessoas
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Nome da pessoa"
                    value={newPersonName}
                    onChange={(e) => setNewPersonName(e.target.value)}
                    fullWidth
                    onKeyPress={(e) => e.key === 'Enter' && addPerson()}
                    placeholder="João Silva"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    onClick={addPerson}
                    fullWidth
                    sx={{ height: '56px' }}
                    startIcon={<Add />}
                  >
                    Adicionar
                  </Button>
                </Grid>
              </Grid>

              {people.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    Pessoas adicionadas ({people.length})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {people.map((person) => (
                      <Chip
                        key={person.id}
                        label={person.name}
                        onDelete={() => removePerson(person.id)}
                        variant="outlined"
                        icon={<Person />}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Itens */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Itens da Conta
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome do item"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    fullWidth
                    placeholder="Pizza Margherita"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Preço (R$)"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.01" }}
                    placeholder="45.90"
                  />
                </Grid>
              </Grid>

              {people.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Quem vai dividir este item?
                  </Typography>
                  <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'transparent' }}>
                    <FormGroup row>
                      {people.map((person) => (
                        <FormControlLabel
                          key={person.id}
                          control={
                            <Checkbox
                              checked={selectedPeople[person.id] || false}
                              onChange={() => togglePersonSelection(person.id)}
                            />
                          }
                          label={person.name}
                        />
                      ))}
                    </FormGroup>
                  </Paper>
                </Box>
              )}

              <Button
                variant="outlined"
                onClick={addItem}
                disabled={people.length === 0}
                startIcon={<Add />}
                fullWidth
              >
                Adicionar Item
              </Button>

              {items.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    Itens adicionados ({items.length})
                  </Typography>
                  <List sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    {items.map((item, index) => (
                      <ListItem key={item.id} divider={index < items.length - 1}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1">{item.name}</Typography>
                              <Typography variant="h6" color="primary">
                                {formatCurrency(item.price)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Dividido entre: {item.people.map(getPersonName).join(', ')}
                              <br />
                              <strong>Por pessoa:</strong> {formatCurrency(item.price / item.people.length)}
                            </Typography>
                          }
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
                      <strong>Total dos itens:</strong> {formatCurrency(items.reduce((sum, item) => sum + item.price, 0))}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Detalhes Adicionais */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Detalhes Adicionais
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                  <Typography variant="body2" color="text.secondary">Pessoas:</Typography>
                  <Typography variant="body2">{people.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Itens:</Typography>
                  <Typography variant="body2">{items.length}</Typography>
                </Box>
                {items.length > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Total:</Typography>
                    <Typography variant="body2">{formatCurrency(items.reduce((sum, item) => sum + item.price, 0))}</Typography>
                  </Box>
                )}
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
                onClick={calculateCustomBill}
                disabled={loading || people.length === 0 || items.length === 0}
                startIcon={loading ? <CircularProgress size={20} /> : <Calculate />}
                sx={{ mb: 2, py: 1.5 }}
              >
                {loading ? 'Calculando...' : 'Calcular Divisão'}
              </Button>

              <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                Adicione pessoas e itens para calcular a divisão personalizada.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomDivisionPage;
