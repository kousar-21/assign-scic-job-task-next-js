"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddProductPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  // Replace with actual user later (e.g., from Auth context)
  const userName = "John Doe";
  const currentDate = new Date().toLocaleDateString();

  const onSubmit = (data) => {
    const productData = {
      ...data,
      userName,
      date: currentDate,
    };

    console.log("Product Submitted:", productData);
    setSubmittedData(productData);
    reset(); // clear form after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              {...register("productName", { required: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter product name"
            />
            {errors.productName && <p className="text-red-500 text-sm">Product name is required</p>}
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-medium">Product Image URL</label>
            <input
              type="text"
              {...register("productImage", { required: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter image URL"
            />
            {errors.productImage && <p className="text-red-500 text-sm">Image URL is required</p>}
          </div>

          {/* Market Status */}
          <div>
            <label className="block font-medium">Market Status</label>
            <select
              {...register("marketStatus", { required: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Select status</option>
              <option value="In Stock">In Stock</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.marketStatus && <p className="text-red-500 text-sm">Select status</p>}
          </div>

          {/* Brand Name */}
          <div>
            <label className="block font-medium">Brand Name</label>
            <input
              type="text"
              {...register("brandName", { required: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter brand name"
            />
            {errors.brandName && <p className="text-red-500 text-sm">Brand name is required</p>}
          </div>

          {/* Product Value */}
          <div>
            <label className="block font-medium">Product Value ($)</label>
            <input
              type="number"
              {...register("productValue", { required: true, min: 1 ,valueAsNumber: true})}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter value"
            />
            {errors.productValue && <p className="text-red-500 text-sm">Enter valid value</p>}
          </div>

          {/* Main Camera */}
          <div>
            <label className="block font-medium">Main Camera (MP)</label>
            <input
              type="number"
              {...register("mainCamera", { required: true, min: 1, valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="e.g. 108"
            />
            {errors.mainCamera && <p className="text-red-500 text-sm">Enter camera details</p>}
          </div>

          {/* Front Camera */}
          <div>
            <label className="block font-medium">Front Camera (MP)</label>
            <input
              type="number"
              {...register("frontCamera", { required: true, min: 1, valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="e.g. 32"
            />
            {errors.frontCamera && <p className="text-red-500 text-sm">Enter camera details</p>}
          </div>

          {/* Storage RAM */}
          <div>
            <label className="block font-medium">Storage RAM (GB)</label>
            <input
              type="number"
              {...register("storageRam", { required: true, min: 1, valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="e.g. 8"
            />
            {errors.storageRam && <p className="text-red-500 text-sm">Enter RAM size</p>}
          </div>

          {/* Storage ROM */}
          <div>
            <label className="block font-medium">Storage ROM (GB)</label>
            <input
              type="number"
              {...register("storageRom", { required: true, min: 1, valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="e.g. 128"
            />
            {errors.storageRom && <p className="text-red-500 text-sm">Enter ROM size</p>}
          </div>

          {/* Battery */}
          <div>
            <label className="block font-medium">Battery (mAh)</label>
            <input
              type="number"
              {...register("battery", { required: true, min: 100, valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="e.g. 5000"
            />
            {errors.battery && <p className="text-red-500 text-sm">Enter battery capacity</p>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter product description"
              rows="3"
            />
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
          </div>

          {/* Read-only Fields */}
          <div>
            <label className="block font-medium">User Name</label>
            <input
              type="text"
              value={userName}
              readOnly
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="text"
              value={currentDate}
              readOnly
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
