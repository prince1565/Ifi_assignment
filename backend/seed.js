// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import EmiPlan from "./models/EmiPlan.js";
import connectDB from "./config/db.js";

dotenv.config();

const run = async () => {
  await connectDB();

  // 1. Clear old data
  await Product.deleteMany();
  await EmiPlan.deleteMany();

  // 2. Insert sample products with storages & colors
  const products = await Product.insertMany([
    {
      name: "Apple iPhone 17 Pro",
      slug: "iphone-17-pro",
      mrp: 159999,
      basePrice: 149999,
      image:
        "https://images.hindustantimes.com/tech/htmobile4/p999938703/heroimage/iphone-17-pro-model-unselect-gallery-2-202509-GEO-EMEA.jpg",
      storages: [
        { label: "128 GB", price: 139999, sku: "IP17P-128", image: "" },
        { label: "256 GB", price: 149999, sku: "IP17P-256", image: "" },
        { label: "512 GB", price: 169999, sku: "IP17P-512", image: "" },
      ],
      colors: [
        { name: "Silver", image: "" },
        { name: "Black", image: "" },
        { name: "Gold", image: "" },
      ],
      description: "Flagship device with pro camera and pro performance.",
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-s24-ultra",
      mrp: 139999,
      basePrice: 129999,
      image:
        "https://www.samsungmobilepress.com/file/FC05AE750AD6EB0673D9E9D4C157D4FDCA91C0319D37B2827A4ACC850D3D124959298BB89A1D18EEB9531CE7B6BDB56BB43890C99A07EF46FFD865333FEC385C3A4ECDA52E32E217D32C2807BAAF403A9124FE24BD2AD9F141EA995A91D14E9095EC253173B6A26FE1DB745A586CC1ADDE7D6D440FA45C94CA365A5CF1A540E7",
      storages: [
        { label: "256 GB", price: 129999, sku: "SGS24-256" },
        { label: "512 GB", price: 139999, sku: "SGS24-512" },
      ],
      colors: [
        { name: "Titanium Gray" },
        { name: "Black" },
        { name: "Violet" },
      ],
    },
    {
      name: "OnePlus 13",
      slug: "oneplus-13",
      mrp: 74999,
      basePrice: 69999,
      image:
        "https://m.media-amazon.com/images/I/71N4hshhfNL._AC_UF1000,1000_QL80_.jpg",
      storages: [
        { label: "128 GB", price: 64999, sku: "OP13-128" },
        { label: "256 GB", price: 69999, sku: "OP13-256" },
      ],
      colors: [
        { name: "Eternal Green" },
        { name: "Silky Black" },
      ],
    },
  ]);

  // 3. Insert EMI Plans (no monthlyAmount stored)
  const emiPlans = await EmiPlan.insertMany([
    // iphone plans
    { productSlug: "iphone-17-pro", tenure: 6, interestRate: "0%", cashback: "₹500", label: "6 months 0%" },
    { productSlug: "iphone-17-pro", tenure: 12, interestRate: "0%", cashback: "₹1500", label: "12 months 0%" },
    { productSlug: "iphone-17-pro", tenure: 24, interestRate: "10.5%", cashback: null, label: "24 months 10.5%" },

    // samsung
    { productSlug: "samsung-s24-ultra", tenure: 6, interestRate: "0%", cashback: "₹1000", label: "6 months 0%" },
    { productSlug: "samsung-s24-ultra", tenure: 12, interestRate: "0%", cashback: "₹2000", label: "12 months 0%" },

    // oneplus
    { productSlug: "oneplus-13", tenure: 6, interestRate: "5%", cashback: null, label: "6 months 5%" },
    { productSlug: "oneplus-13", tenure: 12, interestRate: "5%", cashback: null, label: "12 months 5%" },
  ]);

  console.log("✅ Sample data inserted successfully!");
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
