
// In a real application, this data would come from a database.
// We're using in-memory arrays for demonstration purposes.

const products = [
  {
    id: 1,
    name: 'Shampoo Hidratante Profundo',
    brand: 'HairGlow',
    description: 'Shampoo com óleo de argan e queratina, ideal para cabelos secos e danificados. Proporciona hidratação intensa e brilho.',
    price: 45.50,
    stock: 50,
    minStock: 10,
    image: 'https://placehold.co/600x600',
    attributes: 'óleo de argan, queratina, sem sal, sem parabenos',
    productDetails: 'Fornecedor: Cabelos & Cia, Custo: R$22.00',
  },
  {
    id: 2,
    name: 'Condicionador Cachos Definidos',
    brand: 'CurlPower',
    description: 'Condicionador para cabelos cacheados, enriquecido com manteiga de karité. Define os cachos e controla o frizz.',
    price: 48.00,
    stock: 8,
    minStock: 15,
    image: 'https://placehold.co/600x600',
    attributes: 'manteiga de karité, óleo de coco, liberado para low poo',
    productDetails: 'Fornecedor: DistriBeleza, Custo: R$25.00',
  },
  {
    id: 3,
    name: 'Máscara de Reconstrução Capilar',
    brand: 'HairGlow',
    description: 'Máscara potente para reconstrução de fios elásticos e quebradiços. Devolve a massa capilar.',
    price: 75.90,
    stock: 30,
    minStock: 5,
    image: 'https://placehold.co/600x600',
    attributes: 'colágeno, aminoácidos, proteína do trigo',
    productDetails: 'Fornecedor: Cabelos & Cia, Custo: R$40.00',
  },
  {
    id: 4,
    name: 'Óleo Reparador de Pontas',
    brand: 'ShineOn',
    description: 'Sérum reparador de pontas duplas com silicone e vitamina E. Proteção térmica e brilho instantâneo.',
    price: 35.00,
    stock: 80,
    minStock: 20,
    image: 'https://placehold.co/600x600',
    attributes: 'vitamina E, proteção térmica, anti-frizz',
    productDetails: 'Fornecedor: DistriBeleza, Custo: R$18.00',
  },
  {
    id: 5,
    name: 'Leave-in Protetor Térmico',
    brand: 'CurlPower',
    description: 'Creme para pentear sem enxágue com proteção solar e térmica. Facilita o desembaraço e protege os fios.',
    price: 42.00,
    stock: 45,
    minStock: 10,
    image: 'https://placehold.co/600x600',
    attributes: 'proteção UV, proteção térmica, vegano',
    productDetails: 'Fornecedor: Cabelos & Cia, Custo: R$21.00',
  },
];

const sales = [
  {
    id: 1,
    productId: 1,
    productName: 'Shampoo Hidratante Profundo',
    quantity: 2,
    totalValue: 91.00,
    date: new Date('2024-07-22T10:30:00'),
  },
  {
    id: 2,
    productId: 4,
    productName: 'Óleo Reparador de Pontas',
    quantity: 1,
    totalValue: 35.00,
    date: new Date('2024-07-22T11:00:00'),
  },
  {
    id: 3,
    productId: 2,
    productName: 'Condicionador Cachos Definidos',
    quantity: 1,
    totalValue: 48.00,
    date: new Date('2024-07-23T14:15:00'),
  },
];

// Functions to interact with the data
// In a real app, these would be API calls
export const getProducts = async () => {
  return products;
}

export const getProductById = async (id) => {
  return products.find(p => p.id === parseInt(id));
}

export const getSales = async () => {
  return sales.sort((a, b) => b.date - a.date);
}

// These functions mutate the in-memory data.
// In a real app, you would send a request to your backend API.
export const addProduct = async (productData) => {
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    ...productData,
    image: 'https://placehold.co/600x600'
  };
  products.push(newProduct);
  return newProduct;
}

export const recordSale = async (saleData) => {
  const product = products.find(p => p.id === parseInt(saleData.productId));
  if (!product) {
    throw new Error('Produto não encontrado.');
  }
  if (product.stock < saleData.quantity) {
    throw new Error('Estoque insuficiente.');
  }

  product.stock -= parseInt(saleData.quantity);

  const newSale = {
    id: sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 1,
    productId: product.id,
    productName: product.name,
    quantity: parseInt(saleData.quantity),
    totalValue: product.price * parseInt(saleData.quantity),
    date: new Date(),
  };

  sales.unshift(newSale); // Add to the beginning to show up first
  return newSale;
}
