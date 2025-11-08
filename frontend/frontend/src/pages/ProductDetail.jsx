/** @format */

// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/api";
import EmiPlanCard from "../components/EmiPlanCard";
import Modal from "../components/Modal";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  // local selected variant labels (strings)
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // selected emi plan object
  const [selectedPlan, setSelectedPlan] = useState(null);

  // central fetch function; wrapped with useCallback so we can reuse
  const loadProduct = useCallback(
    async (storageLabel = undefined, colorName = undefined) => {
      try {
        setLoading(true);
        const data = await fetchProductBySlug(slug, {
          storage: storageLabel,
          color: colorName,
        });

        // API returns product and computed fields:
        // data.selectedStorage, data.selectedColor, data.price, data.emiPlans
        setProduct(data);

        // set selected storage/color from response if present
        const storageLabelFromApi =
          data.selectedStorage?.label || storageLabel || "";
        const colorFromApi = data.selectedColor?.name || colorName || "";

        setSelectedStorage(storageLabelFromApi);
        setSelectedColor(colorFromApi);

        // pick first emi plan as default if exists
        if (Array.isArray(data.emiPlans) && data.emiPlans.length) {
          setSelectedPlan(data.emiPlans[0]);
        } else {
          setSelectedPlan(null);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setProduct(null);
        setSelectedPlan(null);
      } finally {
        setLoading(false);
      }
    },
    [slug]
  );

  // initial load
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // when user changes storage
  const handleStorageChange = (label) => {
    // optimistic UI: set local state then fetch server recomputed values
    setSelectedStorage(label);
    loadProduct(label, selectedColor);
  };

  // when user changes color
  const handleColorChange = (name) => {
    setSelectedColor(name);
    loadProduct(selectedStorage, name);
  };

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found.</div>;

  // derive display image: prefer selected storage.image -> selected color.image -> product.image
  const displayImage =
    product.selectedStorage?.image ||
    product.selectedColor?.image ||
    // fallback: if storages array contains image for the selected label, find it
    product.storages?.find((s) => s.label === selectedStorage && s.image)
      ?.image ||
    product.image;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* left: image & variants */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 rounded-xl flex items-center justify-center h-72 overflow-hidden">
          <img
            src={displayImage}
            alt={product.name}
            className="object-contain h-full w-auto"
          />
        </div>

        <div className="mt-7 p-4   bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg">{product.name}</h3>

          {/* Storage variant */}
          {product.storages?.length > 0 && (
            <>
              <div className="text-sm text-gray-500 mt-3 mb-2">Storage</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.storages.map((s) => {
                  const isSelected = s.label === selectedStorage;
                  return (
                    <button
                      key={s.label}
                      onClick={() => handleStorageChange(s.label)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition flex items-center gap-2 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="text-xs text-gray-500">
                        ₹{s.price?.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Color variant */}
          {product.colors?.length > 0 && (
            <>
              <div className="text-sm text-gray-500 mt-4 mb-2">Color</div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const isSelected = c.name === selectedColor;
                  // if hex color exists, show colored circle, else show name
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(c.name)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition flex items-center gap-2 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {c.hex ? (
                        <span
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: c.hex }}
                          aria-hidden
                        />
                      ) : null}
                      <span className="font-medium">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* right: details and emi list */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <div className="text-sm text-gray-500 mt-1">
                <span className="text-xl text-gray-900 font-semibold">
                  ₹{product.price?.toLocaleString()}
                </span>{" "}
                <span className="text-xs line-through text-gray-400 ml-3">
                  ₹{product.mrp?.toLocaleString()}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-600">
                {selectedColor ? `${selectedColor} • ` : ""}
                {selectedStorage || ""}
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">EMI from</div>
              <div className="text-xl font-bold">
                ₹
                {product.emiPlans?.[0]?.monthlyAmount?.toLocaleString() || "--"}
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h3 className="text-lg font-semibold mb-3">Choose an EMI Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.emiPlans?.map((plan) => (
              <EmiPlanCard
                key={`${plan.tenure}-${plan.monthlyAmount}`}
                plan={plan}
                selected={
                  selectedPlan?.tenure === plan.tenure &&
                  selectedPlan?.monthlyAmount === plan.monthlyAmount
                }
                onSelect={() => setSelectedPlan(plan)}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
            >
              Proceed with this plan
            </button>

            <div className="text-sm text-gray-600">
              Selected:{" "}
              {selectedPlan
                ? `${selectedPlan.tenure} months • ₹${selectedPlan.monthlyAmount}/mo • ${selectedPlan.interestRate}`
                : "None"}
            </div>
          </div>
        </div>
      </div>
      <Modal open={showCheckout} onClose={() => setShowCheckout(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Checkout Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Product:</span>
            <span className="font-medium">{product.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Color:</span>
            <span className="font-medium">{selectedColor || "Default"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Storage:</span>
            <span className="font-medium">{selectedStorage || "Default"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-blue-600">
              ₹{product.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">EMI Plan:</span>
            <span className="font-medium">
              {selectedPlan
                ? `${selectedPlan.tenure} months • ₹${selectedPlan.monthlyAmount}/mo`
                : "None"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setShowCheckout(false)}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("✅ Order placed successfully!");
              setShowCheckout(false);
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Confirm Order
          </button>
        </div>
      </Modal>
    </div>
  );
}
