// backend/models/Product.js
import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({
  label: { type: String, required: true },     // e.g. "128 GB", "256 GB"
  price: { type: Number, required: true },     // absolute price for this storage
  sku: { type: String },
  image: { type: String },                     // optional image for this storage variant
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },     // e.g. "Silver"
  hex: { type: String },                      // optional color code if you want to show circle
  image: { type: String },                    // optional image URL for this color
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  mrp: { type: Number },                       // optional global mrp
  basePrice: { type: Number, required: true },// fallback base price
  image: { type: String },                     // default image
  storages: [storageSchema],                   // storage variants (each with own price)
  colors: [colorSchema],                       // color variants
  description: { type: String },
  // any other fields...
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
