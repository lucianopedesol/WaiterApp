import React, { useState, useMemo, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { api } from '../../utils/api';
import FileInput from '../common/FileInput';

// --- TIPOS GLOBAIS (TYPESCRIPT) --- //
interface Ingredient {
  name: string;
  icon: string;
}

interface Category {
  _id?: string;
  icon: string;
  name: string;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  quantity: number;
  category: string;
}



// --- TEMA E ESTILOS GLOBAIS --- //
const theme = {
  colors: {
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    secondary: '#6B7280',
    danger: '#EF4444',
    dangerHover: '#DC2626',
    success: '#10B981',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  borderRadius: '8px',
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Inter', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// --- COMPONENTES ESTILIZADOS (STYLED COMPONENTS) --- //
const AppContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  background-color: ${theme.colors.surface};
  padding: 0.5rem;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
`;

const NavButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active }) =>
    $active ? theme.colors.surface : theme.colors.textSecondary};

  &:hover {
    background-color: ${({ $active }) =>
    $active ? theme.colors.primaryHover : theme.colors.background};
    color: ${({ $active }) =>
    $active ? theme.colors.surface : theme.colors.textPrimary};
  }
`;

const Card = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.md};
  padding: 2rem;
  border: 1px solid ${theme.colors.border};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return `
          background-color: ${theme.colors.danger};
          color: white;
          &:hover { background-color: ${theme.colors.dangerHover}; }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          &:hover { background-color: ${theme.colors.background}; }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover { background-color: ${theme.colors.primaryHover}; }
        `;
    }
  }}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  background-color: ${theme.colors.background};
  color: ${theme.colors.textSecondary};
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  vertical-align: middle;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: ${theme.borderRadius};
  width: 100%;
  max-width: 900px;
  box-shadow: ${theme.shadows.md};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
`;



const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  background-color: ${theme.colors.background};
`;

const IngredientItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${theme.colors.surface};
  border-radius: 4px;
  border: 1px solid ${theme.colors.border};
  font-size: 0.9rem;
`;

const IngredientInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
`;


// --- COMPONENTES FUNCIONAIS --- //

// Modal para Formulários
interface FormModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ title, children, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <Button variant="secondary" onClick={onClose} style={{ padding: '0.3rem' }}>✖</Button>
      </ModalHeader>
      {children}
    </ModalContent>
  </ModalOverlay>
);

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
    onSave({ ...category, name, icon });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
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
    quantity: product?.quantity || 0,
    category: product?.category || (categories.length > 0 ? categories[0]._id : '')
  });

  const [ingName, setIngName] = useState('');
  const [ingIcon, setIngIcon] = useState('');

  const handleChange = (e: { target: { name: any; value: any; type: any; }; }) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
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
          <Label htmlFor="product-quantity">Quantidade em Estoque</Label>
          <Input id="product-quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} min="0" required />
        </FormGroup>

        <ModalFooter>
          <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
          <Button type="submit">Salvar Produto</Button>
        </ModalFooter>
      </div>
      <div>
        <FormGroup>
          <FileInput />
        </FormGroup>
      </div>
    </FormContainer>
  );
};


// --- COMPONENTE PRINCIPAL --- //
const Backoffice = () => {
  const [view, setView] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Mapeamento de categorias para busca rápida de nome
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      if (cat._id !== undefined) {
        acc[cat._id] = cat.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  // --- Funções CRUD para Categorias --- //
  const handleSaveCategory = (categoryToSave: Omit<Category, 'id'> & { id?: string }) => {
    if (categoryToSave._id) {
      // Editar
      setCategories(categories.map(c => c._id === categoryToSave._id ? { ...c, ...categoryToSave } as Category : c));
    } else {
      // Criar
      const newCategory: Category = { ...categoryToSave, id: `cat-${Date.now()}` } as Category;
      setCategories([...categories, newCategory]);
    }
    setCategoryModalOpen(false);
  };

  const handleDeleteCategory = (category: string) => {
    if (products.some(p => p.category === category)) {
      alert('Não é possível deletar uma categoria que está sendo usada por um produto.');
      return;
    }
    setCategories(categories.filter(c => c._id !== category));
  };

  const openCategoryModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  // --- Funções CRUD para Produtos --- //
  const handleSaveProduct = (productToSave: Omit<Product, 'id'> & { id?: string }) => {
    if (productToSave._id) {
      // Editar
      setProducts(products.map(p => p._id === productToSave._id ? { ...p, ...productToSave } as Product : p));
    } else {
      // Criar
      const newProduct: Product = { ...productToSave, id: `prod-${Date.now()}` } as Product;
      setProducts([...products, newProduct]);
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p._id !== productId));
  };

  const openProductModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  useEffect(() => {
    api.get('categories').then(({ data }) => setCategories(data));
    api.get('products').then(({ data }) => {
      console.log(data);
      setProducts(data)
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>Backoffice</Title>
          <Nav>
            <NavButton $active={view === 'products'} onClick={() => setView('products')}>
              Gerenciar Produtos
            </NavButton>
            <NavButton $active={view === 'categories'} onClick={() => setView('categories')}>
              Gerenciar Categorias
            </NavButton>
          </Nav>
        </Header>

        {view === 'products' ? (
          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <Button onClick={() => openProductModal()}>
                + Adicionar Produto
              </Button>
            </CardHeader>
            <Table>
              <thead>
                <tr>
                  <Th>Nome</Th>
                  <Th>Categoria</Th>
                  <Th>Estoque</Th>
                  <Th>Ações</Th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <Td>{product.name}</Td>
                    <Td>{categoryMap[product.category] || 'Sem Categoria'}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>
                      <ActionsContainer>
                        <Button variant="secondary" onClick={() => openProductModal(product)}>Editar</Button>
                        <Button variant="danger" onClick={() => handleDeleteProduct(product._id!)}>Deletar</Button>
                      </ActionsContainer>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <Button onClick={() => openCategoryModal()}>
                + Adicionar Categoria
              </Button>
            </CardHeader>
            <Table>
              <thead>
                <tr>
                  <Th>Ícone</Th>
                  <Th>Nome</Th>
                  <Th>Ações</Th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id}>
                    <Td>{cat.icon}</Td>
                    <Td>{cat.name}</Td>
                    <Td>
                      <ActionsContainer>
                        <Button variant="secondary" onClick={() => openCategoryModal(cat)}>Editar</Button>
                        <Button variant="danger" onClick={() => handleDeleteCategory(cat._id!)}>Deletar</Button>
                      </ActionsContainer>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </AppContainer>

      {/* Modais */}
      {isCategoryModalOpen && (
        <FormModal
          title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
          onClose={() => setCategoryModalOpen(false)}
        >
          <CategoryForm
            category={editingCategory}
            onSave={handleSaveCategory}
            onCancel={() => setCategoryModalOpen(false)}
          />
        </FormModal>
      )}

      {isProductModalOpen && (
        <FormModal
          title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
          onClose={() => setProductModalOpen(false)}
        >
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSave={handleSaveProduct}
            onCancel={() => setProductModalOpen(false)}
          />
        </FormModal>
      )}

    </>
  );
};

export default Backoffice;

