'use client';

import { useEffect, useState } from 'react';
import {useParams,useRouter} from 'next/navigation';
import api from '../../lib/api';
import {Product} from '../../types';
import {useAuthStore} from '../../store/authStore';
import Image from 'next/image';


export default function ProductDetailPage() {
    const   [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding,setAdding] = useState(false);
    const [message,setMessage] = useState('');


    const {id} = useParams();
    const router = useRouter();
    const {user} = useAuthStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get<Product>(`/products/${id}`);
                setProduct(response.data);
            }catch{
                console.error('Failed to fetch product');
            }finally{
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if(!user){
            router.push('/auth/login');
            return;
        }
        setAdding(true);
        try{
            await api.post('/cart', {
                productId: product?.id,
                quantity,
            });
            setMessage('Added to cart successfully!');
        }catch{
            setMessage('Failed to add to cart');
        }finally{
            setAdding(false);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="border rounded-lg overflow-hidden shadow">
  {product.imageUrl && (
    <div className="relative h-64 w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
    </div>
  )}
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
    <p className="text-gray-500 mb-4">{product.categoryName}</p>
    <p className="text-gray-700 mb-6">{product.description}</p>

    <div className="flex items-center justify-between mb-6">
      <span className="text-2xl font-bold text-blue-600">
        {product.price.toLocaleString()} Ft
      </span>
      <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </span>
    </div>

    {message && (
      <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
        {message}
      </div>
    )}

    {product.inStock && (
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded px-3 py-2 w-20"
        />
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    )}
  </div>
</div>
 </div>  
  );
}