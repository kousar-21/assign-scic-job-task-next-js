import clientPromise from "@/library/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailsPage({ params }) {
    const client = await clientPromise;
    const db = client.db("phones_store");

    let product = null;
    try {
        product = await db
            .collection("products")
            .findOne({ _id: new ObjectId(params.id) });
    } catch (e) {
        // Invalid ObjectId → 404
        notFound();
    }

    if (!product) notFound();

    return (
        <div className="px-5 md:px-10 lg:px-20 py-8">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/product" className="hover:underline">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{product.productName}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-full h-64 sm:h-80 md:h-[40rem] object-cover"
                    />
                </div>

                {/* Details */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${product.marketStatus === "In Stock"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {product.marketStatus}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                            {product.brandName}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {product.productName}
                    </h1>

                    <p className="text-gray-600 mt-3 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-6">
                        <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                            ${product.productValue}
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <Spec label="Main Camera" value={`${product.mainCamera} MP`} />
                        <Spec label="Front Camera" value={`${product.frontCamera} MP`} />
                        <Spec label="RAM" value={`${product.storageRam} GB`} />
                        <Spec label="ROM" value={`${product.storageRom} GB`} />
                        <Spec label="Battery" value={`${product.battery} mAh`} />
                        <Spec label="Brand" value={product.brandName} />
                    </div>

                    {/* Meta */}
                    <div className="mt-6 text-sm text-gray-500">
                        <div>Created by: <span className="font-medium text-gray-700">{product.created_by}</span></div>
                        <div>Date: <span className="font-medium text-gray-700">{product.date}</span></div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Buy Now
                        </button>
                        <Link
                            href="/product"
                            className="flex-1 text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
                        >
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Spec({ label, value }) {
    return (
        <div className="rounded-xl border border-gray-100 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
            <div className="mt-1 font-semibold text-gray-900">{value}</div>
        </div>
    );
}
