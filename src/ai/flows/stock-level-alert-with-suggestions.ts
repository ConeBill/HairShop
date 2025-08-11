'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating stock level alerts with AI-powered reordering suggestions.
 *
 * - generateStockLevelAlertWithSuggestions - The function to trigger the flow.
 * - StockLevelAlertInput - The input type for the generateStockLevelAlertWithSuggestions function.
 * - StockLevelAlertOutput - The return type for the generateStockLevelAlertWithSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StockLevelAlertInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  currentStock: z.number().describe('The current stock level of the product.'),
  minimumStock: z.number().describe('The minimum acceptable stock level of the product.'),
  productDetails: z.string().describe('Detailed description of the product including supplier and cost.'),
});
export type StockLevelAlertInput = z.infer<typeof StockLevelAlertInputSchema>;

const StockLevelAlertOutputSchema = z.object({
  alertMessage: z.string().describe('The stock level alert message.'),
  reorderSuggestion: z.string().describe('AI-generated reordering suggestions for the product.'),
});
export type StockLevelAlertOutput = z.infer<typeof StockLevelAlertOutputSchema>;

export async function generateStockLevelAlertWithSuggestions(
  input: StockLevelAlertInput
): Promise<StockLevelAlertOutput> {
  return stockLevelAlertWithSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stockLevelAlertWithSuggestionsPrompt',
  input: {schema: StockLevelAlertInputSchema},
  output: {schema: StockLevelAlertOutputSchema},
  prompt: `You are an inventory management assistant. Generate a stock level alert message and reordering suggestions for the following product:

Product Name: {{{productName}}}
Current Stock: {{{currentStock}}}
Minimum Stock: {{{minimumStock}}}
Product Details: {{{productDetails}}}

If the current stock is below the minimum stock, generate an alert message. Also, provide reordering suggestions based on the product details, including quantity to reorder, potential suppliers, and cost considerations.
`,
});

const stockLevelAlertWithSuggestionsFlow = ai.defineFlow(
  {
    name: 'stockLevelAlertWithSuggestionsFlow',
    inputSchema: StockLevelAlertInputSchema,
    outputSchema: StockLevelAlertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
