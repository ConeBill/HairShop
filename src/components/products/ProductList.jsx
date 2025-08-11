
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

function getStockVariant(stock, minStock) {
  if (stock === 0) return 'destructive';
  if (stock < minStock) return 'secondary';
  return 'default';
}

function getStockText(stock, minStock) {
  if (stock === 0) return 'Esgotado';
  if (stock < minStock) return `Estoque baixo (${stock})`;
  return `Em estoque (${stock})`;
}

export function ProductList({ products }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
          <p className="text-muted-foreground">Visualize e gerencie seus produtos.</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="p-0">
               <Image
                  alt={product.name}
                  className="aspect-square w-full rounded-t-lg object-cover"
                  height="300"
                  src={product.image}
                  width="300"
                  data-ai-hint="hair product bottle"
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <p className="text-sm mt-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <p className="font-semibold text-lg">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              <Badge variant={getStockVariant(product.stock, product.minStock)}>
                {getStockText(product.stock, product.minStock)}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
