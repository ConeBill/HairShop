
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ sales }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas Recentes</CardTitle>
        <CardDescription>As últimas 5 vendas realizadas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length > 0 ? sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                     <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://placehold.co/100x100.png`} alt="Avatar" data-ai-hint="hair product" />
                        <AvatarFallback>{sale.productName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{sale.productName}</p>
                        <p className="text-sm text-muted-foreground">Quantidade: {sale.quantity}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">R$ {sale.totalValue.toFixed(2).replace('.', ',')}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan="2" className="text-center text-muted-foreground py-8">Nenhuma venda registrada ainda.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
