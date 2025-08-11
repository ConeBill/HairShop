
import { getProducts } from '@/lib/data';
import { ProductList } from '@/components/products/ProductList';

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
