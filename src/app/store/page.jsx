import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/store/ProductCard';

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  const products = await getProducts();
  const availableProducts = products.filter(p => p.stock > 0);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Nossa Loja</h1>
        <p className="text-lg text-muted-foreground mt-2">Os melhores produtos para o seu cabelo.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {availableProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
       {availableProducts.length === 0 && (
          <div className="text-center col-span-full py-20">
            <h2 className="text-2xl font-semibold">Nenhum produto disponível no momento.</h2>
            <p className="text-muted-foreground mt-2">Por favor, volte mais tarde!</p>
          </div>
        )}
    </div>
  );
}
