
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addProduct, recordSale } from '@/lib/data';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { generateStockLevelAlertWithSuggestions } from '@/ai/flows/stock-level-alert-with-suggestions';

export async function createProductAction(formData) {
  const rawData = Object.fromEntries(formData);

  const productData = {
    name: rawData.name,
    brand: rawData.brand,
    attributes: rawData.attributes,
    price: parseFloat(rawData.price),
    stock: parseInt(rawData.stock, 10),
    minStock: parseInt(rawData.minStock, 10),
    description: rawData.description,
    productDetails: rawData.productDetails,
  };

  await addProduct(productData);
  revalidatePath('/products');
  redirect('/products');
}

export async function generateDescriptionAction(formData) {
    const rawData = Object.fromEntries(formData);
    if (!rawData.productName || !rawData.productAttributes || !rawData.targetAudience) {
        return { error: 'Por favor, preencha todos os campos para gerar a descrição.' };
    }
    
    try {
        const result = await generateProductDescription({
            productName: rawData.productName,
            productAttributes: rawData.productAttributes,
            targetAudience: rawData.targetAudience,
        });
        return { description: result.productDescription };
    } catch (error) {
        console.error("AI Error:", error);
        return { error: 'Falha ao gerar descrição. Tente novamente.' };
    }
}

export async function getLowStockSuggestionsAction(product) {
    if (product.stock >= product.minStock) return null;

    try {
        const result = await generateStockLevelAlertWithSuggestions({
            productName: product.name,
            currentStock: product.stock,
            minimumStock: product.minStock,
            productDetails: product.productDetails,
        });
        return result;
    } catch (error) {
        console.error("AI Error:", error);
        return {
            alertMessage: `Alerta para ${product.name}: Falha ao buscar sugestões de IA.`,
            reorderSuggestion: 'Verifique a configuração da API ou tente novamente mais tarde.'
        };
    }
}

export async function createSaleAction(previousState, formData) {
  const rawData = Object.fromEntries(formData);
  try {
    await recordSale(rawData);
  } catch(error) {
    return { error: error.message };
  }
  
  revalidatePath('/sales');
  revalidatePath('/');
  revalidatePath('/products');
  redirect('/sales');
}
