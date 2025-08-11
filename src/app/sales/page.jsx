
import { getSales } from '@/lib/data';
import { SalesHistory } from '@/components/sales/SalesHistory';

export default async function SalesPage() {
  const sales = await getSales();
  return <SalesHistory sales={sales} />;
}
