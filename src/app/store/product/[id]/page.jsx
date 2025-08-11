'use client';
import { useState, useEffect } from 'react';
import { getProductById } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import { ShoppingBag, Minus, Plus } from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductById(params.id);
      if (!fetchedProduct) {
        notFound();
      }
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
        <div className="flex justify-center items-center h-full">
            <p>Carregando produto...</p>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        if (newQuantity < 1) return 1;
        if (newQuantity > product.stock) return product.stock;
        return newQuantity;
    });
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex justify-center items-center">
            <Image
                alt={product.name}
                className="aspect-square w-full max-w-md rounded-lg object-cover border"
                height="600"
                src={product.image}
                width="600"
                data-ai-hint="hair product bottle"
            />
        </div>
        <div className="space-y-6">
            <div>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            </div>
            <p className="text-muted-foreground text-base">{product.description}</p>
             <div className="space-y-2">
                <h2 className="text-lg font-semibold">Atributos</h2>
                <div className="flex flex-wrap gap-2">
                    {product.attributes.split(',').map(attr => (
                        <span key={attr} className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">{attr.trim()}</span>
                    ))}
                </div>
            </div>
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                </span>
            </div>
            
            {product.stock > 0 && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                           <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (val > 0 && val <= product.stock) setQuantity(val);
                                else if (val > product.stock) setQuantity(product.stock);
                                else if (!val) setQuantity(1);
                            }}
                            className="w-16 text-center"
                            min="1"
                            max={product.stock}
                        />
                         <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                           <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Adicionar ao Carrinho
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
