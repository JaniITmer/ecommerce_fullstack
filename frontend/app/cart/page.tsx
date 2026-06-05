'use client';

import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import api from '../lib/api';
import {Cart} from '../types';
import {useAuthStore} from '../store/authStore';

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [ordering, setOrdering] = useState(false);
    const [message, setMessage] = useState('');

    const {user} = useAuthStore();
    const router = useRouter();

    const fetchCart = async () => {
        try {
        const response = await api.get<Cart>('/cart');
        setCart(response.data);
        } catch {
        console.error('Failed to fetch cart');
        } finally {
        setLoading(false);
        }
  };

    useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    fetchCart();
  }, [user]);

  

    const handleRemove = async (cartItemId: number) => {
        try {
        await api.delete(`/cart/${cartItemId}`);
        fetchCart();
        } catch {
        console.error('Failed to remove item');
        }
  };

    const handleOrder = async () => {
        setOrdering(true);
        try {
        await api.post('/orders');
        setMessage('Order placed successfully!');
        fetchCart();
        setTimeout(() => router.push('/orders'), 2000);
        } catch {
        setMessage('Failed to place order!');
        } finally {
        setOrdering(false);
        }
  };
    
    if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {message && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
          {message}
        </div>
      )}

      {!cart || cart.items.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>Your cart is empty!</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.productPrice.toLocaleString()} Ft x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-blue-600">
                    {item.totalPrice.toLocaleString()} Ft
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span>{cart.totalAmount.toLocaleString()} Ft</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={ordering}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {ordering ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}


   
