"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() =>
        Swal.fire("Error", "Failed to load products", "error")
      );
  }, []);

  return (
    <div className="py-8 px-5 md:px-10 lg:px-20">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-center">
        All Products
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 sm:h-48 md:h-56 object-cover"
            />

            <div className="p-4 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                {product.productName}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description || "No description available"}
              </p>
              <p className="text-lg sm:text-xl font-bold text-blue-600 mt-3">
                ${product.productValue}
              </p>

              <Link
                href={`/product/${product._id}`}
              ><button
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
              >

                  Details

                </button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
