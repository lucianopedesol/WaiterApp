import { useState, useEffect } from 'react';
import { api } from '../../server/api';
import { AppContainer, Header, HeaderContainer, Nav, NavButton, StyledButton, Title } from './styles';
import { useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';

const BackIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);


// --- COMPONENTE PRINCIPAL --- //
const Backoffice = () => {
  let navigate = useNavigate();
  const [view, setView] = useState<'products' | 'categories'>('products');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    api.get('categories').then(({ data }) => setCategories(data));
    api.get('products').then(({ data }) => { setProducts(data) });
  }, []);

  return (
    <>
      <AppContainer>
        <Header>
          <HeaderContainer>
            <StyledButton onClick={() => navigate('/')}>
              <BackIcon />
            </StyledButton>
            <Title>Backoffice</Title>
          </HeaderContainer>
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
          <ProductList products={products} categories={categories} setProducts={setProducts} />
        ) : (
          <CategoryList categories={categories} products={products} setCategories={setCategories} />
        )}
      </AppContainer>



    </>
  );
};

export default Backoffice;

