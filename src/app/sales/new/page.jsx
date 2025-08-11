
import { getProducts } from '@/lib/data';
import { SalesForm } from '@/components/sales/SalesForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function NewSalePage() {
  const products = await getProducts();
  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Registrar Nova Venda</CardTitle>
          <CardDescription>Selecione o produto e a quantidade para registrar a venda.</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesForm products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
