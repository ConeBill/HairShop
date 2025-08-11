
import { getLowStockSuggestionsAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing, Lightbulb } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function Suggestion({ product }) {
  const suggestion = await getLowStockSuggestionsAction(product);
  if (!suggestion) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            Ver Sugestão de IA
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">{suggestion.reorderSuggestion}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function LowStockAlerts({ products }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Estoque Baixo</CardTitle>
        <CardDescription>Produtos que precisam de reposição urgente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Alert key={product.id} variant="destructive">
              <BellRing className="h-4 w-4" />
              <AlertTitle>{product.name}</AlertTitle>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>Estoque atual: {product.stock}</span>
                  <span className="text-xs">Mínimo: {product.minStock}</span>
                </div>
                <Suggestion product={product} />
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum alerta de estoque. Tudo em ordem!</p>
        )}
      </CardContent>
    </Card>
  );
}
