"use client";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Multi-Step Order Form</h1>
      {step === 1 && <StepOne data={formData} onNext={handleNext} />}
      {step === 2 && <StepTwo data={formData} onNext={handleNext} />}
      {step === 3 && <StepThree data={formData} onNext={handleNext} />}
      {step === 4 && <StepFour data={formData} onNext={() => alert("Order submitted!")} />}
    </div>
  );
}
