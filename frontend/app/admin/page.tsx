'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '../lib/api';
import {Order} from '../types';
import {useAuthStore} from '../store/authStore';



export  default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuthStore();
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const response = await api.get<Order[]>('/orders/all');
            setOrders(response.data);
        }catch{
            console.error('Failed to fetch orders');
        }finally{
            setLoading(false);
        }
    
        };

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            router.push('/');
       return;
        }
        fetchOrders();
    }, [user]);

    const handleStatusUpdate = async (orderId: number, status: string) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status});
            fetchOrders();
        }catch{
            console.error('Failed to update order status');
        }
    };
    if (loading) 
        return <div>Loading...</div>;

    return (
    <div>
     <h1 className="text-2xl font-bold mb-6">Admin Panel — All Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold">Order #{order.id}</span>
              <div className="flex items-center gap-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
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
    </div>
  );
}
