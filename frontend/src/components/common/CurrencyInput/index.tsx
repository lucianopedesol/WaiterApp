import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../views/Backoffice/styles';


export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;
// Função para formatar um número para o formato de moeda BRL
const formatCurrency = (value?: string | number) => {
  if (value === null || value === undefined) return '';

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Garante que o valor é um número para a formatação
  return formatter.format(Number(value));
};

// Função para limpar a string de input e retornar um número
const parseCurrency = (value?: string) => {
  if (!value) return 0;

  // Remove o prefixo "R$ ", pontos e substitui a vírgula por ponto
  const cleanValue = value.replace('R$ ', '').replace(/\./g, '').replace(',', '.');

  // Converte para número de ponto flutuante
  return parseFloat(cleanValue) || 0;
};

const CurrencyInput = ({ value, onValueChange }: { value?: string | number; onValueChange: (value: string | number) => void; }) => {
  // Estado local para a string formatada no input
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  // Sincroniza o estado de exibição com o valor externo
  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (event: { target: { value: any; }; }) => {
    const inputValue = event.target.value;

    // Remove apenas os caracteres não numéricos para a lógica interna
    const digitsOnly = inputValue.replace(/\D/g, '');

    // Divide por 100 para ter o valor correto com as casas decimais
    const numericValue = digitsOnly ? parseFloat(digitsOnly) / 100 : 0;

    // Atualiza o estado externo com o valor numérico puro
    onValueChange(numericValue);
  };


  return (
    <Input
      type="text"
      name='price'
      value={displayValue}
      onChange={handleChange}
      placeholder="R$ 0,00"
    />
  );
};

export default CurrencyInput;
