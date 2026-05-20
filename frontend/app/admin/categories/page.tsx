'use client';

import  {useEffect,useState} from "react";
import { useRouter } from "next/navigation";
import api from '../../lib/api';
import { Category } from "../../types";
import { useAuthStore } from "../../store/authStore";



export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const {user,isLoading} = useAuthStore();
  const router = useRouter();

  const fetchCategories = async () => {
    try{
        const response = await api.get<Category[]>('/categories');
        setCategories(response.data);
    }
        catch{
            console.error('Failed to fetch categories');
        }
        finally{
            setLoading(false);

        }
    };

    useEffect(() => {
        if(isLoading) return;
        if(!user||user.role !== 'Admin'){
            router.push('/');
            return;}

        fetchCategories();
    }, [user,isLoading]);

    const resetForm = () => {
        setName('');
        setDescription('');
        setEditCategory(null);
        setShowForm(false);
    };

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setName(category.name);
        setDescription(category.description);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const data= {name,description};

            if(editCategory){
                await api.put(`/categories/${editCategory.id}`,data);
                setMessage('Category updated successfully');
            }else{
                await api.post('/categories',data);
                setMessage('Category created successfully');
            }

            resetForm();
            fetchCategories();
        }
        catch{
            console.error('Failed to save category');

        }
    };

    const handleDelete = async (id: number) => {
        if(!confirm('Are you sure you want to delete this category?')) return;
        try{
            await api.delete(`/categories/${id}`);
            fetchCategories();
        }
        catch{
            console.error('Failed to delete category');
        }
    };
    if(loading) return <p>Loading...</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin — Categories</h1>
            <button onClick={()=>{
                resetForm();
                setShowForm(!showForm);
                
            }}className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {showForm ? 'Cancel' : 'Add Category'}
            </button>
            </div>
            {message && (
             <div className="bg-green-100 border text-green-600 p-3 rounded mb-4">
                {message}
             </div>)}


            {showForm && (
                <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-6 shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        {editCategory ? 'Edit Category' : 'New Category'}
                    </h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                            required
                            />


                        </div>
                        <div className="flex gap-3 mt-4">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                                >{editCategory ? 'Update' : 'Create'}</button>

                                <button type="button" onClick={resetForm} className="border px-6 py-2 rounded hover:bg-gray-50"
                                >Cancel</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="flex flex-col gap-3">
                {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-gray-600 text-sm">{category.description}</p>
                            <p className="text-blue-600 text-sm ">{category.productCount}products</p>

                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => handleEdit(category)} className="text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:underline">Delete</button>

                            


                        </div>



                    </div>
                ))}
            </div>
        </div>
        
    

        


    );}




    

 

