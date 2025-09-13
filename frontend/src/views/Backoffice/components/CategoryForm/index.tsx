import { useState } from "react";
import { FormGroup, Label, Input, ModalFooter, Button } from "../../styles";

// Formulário de Categoria
interface CategoryFormProps {
  category: Category | null;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category?.name || '');
  const [icon, setIcon] = useState(category?.icon || '');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ ...category, name, icon, active: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup >
        <Label htmlFor="category-icon">Ícone da Categoria</Label>
        <Input
          id="category-icon"
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Ex: Bebidas"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="category-name">Nome da Categoria</Label>
        <Input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Bebidas"
          required
        />
      </FormGroup>

      <ModalFooter>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Categoria</Button>
      </ModalFooter>
    </form>
  );
};

export default CategoryForm;
