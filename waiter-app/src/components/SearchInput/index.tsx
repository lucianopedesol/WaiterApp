import React from 'react';
import { SearchIcon } from '../Icons/Search';
import { SearchContainer, StyledTextInput } from './styles';

// 1. Definição da interface para as props
interface SearchInputProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
}


// 2. Componente principal tipado
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Pesquisar...',
  onChangeText,
}) => {
  return (
    <SearchContainer>
      <SearchIcon size={20}  />
      <StyledTextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        onChangeText={onChangeText}
      />
    </SearchContainer>
  );
};

export default SearchInput;
