// backend/models/EmiPlan.js
import mongoose from "mongoose";

const emiPlanSchema = new mongoose.Schema({
  productSlug: { type: String, required: true },
  tenure: { type: Number, required: true },          // months
  interestRate: { type: String, required: true },    // e.g. "0%", "10.5%"
  cashback: { type: String, default: null },
  // optional: a plan label or provider
  label: { type: String },
}, { timestamps: true });

const EmiPlan = mongoose.model("EmiPlan", emiPlanSchema);
export default EmiPlan;
