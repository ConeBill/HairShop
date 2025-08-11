
"use client";
import { useFormState, useFormStatus } from 'react-dom';
import { createSaleAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Registrando...' : 'Registrar Venda'}
    </Button>
  );
}

export function SalesForm({ products }) {
  const [state, formAction] = useFormState(createSaleAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Erro ao registrar venda",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="productId">Produto</Label>
        <Select name="productId" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={String(product.id)} disabled={product.stock === 0}>
                {product.name} (Estoque: {product.stock})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="quantity">Quantidade</Label>
        <Input id="quantity" name="quantity" type="number" min="1" required />
      </div>
      <SubmitButton />
    </form>
  );
}
