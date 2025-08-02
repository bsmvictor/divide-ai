# API Documentation - Divide.AI

## Base URL
- **Desenvolvimento**: `http://localhost:3001/api`
- **Produção**: `https://your-domain.com/api`

## Endpoints

### Health Check
**GET** `/health`

Verifica se a API está funcionando.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "service": "divide-ai-api"
}
```

---

### Calcular Divisão Simples
**POST** `/bills/calculate`

Calcula a divisão de uma conta de forma simples (valor igual para todos).

**Request Body:**
```json
{
  "total": 100.00,          // Opcional: valor total da conta
  "items": [                // Opcional: lista de itens (alternativa ao total)
    {
      "name": "Pizza",
      "price": 45.00
    },
    {
      "name": "Refrigerante",
      "price": 15.00
    }
  ],
  "people": 4,              // Obrigatório: número de pessoas
  "tip": 10,                // Opcional: gorjeta em porcentagem (padrão: 0)
  "discount": 5.00          // Opcional: desconto em reais (padrão: 0)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-generated",
    "total": 100.00,
    "items": [...],
    "people": 4,
    "tip": 10,
    "discount": 5.00,
    "calculatedTotal": 100.00,
    "totalAfterDiscount": 95.00,
    "tipAmount": 9.50,
    "finalTotal": 104.50,
    "perPerson": 26.13,
    "breakdown": {
      "subtotal": 100.00,
      "discount": 5.00,
      "tip": 9.50,
      "total": 104.50
    },
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### Calcular Divisão Personalizada
**POST** `/bills/calculate-custom`

Calcula a divisão personalizada onde diferentes pessoas pagam por diferentes itens.

**Request Body:**
```json
{
  "items": [
    {
      "name": "Pizza Margherita",
      "price": 45.00,
      "people": ["person-1-id", "person-2-id"]
    },
    {
      "name": "Refrigerante",
      "price": 8.00,
      "people": ["person-1-id"]
    }
  ],
  "people": [
    {
      "id": "person-1-id",
      "name": "João"
    },
    {
      "id": "person-2-id", 
      "name": "Maria"
    }
  ],
  "tip": 10,                // Opcional: gorjeta em porcentagem
  "discount": 5.00          // Opcional: desconto em reais
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-generated",
    "items": [...],
    "people": [...],
    "tip": 10,
    "discount": 5.00,
    "subtotal": 53.00,
    "totalAfterDiscount": 48.00,
    "tipAmount": 4.80,
    "finalTotal": 52.80,
    "personTotals": {
      "person-1-id": {
        "name": "João",
        "items": [
          {
            "name": "Pizza Margherita",
            "price": 22.50,
            "originalPrice": 45.00,
            "sharedWith": 2
          },
          {
            "name": "Refrigerante",
            "price": 8.00,
            "originalPrice": 8.00,
            "sharedWith": 1
          }
        ],
        "subtotal": 30.50,
        "discount": 2.88,
        "tip": 2.76,
        "total": 30.38
      },
      "person-2-id": {
        "name": "Maria",
        "items": [
          {
            "name": "Pizza Margherita",
            "price": 22.50,
            "originalPrice": 45.00,
            "sharedWith": 2
          }
        ],
        "subtotal": 22.50,
        "discount": 2.12,
        "tip": 2.04,
        "total": 22.42
      }
    },
    "breakdown": {
      "subtotal": 53.00,
      "discount": 5.00,
      "tip": 4.80,
      "total": 52.80
    },
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Número de pessoas deve ser maior que zero"
}
```

### 500 Internal Server Error
```json
{
  "error": "Erro interno do servidor",
  "message": "Detalhes do erro (apenas em desenvolvimento)"
}
```

### 404 Not Found
```json
{
  "error": "Rota não encontrada"
}
```

## Rate Limiting
- **Limite**: 100 requisições por IP a cada 15 minutos
- **Response quando excedido**: 
```json
{
  "error": "Muitas requisições, tente novamente em 15 minutos"
}
```

## Validações

### Divisão Simples
- `people` deve ser um número inteiro maior que 0
- `total` ou `items` deve ser fornecido (não ambos)
- Se `items` for fornecido, cada item deve ter `name` (string) e `price` (number >= 0)
- `tip` deve ser um número >= 0 (porcentagem)
- `discount` deve ser um número >= 0 (valor em reais)

### Divisão Personalizada
- `people` deve ser um array não vazio com objetos contendo `id` e `name`
- `items` deve ser um array não vazio
- Cada item deve ter `name`, `price` >= 0, e `people` (array de IDs válidos)
- Todos os IDs em `items[].people` devem existir no array `people`

## Exemplos de Uso

### cURL - Divisão Simples
```bash
curl -X POST http://localhost:3001/api/bills/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "total": 120.00,
    "people": 4,
    "tip": 10,
    "discount": 0
  }'
```

### cURL - Divisão Personalizada
```bash
curl -X POST http://localhost:3001/api/bills/calculate-custom \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Pizza",
        "price": 50.00,
        "people": ["1", "2"]
      }
    ],
    "people": [
      {"id": "1", "name": "João"},
      {"id": "2", "name": "Maria"}
    ],
    "tip": 10
  }'
```
