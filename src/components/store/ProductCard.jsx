"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0 border-b">
        <Link href={`/store/product/${product.id}`}>
          <Image
            alt={product.name}
            className="aspect-square w-full object-cover"
            height="300"
            src={product.image}
            width="300"
            data-ai-hint="hair product bottle"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/store/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="font-semibold text-xl">R$ {product.price.toFixed(2).replace('.', ',')}</p>
        <Button onClick={handleAddToCart} size="icon" variant="outline">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Adicionar ao Carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
