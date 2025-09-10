import {FlatList} from 'react-native';
import {AddToCartButton, Image, ProductContainer, ProductDetails, Separator} from './styles';
import {Text} from '../Text';
import {formatCurrency} from '../../utils/formatCurrency';
import {PlusCircle} from '../Icons/PlusCircle';
import {Product} from '../../types/product';
import {ProductModal} from '../ProductModal';
import {useState} from 'react';
import SearchInput from '../SearchInput';
import { useProductSearch } from '../../hooks/useProductSearch'; // Importe o novo hook


interface MenuProps {
  onAddToCart(product: Product): void;
  products: Product[] | [];
}
export function Menu({ onAddToCart, products }: MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { filteredProducts, debouncedSearch } = useProductSearch(products);

  function handleProductPress(product: Product) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProductModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <SearchInput onChangeText={debouncedSearch} />
      <FlatList
        style={{ marginTop: 24 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={filteredProducts}
        keyExtractor={({ _id }) => _id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleProductPress(product)}>
            <Image
              source={{
                uri: `http://192.168.0.73:5000/uploads/${product.imagePath}`
              }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
              <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}/>
    </>
  );
}
