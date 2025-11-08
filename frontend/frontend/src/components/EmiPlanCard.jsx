import React from "react";

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(plan)}
      className={`cursor-pointer border rounded-lg p-4 flex flex-col justify-between ${
        selected ? "border-accent bg-gradient-to-r from-white to-cyan-50 shadow" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Monthly</div>
          <div className="text-xl font-semibold">₹{plan.monthlyAmount?.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Tenure</div>
          <div className="text-lg font-medium">{plan.tenure} months</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <div>Interest: {plan.interestRate}</div>
        <div>{plan.cashback ? `Cashback: ${plan.cashback}` : "No Cashback"}</div>
      </div>
    </div>
  );
}
