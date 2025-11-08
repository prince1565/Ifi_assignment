import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // using lucide-react icons (if not installed, use emoji or another icon)

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current route is product detail (e.g. /products/iphone-17-pro)
  const isProductDetail = /^\/products\/[^/]+$/.test(location.pathname);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 🔙 Back Button (only on product detail page) */}
          {isProductDetail && (
            <button
              onClick={() => navigate("/products")}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Back to products"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Logo / Title */}
          <Link to="/products" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-accent to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              AB
            </div>
            <div>
              <h1 className="text-lg font-semibold">Apna Bazzar</h1>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
