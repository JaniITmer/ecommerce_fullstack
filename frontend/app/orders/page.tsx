'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '../lib/api';
import {Order} from '../types';
import {useAuthStore} from '../store/authStore';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const {user} = useAuthStore();
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const response = await api.get<Order[]>('/orders');
            setOrders(response.data);
        }catch{
            console.error('Failed to fetch orders');
        }finally{
            setLoading(false);
        }
    
        };

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
       return;
        }
        fetchOrders();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }
return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No orders yet!</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">Order #{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                  ${order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : ''}
                  ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' : ''}
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : ''}
                `}>
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-3">
                {new Date(order.orderDate).toLocaleDateString('hu-HU')}
              </p>

              <div className="flex flex-col gap-2 mb-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.productName} x {item.quantity}</span>
                    <span>{item.totalPrice.toLocaleString()} Ft</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>{order.totalAmount.toLocaleString()} Ft</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}