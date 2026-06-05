'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '../../lib/api';
import {Product,Category} from '../../types';
import {useAuthStore} from '../../store/authStore';
import CloudinaryUpload from '../../components/CloudinaryUpload';



export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [message, setMessage] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const {user,isLoading} = useAuthStore();
    const router = useRouter();


    const fetchData = async () => {
        try {
            const [productRes, categoryRes] = await Promise.all([
                api.get<Product[]>('/products'),
                api.get<Category[]>('/categories'),
            ]);
            setProducts(productRes.data);
            setCategories(categoryRes.data);
        }
        catch{
            console.error('Failed to fetch data');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) return;
        if (!user || user.role !== 'Admin') {
            router.push('/');
         return;
        }
        fetchData();
    }, [user,isLoading]);

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImageUrl('');
        setCategoryId('');
        setEditProduct(null);
        setShowForm(false);
    };

    const handleEdit = (product: Product) => {
        setEditProduct(product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price.toString());
        setStock(product.stock?.toString() ?? '');        
        setCategoryId(product.categoryId?.toString() ?? ''); 
        setImageUrl(product.imageUrl);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data={
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                imageUrl,
                categoryId: parseInt(categoryId),
            };
            if (editProduct) {
                await api.put(`/products/${editProduct.id}`, data);
                setMessage('Product updated successfully');
            }
            else {
                await api.post('/products', data);
                setMessage('Product created successfully');
            }
            resetForm();
            fetchData();
        }
        catch{
            console.error('Failed to save product');
        }
            };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchData();
        }
        catch{
            console.error('Failed to delete product');
        }
    };

    if (loading) return <div>Loading...</div>;

return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin — Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {message && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editProduct ? 'Edit Product' : 'New Product'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (Ft)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="flex gap-3 items-center">
                <CloudinaryUpload onUpload={(url) => setImageUrl(url)} />
                {imageUrl && (
              <img
                src={imageUrl}
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
            )}
            </div>
            {imageUrl && (
                <p className="text-sm text-gray-500 mt-1 truncate">{imageUrl}</p>
            )}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editProduct ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border px-6 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.categoryName}</p>
              <p className="text-blue-600 font-medium">
                {product.price.toLocaleString()} Ft
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}