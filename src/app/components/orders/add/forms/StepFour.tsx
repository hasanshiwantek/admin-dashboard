"use client";

export default function StepFour({ data, onNext }: any) {
  const handleFinalSubmit = () => {
    console.log("Final submitted data:", data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Review & Payment</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleFinalSubmit}>
        Submit Order
      </button>
    </div>
  );
}