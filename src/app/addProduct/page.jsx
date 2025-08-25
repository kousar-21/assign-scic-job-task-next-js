"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useImageUpload from "../Hooks/ImageUploadHook/useImageUpload";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const { picture, handleImageUpload, error } = useImageUpload();
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter()
  const userEmail = session?.user?.email || "";
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  // console.log("userEmail data", userEmail)
  console.log("product picture", picture)

  const onSubmit = async (data) => {
    if (!picture) {
      alert("Please wait until image upload is complete!");
      return;
    }
    setLoading(true);

    const productData = {
      ...data,
      productImage: picture, // use uploaded image URL
      created_by: userEmail,
      date: currentDate,
    };

    try {
      const res = await axios.post("/api/products", productData);
      console.log("Saved to DB:", res.data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Product added successfully.", "success");
        setSubmittedData(productData);
        // reset();
        setLoading(false);
      } else {
        Swal.fire("Error", "Failed to add product.", "error");
      }

    } catch (err) {
      // console.error("Failed to save product:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="py-12 flex items-center justify-center bg-gray-50 px-4">
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

          {/* Product Image Upload */}
          <div>
            <label className="block font-medium">Upload Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {error && <p className="text-red-500 text-sm">Image upload failed</p>}
            {/* {picture && (
              <img src={picture} alt="preview" className="mt-2 w-24 h-24 object-cover rounded" />
            )} */}
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
              {...register("productValue", { required: true, min: 1, valueAsNumber: true })}
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
          {/* Read-only Field for User */}
          <div>
            <label className="block font-medium">User Email</label>
            <input
              type="text"
              value={userEmail}
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
              disabled={!picture} //prevent submit if image not ready
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Add Product{/* {loading ? "Saving..." : "Add Product"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
