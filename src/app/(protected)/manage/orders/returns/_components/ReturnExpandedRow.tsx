import Image from "next/image";

export const renderExpandedRow = (ret: any) => (
  <div className="flex justify-between gap-10 p-6">
    {/* Left - Return Details */}
    <div className="flex-1 space-y-4">
      <h2 className="text-[24px] font-semibold text-[var(--color-text-secondary)]">
        Return Details
      </h2>

      <div className="flex items-center gap-2 w-3/4">
        <label className="text-[12px] w-1/3">Return Reason</label>
        <input
          disabled
          value={ret.reason || "N/A"}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-[var(--color-background-subtle)] h-16"
        />
      </div>

      <div className="flex items-center gap-2 w-3/4">
        <label className="text-[12px] w-1/3">Return Action</label>
        <input
          disabled
          value={ret.returnAction || "N/A"}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-[var(--color-background-subtle)] h-16"
        />
      </div>

      <div className="flex items-start gap-16 w-3/4">
        <label className="text-[12px] w-1/4 pt-2">Customer Comments</label>
        <textarea
          disabled
          rows={6}
          value={ret.comments || "No comments provided"}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-[12px] bg-[var(--color-background-subtle)] resize-none"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">Returned Products</h3>
        <div className="space-y-2">
          {ret.product?.map((product: any) => (
            <div
              key={product.id}
              className="flex items-start gap-3 p-3 border border-gray-200 rounded"
            >
              {product?.image?.[0]?.path && (
                <Image
                  src={product.image[0].path}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
              )}
              <div>
                <p className="font-medium">{product.name?.slice(0, 60)}...</p>
                <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right - Staff Note */}
    <div className="flex-1">
      <h2 className="text-[24px] font-semibold mb-6">Staff Note</h2>
      <textarea
        disabled
        rows={8}
        placeholder="Add staff notes here..."
        className="w-[80%] border border-gray-300 rounded px-3 py-2 text-[12px] resize-none"
      />
    </div>
  </div>
);
