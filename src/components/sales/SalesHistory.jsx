
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';

export function SalesHistory({ sales }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Histórico de Vendas</CardTitle>
            <CardDescription>Veja todas as vendas registradas.</CardDescription>
        </div>
        <Button asChild>
            <Link href="/sales/new">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Registrar Venda
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length > 0 ? sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.productName}</TableCell>
                <TableCell className="text-center">{sale.quantity}</TableCell>
                <TableCell className="text-right">R$ {sale.totalValue.toFixed(2).replace('.', ',')}</TableCell>
                <TableCell className="text-right">{format(new Date(sale.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan="4" className="text-center h-24">Nenhuma venda registrada.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
