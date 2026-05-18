'use client';

import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bg-gray-600 text-white rounded-lg p-4 mb-6 flex gap-4">
        <span className="font-bold text-gray-300 mr-4">Admin Panel</span>
        <Link
          href="/admin"
          className="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
        >
          Orders
        </Link>
        <Link
          href="/admin/products"
          className="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
        >
          Products
        </Link>
      </div>
      {children}
    </div>
  );
}