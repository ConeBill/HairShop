'use client';
import { useCart } from '@/context/CartContext';
import { checkoutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
    const { cart, cartTotal, cartCount, clearCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if(cartCount === 0) {
            router.push('/store');
        }
    }, [cartCount, router]);
    
    const handleCheckout = async () => {
        await checkoutAction(cart);
        clearCart();
    };
    
    if (cartCount === 0) {
        return null;
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumo do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {Object.values(cart).map(item => (
                               <div key={item.id} className="flex justify-between items-center">
                                   <div>
                                       <p className="font-medium">{item.name}</p>
                                       <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                                   </div>
                                   <p>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                               </div>
                           ))}
                           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                               <p>Total</p>
                               <p>R$ {cartTotal.toFixed(2).replace('.', ',')}</p>
                           </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Finalizar Compra</CardTitle>
                            <CardDescription>Preencha seus dados para completar o pedido.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" placeholder="Seu nome" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" />
                            </div>
                             <div>
                                <Label htmlFor="address">Endereço de Entrega</Label>
                                <Input id="address" placeholder="Rua, número, bairro..." />
                            </div>
                             <div>
                                <Label htmlFor="card">Cartão de Crédito</Label>
                                <Input id="card" placeholder="**** **** **** ****" />
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button className="w-full" size="lg" onClick={handleCheckout}>
                                Pagar R$ {cartTotal.toFixed(2).replace('.', ',')}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
