class BillService {
  /**
   * Calcula divisão simples da conta
   * @param {Object} billData - Dados da conta
   * @returns {Object} Resultado do cálculo
   */
  static calculateBill(billData) {
    const { total, items, people, tip, discount } = billData;
    
    // Calcula o total se baseado em itens
    const calculatedTotal = total || items.reduce((sum, item) => sum + item.price, 0);
    
    // Aplica desconto
    const totalAfterDiscount = calculatedTotal - discount;
    
    // Calcula gorjeta
    const tipAmount = (totalAfterDiscount * tip) / 100;
    
    // Total final
    const finalTotal = totalAfterDiscount + tipAmount;
    
    // Valor por pessoa
    const perPerson = finalTotal / people;
    
    return {
      ...billData,
      calculatedTotal,
      totalAfterDiscount,
      tipAmount,
      finalTotal,
      perPerson: Math.round(perPerson * 100) / 100, // Arredonda para 2 casas decimais
      breakdown: {
        subtotal: calculatedTotal,
        discount: discount,
        tip: tipAmount,
        total: finalTotal
      },
      items: items || []
    };
  }

  /**
   * Calcula divisão personalizada por pessoa
   * @param {Object} billData - Dados da conta personalizada
   * @returns {Object} Resultado do cálculo
   */
  static calculateCustomBill(billData) {
    const { items, people, tip, discount } = billData;
    
    // Inicializa valores por pessoa
    const personTotals = {};
    people.forEach(person => {
      personTotals[person.id] = {
        name: person.name,
        items: [],
        subtotal: 0
      };
    });

    // Calcula valor por item e pessoa
    items.forEach(item => {
      const peopleCount = item.people.length;
      const pricePerPerson = item.price / peopleCount;
      
      item.people.forEach(personId => {
        if (personTotals[personId]) {
          personTotals[personId].items.push({
            name: item.name,
            price: pricePerPerson,
            originalPrice: item.price,
            sharedWith: peopleCount
          });
          personTotals[personId].subtotal += pricePerPerson;
        }
      });
    });

    // Calcula totais
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const totalAfterDiscount = subtotal - discount;
    const tipAmount = (totalAfterDiscount * tip) / 100;
    const finalTotal = totalAfterDiscount + tipAmount;

    // Aplica desconto e gorjeta proporcionalmente
    Object.keys(personTotals).forEach(personId => {
      const person = personTotals[personId];
      const proportion = person.subtotal / subtotal;
      
      person.discount = discount * proportion;
      person.tip = tipAmount * proportion;
      person.total = person.subtotal - person.discount + person.tip;
      person.total = Math.round(person.total * 100) / 100;
    });

    return {
      ...billData,
      subtotal,
      totalAfterDiscount,
      tipAmount,
      finalTotal,
      personTotals,
      breakdown: {
        subtotal,
        discount,
        tip: tipAmount,
        total: finalTotal
      }
    };
  }

  /**
   * Valida dados da conta
   * @param {Object} billData - Dados para validar
   * @returns {Object} Resultado da validação
   */
  static validateBillData(billData) {
    const errors = [];

    if (!billData.people || billData.people <= 0) {
      errors.push('Número de pessoas deve ser maior que zero');
    }

    if (!billData.total && (!billData.items || billData.items.length === 0)) {
      errors.push('Informe o total da conta ou os itens');
    }

    if (billData.items) {
      billData.items.forEach((item, index) => {
        if (!item.name || typeof item.price !== 'number' || item.price < 0) {
          errors.push(`Item ${index + 1}: nome e preço válido são obrigatórios`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = BillService;
