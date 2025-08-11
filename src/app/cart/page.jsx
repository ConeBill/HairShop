import { CartView } from '@/components/cart/CartView';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CartPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">Seu Carrinho de Compras</CardTitle>
                <CardDescription>Revise os itens e prossiga para o checkout.</CardDescription>
            </CardHeader>
            <CardContent>
                <CartView />
            </CardContent>
        </Card>
    </div>
  );
}
