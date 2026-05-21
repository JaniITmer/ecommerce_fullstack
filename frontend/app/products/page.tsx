'use client';

import { useEffect, useState } from 'react';
import {useRouter,useSearchParams} from 'next/navigation';

import api from '../lib/api';
import {Product,Category} from '../types';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryName = searchParams.get('category');

  useEffect(() => {
    const fetchData= async () => {
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                api.get('/products'),
                api.get('/categories')
            ]);
            setProducts(productsResponse.data);
            setCategories(categoriesResponse.data);
            
        }catch{
            console.error('Failed to fetch products');
        }finally{
            setLoading(false);
        }
    };

    fetchData();
  }, []);

    const filteredProducts = selectedCategoryName
    ? products.filter((product) => product.categoryName=== selectedCategoryName)
    : products;

    const handleCategoryClick = (categoryName: string | null) => {
        if (categoryName === null) {
            router.push('/products');
        } else {
            router.push(`/products?category=${categoryName}`);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

   return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedCategoryName === null
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-600 hover:border-blue-600 hover:text-blue-600'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedCategoryName === cat.name
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-600 hover:border-blue-600 hover:text-blue-600'
            }`}
          >
            {cat.name} ({cat.productCount})
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No products found in this category!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow">
              {product.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}