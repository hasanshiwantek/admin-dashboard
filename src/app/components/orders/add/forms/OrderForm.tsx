"use client";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepTracker from "./StepTracker";
export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div>
      <StepTracker currentStep={step} />
      {step === 1 && (
        <StepOne
          data={formData}
          onNext={handleNext}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <StepTwo
          data={formData}
          onNext={handleNext}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <StepThree
          data={formData}
          onNext={handleNext}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 4 && (
        <StepFour
          data={formData}
          onNext={handleNext}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
}
