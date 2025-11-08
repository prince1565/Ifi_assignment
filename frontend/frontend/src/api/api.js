// src/api/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

/**
 * Fetch product by slug, optional storage and color
 * storage: string label, e.g. "256 GB"
 * color: string name, e.g. "Silver"
 */
export const fetchProductBySlug = async (slug, { storage, color } = {}) => {
  const params = {};
  if (storage) params.storage = storage;
  if (color) params.color = color;

  const res = await axios.get(`${API_BASE}/products/${encodeURIComponent(slug)}`, { params });
  return res.data;
};
