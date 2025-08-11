
"use client";
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createProductAction, generateDescriptionAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Salvando...' : 'Salvar Produto'}
    </Button>
  );
}

function GenerateButton({ onGeneration }) {
  const { pending } = useFormStatus();
  return (
    <Button type="button" variant="outline" disabled={pending} onClick={onGeneration} className="w-full">
       <Sparkles className="mr-2 h-4 w-4" />
      {pending ? 'Gerando...' : 'Gerar Descrição com IA'}
    </Button>
  );
}

export function ProductForm() {
  const [description, setDescription] = useState('');
  const [aiError, setAiError] = useState('');
  const [productName, setProductName] = useState('');
  const [productAttributes, setProductAttributes] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const handleGenerateDescription = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productAttributes', productAttributes);
    formData.append('targetAudience', targetAudience);
    const result = await generateDescriptionAction(formData);
    if (result.error) {
      setAiError(result.error);
    } else {
      setDescription(result.description);
      setAiError('');
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <form action={createProductAction}>
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Produto</CardTitle>
              <CardDescription>Forneça as informações básicas do produto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" name="name" required onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="brand">Marca</Label>
                  <Input id="brand" name="brand" required />
                </div>
              </div>
              <div>
                <Label htmlFor="attributes">Atributos (separados por vírgula)</Label>
                <Input id="attributes" name="attributes" placeholder="Ex: sem sal, vegano, para cabelos loiros" required onChange={(e) => setProductAttributes(e.target.value)} />
              </div>
              <div className="hidden">
                 <Textarea id="description" name="description" value={description} readOnly />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="stock">Estoque Inicial</Label>
                  <Input id="stock" name="stock" type="number" required />
                </div>
                <div>
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input id="minStock" name="minStock" type="number" required />
                </div>
              </div>
              <div>
                <Label htmlFor="productDetails">Detalhes do Produto (Fornecedor, Custo, etc)</Label>
                <Input id="productDetails" name="productDetails" required />
              </div>
              <SubmitButton />
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Gerador de Descrição</CardTitle>
            <CardDescription>Use IA para criar uma descrição.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="targetAudience">Público-alvo</Label>
              <Input id="targetAudience" name="targetAudience" placeholder="Ex: mulheres com cabelos cacheados" required onChange={(e) => setTargetAudience(e.target.value)} />
            </div>
            <GenerateButton onGeneration={handleGenerateDescription} />
            {aiError && <p className="text-sm text-destructive">{aiError}</p>}
            <div>
              <Label>Descrição Gerada</Label>
              <Textarea readOnly value={description} placeholder="A descrição gerada pela IA aparecerá aqui." className="min-h-[180px]"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
