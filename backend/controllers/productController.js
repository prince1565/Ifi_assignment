// backend/controllers/productController.js
import Product from "../models/Product.js";
import EmiPlan from "../models/EmiPlan.js";

/**
 * Helper to compute monthly EMI.
 * P = principal (price)
 * annualInterestStr = "10.5%" or "0%"
 * n = months (tenure)
 */
function computeMonthlyEmi(P, annualInterestStr, n) {
  const stripped = (annualInterestStr || "0%").replace("%", "").trim();
  const annualRate = parseFloat(stripped) || 0;
  if (annualRate === 0) {
    // no interest
    return Math.round(P / n);
  }
  const monthlyRate = annualRate / 100 / 12; // decimal
  const r = monthlyRate;
  const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}, { storages: 1, colors: 1, name: 1, slug: 1, image: 1, basePrice: 1, mrp: 1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /api/products/:slug?storage=256%20GB&color=Silver
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { storage: storageLabel, color: colorName } = req.query;

    const product = await Product.findOne({ slug }).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Determine selected storage price (if provided), otherwise use basePrice or first storage
    let selectedStorage = null;
    let selectedColor = null;
    let price = product.basePrice || product.mrp || 0;

    if (Array.isArray(product.storages) && product.storages.length) {
      if (storageLabel) {
        selectedStorage = product.storages.find((s) => s.label.toLowerCase() === storageLabel.toLowerCase());
      }
      // if not provided or not found, pick first storage as default
      if (!selectedStorage) selectedStorage = product.storages[0];
      if (selectedStorage && selectedStorage.price) price = selectedStorage.price;
    }

    if (Array.isArray(product.colors) && product.colors.length) {
      if (colorName) {
        selectedColor = product.colors.find((c) => c.name.toLowerCase() === colorName.toLowerCase());
      }
      if (!selectedColor) selectedColor = product.colors[0];
    }

    // Fetch EMI plan templates for this product
    const emiTemplates = await EmiPlan.find({ productSlug: slug }).lean();

    // Compute monthlyAmount for each plan based on selected price
    const emiPlans = emiTemplates.map((tpl) => {
      const monthlyAmount = computeMonthlyEmi(price, tpl.interestRate, tpl.tenure);
      return {
        ...tpl,
        monthlyAmount,
      };
    });

    // Respond with product + computed fields
    return res.json({
      ...product,
      selectedStorage,
      selectedColor,
      price,
      emiPlans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
