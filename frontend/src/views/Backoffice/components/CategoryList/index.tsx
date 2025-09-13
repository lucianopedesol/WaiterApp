import { useState } from "react";
import { Card, CardHeader, CardTitle, Button, Table, Th, Td, ActionsContainer } from "../../styles";
import CategoryForm from "../CategoryForm";
import FormModal from "../FormModal";
import { toast } from "react-toastify";


interface CategoryListProps {
  products: Product[];
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryList = ({ products, categories, setCategories }: CategoryListProps) => {

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
      toast.info('Não é possível deletar uma categoria que está sendo usada por um produto.');
      return;
    }
    setCategories(categories.filter(c => c._id !== category));
  };

  const openCategoryModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  return (
    <>
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

    </>
  )
}
export default CategoryList;
