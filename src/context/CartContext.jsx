"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function getInitialCart() {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  }
  return {};
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart());
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart[product.id];
      if (existingItem) {
        // If item exists, update its quantity
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast({
            variant: "destructive",
            title: "Estoque insuficiente",
            description: `Você não pode adicionar mais deste item. Apenas ${product.stock} disponíveis.`,
          });
          return prevCart;
        }
        toast({
          title: "Item atualizado no carrinho",
          description: `${product.name} agora tem ${newQuantity} unidade(s).`,
        });
        return { ...prevCart, [product.id]: { ...existingItem, quantity: newQuantity } };
      } else {
        // If item does not exist, add it to cart
         if (quantity > product.stock) {
          toast({
            variant: "destructive",
            title: "Estoque insuficiente",
            description: `Não é possível adicionar ${quantity} itens. Apenas ${product.stock} disponíveis.`,
          });
          return prevCart;
        }
        toast({
          title: "Item adicionado ao carrinho",
          description: `${quantity} x ${product.name}`,
        });
        return { ...prevCart, [product.id]: { ...product, quantity } };
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
       toast({
          title: "Item removido",
          description: `O item foi removido do seu carrinho.`,
        });
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      const item = prevCart[productId];
      if (!item) return prevCart;

      if (newQuantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      
      if (newQuantity > item.stock) {
         toast({
            variant: "destructive",
            title: "Estoque insuficiente",
            description: `Apenas ${item.stock} itens disponíveis.`,
          });
         return prevCart;
      }

      return { ...prevCart, [productId]: { ...item, quantity: newQuantity } };
    });
  };
  
  const clearCart = () => {
    setCart({});
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: Object.values(cart).reduce((acc, item) => acc + item.quantity, 0),
    cartTotal: Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
