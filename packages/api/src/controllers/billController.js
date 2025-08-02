const express = require('express');
const { v4: uuidv4 } = require('uuid');
const BillService = require('../services/BillService');

const router = express.Router();

/**
 * @route POST /api/bills/calculate
 * @desc Calcula a divisão de uma conta
 * @body {
 *   total?: number,
 *   items?: Array<{name: string, price: number}>,
 *   people: number,
 *   tip?: number,
 *   discount?: number
 * }
 */
router.post('/calculate', async (req, res) => {
  try {
    const { total, items, people, tip = 0, discount = 0 } = req.body;

    // Validações
    if (!people || people <= 0) {
      return res.status(400).json({
        error: 'Número de pessoas deve ser maior que zero'
      });
    }

    if (!total && (!items || !Array.isArray(items) || items.length === 0)) {
      return res.status(400).json({
        error: 'Informe o total da conta ou os itens'
      });
    }

    if (items && items.some(item => !item.name || typeof item.price !== 'number' || item.price < 0)) {
      return res.status(400).json({
        error: 'Todos os itens devem ter nome e preço válido'
      });
    }

    const billData = {
      id: uuidv4(),
      total,
      items,
      people,
      tip,
      discount,
      createdAt: new Date().toISOString()
    };

    const result = BillService.calculateBill(billData);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Erro ao calcular conta:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

/**
 * @route POST /api/bills/calculate-custom
 * @desc Calcula divisão personalizada por pessoa
 * @body {
 *   items: Array<{name: string, price: number, people: Array<string>}>,
 *   people: Array<{id: string, name: string}>,
 *   tip?: number,
 *   discount?: number
 * }
 */
router.post('/calculate-custom', async (req, res) => {
  try {
    const { items, people, tip = 0, discount = 0 } = req.body;

    // Validações
    if (!people || !Array.isArray(people) || people.length === 0) {
      return res.status(400).json({
        error: 'Lista de pessoas é obrigatória'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Lista de itens é obrigatória'
      });
    }

    const billData = {
      id: uuidv4(),
      items,
      people,
      tip,
      discount,
      createdAt: new Date().toISOString()
    };

    const result = BillService.calculateCustomBill(billData);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Erro ao calcular conta personalizada:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

module.exports = router;
