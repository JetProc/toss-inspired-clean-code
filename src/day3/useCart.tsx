import {useEffect, useState} from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setCartItems(data.items);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCardsData();
  }, []);

  return {
    cartItems,
    isLoading,
    isError,
  };
};
