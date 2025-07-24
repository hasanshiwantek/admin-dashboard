export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      <span className="ml-4 text-blue-600 text-lg font-medium"></span>
    </div>
  );
}
