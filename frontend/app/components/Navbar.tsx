'use client';

import Link from 'next/link';
import {useAuthStore} from '../store/authStore';
import {useRouter} from 'next/navigation';

export default function Navbar() {
    const {user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600">
        ShopApp
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/products" className="text-gray-600 hover:text-blue-600">
          Products
        </Link>

        {user ? (
          <>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600">
              Cart 🛒
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-blue-600">
              Orders
            </Link>
            {user.role === 'Admin' && (
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            )}
                        <span className="text-gray-600">Hi, {user.firstName}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}