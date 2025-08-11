'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

export function CartView() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const cartItems = Object.values(cart);

  if (cartCount === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Seu carrinho está vazio.</h2>
        <p className="mt-2 text-muted-foreground">Que tal adicionar alguns produtos?</p>
        <Button asChild className="mt-6">
          <Link href="/store">Ir para a Loja</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-right">Preço Unitário</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="text-center">Remover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint="hair product bottle"
                    />
                    <div>
                      <Link href={`/store/product/${item.id}`} className="font-medium hover:text-primary">{item.name}</Link>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                   <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                           <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                            className="w-16 h-8 text-center"
                            min="1"
                            max={item.stock}
                        />
                         <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                           <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </TableCell>
                <TableCell className="text-right">R$ {item.price.toFixed(2).replace('.', ',')}</TableCell>
                <TableCell className="text-right">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
           <TableFooter>
                <TableRow className="bg-muted/50">
                    <TableCell colSpan={3} className="text-right font-bold text-lg">Total</TableCell>
                    <TableCell className="text-right font-bold text-lg">R$ {cartTotal.toFixed(2).replace('.', ',')}</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm" onClick={clearCart}>Limpar Carrinho</Button>
                    </TableCell>
                </TableRow>
           </TableFooter>
        </Table>
      </div>
      <div className="mt-8 flex justify-end">
        <Button asChild size="lg">
          <Link href="/checkout">Finalizar Compra</Link>
        </Button>
      </div>
    </div>
  );
}
