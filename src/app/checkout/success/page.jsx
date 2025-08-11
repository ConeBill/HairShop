import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
    return (
        <div className="flex justify-center items-center h-full py-12">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <CardTitle className="mt-4 text-3xl">Compra Realizada com Sucesso!</CardTitle>
                    <CardDescription className="mt-2">
                        Obrigado pelo seu pedido. Ele foi registrado e em breve suas vendas e estoque serão atualizados.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <Link href="/store">Continuar Comprando</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/">Ir para o Dashboard</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
