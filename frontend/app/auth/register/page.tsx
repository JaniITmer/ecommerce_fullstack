'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import {AuthResponse} from "../../types";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useForm} from 'react-hook-form';


const  schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 6 characters'),
});
type RegisterForm= z.infer<typeof schema>;


export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      setUser(response.data);
      router.push('/products');
    } catch {
      alert('Registration failed. Email may already be in use.');
    }
  };

    return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            {...register('firstName')}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            {...register('lastName')}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}