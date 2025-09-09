import { useState, useCallback, useMemo } from 'react';
import { debounce } from '../../utils/debounce';
import { Product } from '../../types/product';

const DEBOUNCE_TIME = 400;
export function useProductSearch(products: Product[]) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const filterProducts = useCallback((text: string) => {
    if (text.trim() === '') {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const debouncedSearch = useMemo(() => debounce(filterProducts, DEBOUNCE_TIME), [filterProducts]);

  return { filteredProducts, debouncedSearch };
}
