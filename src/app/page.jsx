
import { getProducts, getSales } from '@/lib/data';
import { DollarSign, Package, ShoppingCart, BellRing } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentSales } from '@/components/dashboard/RecentSales';
import { LowStockAlerts } from '@/components/dashboard/LowStockAlerts';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const products = await getProducts();
  const sales = await getSales();

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalValue, 0);
  const totalSales = sales.reduce((acc, sale) => acc + sale.quantity, 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < p.minStock);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita Total"
          value={`R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
          icon={DollarSign}
        />
        <StatCard
          title="Itens Vendidos"
          value={`+${totalSales}`}
          icon={ShoppingCart}
        />
        <StatCard
          title="Tipos de Produtos"
          value={totalProducts}
          icon={Package}
        />
        <StatCard
          title="Alertas de Estoque"
          value={lowStockProducts.length}
          icon={BellRing}
          variant={lowStockProducts.length > 0 ? "destructive" : "default"}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentSales sales={sales.slice(0, 5)} />
        </div>
        <div className="lg:col-span-3">
          <LowStockAlerts products={lowStockProducts} />
        </div>
      </div>
    </div>
  );
}
