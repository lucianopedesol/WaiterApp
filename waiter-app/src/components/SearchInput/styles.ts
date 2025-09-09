

import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';

// Componente estilizado para o contêiner do input
export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding-horizontal: 8px;
  width: 90%;
`;

// Componente estilizado para o input de texto
export const StyledTextInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  padding-horizontal: 10px;
  color: #333;
`;
