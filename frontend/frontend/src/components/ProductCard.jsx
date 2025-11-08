import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col">
      {/* Image wrapper */}
      <div className="w-full h-56 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-2">{product.name} - <span className="text-sm">{product.storages[0]?.label}</span></h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-500">MRP</div>
            <div className="text-sm line-through text-gray-400">
              ₹{product.mrp?.toLocaleString()}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{product.storages[0]?.price}
            </div>
          </div>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
