'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import {Product} from '../types';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await api.get<Product[]>('/products');
            setProducts(response.data);
        }catch{
            console.error('Failed to fetch products');
        }finally{
            setLoading(false);
        }
    };

    fetchProducts();
  }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

   return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden p-4 shadow">
            {product.imageUrl && 
            (<div className="relative h-48 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                />
            </div>
          )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.categoryName}</p>
            <p className="text-gray-700 text-sm mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold">
                {product.price.toLocaleString()} Ft
              </span>
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}