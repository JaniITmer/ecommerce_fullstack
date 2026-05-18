import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      
      <div className="bg-blue-600 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopApp</h1>
        <p className="text-xl mb-8 text-blue-100">
          Discover amazing products at great prices
        </p>
        <Link
          href="/products"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
        >
          Shop Now
        </Link>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border rounded-xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Get your products delivered quickly and safely
          </p>
        </div>
        <div className="border rounded-xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
          <p className="text-gray-600 text-sm">
            Your payment information is always protected
          </p>
        </div>
        <div className="border rounded-xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
          <p className="text-gray-600 text-sm">
            We only sell the best quality products
          </p>
        </div>
      </div>

      
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start shopping?</h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>
          <Link
            href="/auth/register"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}