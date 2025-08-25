"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")   // fetch all products
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 4)); // only take first 4 products
      });
  }, []);

  return (
    <section className="py-12 px-5 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Product Highlights
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="rounded-lg h-48 w-full object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">{product.productName}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {product.description}
            </p>
            <p className="text-lg font-bold text-blue-600 mt-2">
              ${product.productValue}
            </p>

            <button
              onClick={() => router.push(`/product/${product._id}`)}
              className="mt-auto bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
