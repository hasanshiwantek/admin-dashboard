// components/StepTracker.tsx
import React from "react";

type StepTrackerProps = {
  currentStep: number;
};

const steps = [
  { label: "Customer info", step: 1 },
  { label: "Items", step: 2 },
  { label: "Fulfillment", step: 3 },
  { label: "Payment", step: 4 },
];

const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between px-10 py-6 bg-[#F8F9FB]">
      {steps.map((item, index) => (
        <div className="flex items-center gap-2 w-full" key={item.step}>
          {/* Circle */}
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center text-2xl font-semibold border transition-all ${
              currentStep === item.step
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {item.step}
          </div>

          {/* Label */}
          <span
            className={` ${
              currentStep === item.step ? "text-black" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>

          {/* Line connector */}
          {index !== steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 ml-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepTracker;
