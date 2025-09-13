import { useState } from "react";
import FileInput from "../../../../components/common/FileInput";
import { FormContainer, FormGroup, Label, Input, Select, Textarea, IngredientList, theme, IngredientItem, Button, IngredientInputGroup, ModalFooter, FormContent } from "../../styles";
import CurrencyInput from "../../../../components/common/CurrencyInput";

// Formulário de Produto
interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    ingredients: product?.ingredients || [],
    active: product?.active || false,
    price: product?.price || 0,
    category: product?.category || (categories.length > 0 ? categories[0]._id : ''),
    image: product?.image || null,
  });

  const [ingName, setIngName] = useState('');
  const [ingIcon, setIngIcon] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    if (!ingName.trim()) return;
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: ingName, icon: ingIcon }]
    }));
    setIngName('');
    setIngIcon('');
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) return;
    onSave({ ...product, ...formData, category: formData.category || '' });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormContent>
        <div>
          <FormGroup>
            <Label htmlFor="product-name">Nome do Produto</Label>
            <Input id="product-name" name="name" type="text" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="product-category">Categoria</Label>
            <Select id="product-category" name="category" value={formData.category} onChange={handleChange} required>
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="product-description">Descrição</Label>
            <Textarea id="product-description" name="description" value={formData.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Ingredientes</Label>
            <IngredientList>
              {formData.ingredients.length === 0 && <span style={{ color: theme.colors.textSecondary, fontSize: '0.9rem' }}>Nenhum ingrediente adicionado.</span>}
              {formData.ingredients.map((ing, index) => (
                <IngredientItem key={index}>
                  <span>{ing.icon} {ing.name}</span>
                  <Button type="button" variant="danger" onClick={() => handleRemoveIngredient(index)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Remover</Button>
                </IngredientItem>
              ))}
            </IngredientList>
            <IngredientInputGroup>
              <Input type="text" placeholder="Nome do Ingrediente" value={ingName} onChange={(e) => setIngName(e.target.value)} style={{ flex: 2 }} />
              <Input type="text" placeholder="Ícone" value={ingIcon} onChange={(e) => setIngIcon(e.target.value)} style={{ flex: 1 }} />
              <Button type="button" onClick={handleAddIngredient}>Adicionar</Button>
            </IngredientInputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="product-price">Valor</Label>
            <CurrencyInput
              value={formData.price}
              onValueChange={(value) => {
                setFormData(prev => ({
                  ...prev,
                  price: parseFloat(value.toString() || '0')
                }));
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="product-active">Produto disponível</Label>
            <Select
              id="product-active"
              name="active"
              value={formData.active ? "true" : "false"}
              onChange={e => {
              setFormData(prev => ({
                ...prev,
                active: e.target.value === "true"
              }));
              }}
              required
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </Select>
          </FormGroup>

        </div>
        <div>
          <FormGroup>
            <FileInput image={product?.imagePath} onChange={(image) => setFormData(prev => ({ ...prev, image }))} />
          </FormGroup>
        </div>
      </FormContent>
      <ModalFooter>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Produto</Button>
      </ModalFooter>
    </FormContainer>
  );
};

export default ProductForm;
