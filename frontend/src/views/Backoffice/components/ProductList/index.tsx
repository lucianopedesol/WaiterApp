import { useState, useMemo } from "react";
import { api } from "../../../../server/api";
import { Card, CardHeader, CardTitle, Button, Table, Th, Td, ActionsContainer } from "../../styles"
import FormModal from "../FormModal";
import ProductForm from "../ProductForm";
import { toast } from "react-toastify";


interface ProductListProps {
  categories: Category[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ categories, products, setProducts }) => {

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mapeamento de categorias para busca rápida de nome
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      if (cat._id !== undefined) {
        acc[cat._id] = cat.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);


  const handleSaveProduct = async (productToSave: Omit<Product, 'id'> & { id?: string }) => {
    const formData = new FormData();
    formData.append('name', productToSave.name);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString().replace(',', '.'));
    formData.append('active', productToSave.active.toString());
    formData.append('category', productToSave.category);

    // Converte o array de ingredientes para uma string JSON
    formData.append('ingredients', JSON.stringify(productToSave.ingredients));
    console.log(productToSave.image);
    if (productToSave.image) {
      formData.append('image', productToSave.image);
    }
    if (productToSave._id) {
      // Editar
      formData.append('id', productToSave._id);
      try {
        // Envia os dados usando o Axios
        const response = await api.patch(`products/${productToSave._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Produto atualizado com sucesso!');
        console.log('Upload de produto bem-sucedido:', response.data);
        console.log('Dados enviados! Verifique o console para os detalhes.');
        const index = products.findIndex(p => p._id === productToSave._id);
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], ...productToSave };
        setProducts(updatedProducts);
        setProductModalOpen(false);

      } catch (error) {
        console.error('Erro no upload:', error);
      }

    } else {
      try {
        // Envia os dados usando o Axios
        const response = await api.post('products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Produto criado com sucesso!');
        console.log('Upload de produto bem-sucedido:', response.data);
        console.log('Dados enviados! Verifique o console para os detalhes.');
        setProducts([...products, response.data]);
        setProductModalOpen(false);

      } catch (error) {
        console.error('Erro no upload:', error);
      }
    }

  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p._id !== productId));
  };

  const openProductModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  return (
    <>
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
              <Th>Disponível</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{categoryMap[product.category] || 'Sem Categoria'}</Td>
                <Td>{product.active ? 'Sim' : 'Não'}</Td>
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
  )
}

export default ProductList;
