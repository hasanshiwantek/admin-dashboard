"use client";

import { MoreHorizontal, HelpCircle } from "lucide-react";

const StorefrontLanguagesSection = () => {
 

  return (
    <div className="overflow-hidden rounded-md border border-[#E1E4ED] bg-white shadow-sm">
      <h2 className="px-8 py-7 text-[24px]! font-normal text-gray-800">
        Storefront Languages
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-y border-[#D8DDED] text-[16px]! text-gray-800">
              <th className="px-8 py-4 font-medium">Channel</th>
              <th className="px-5 py-4 font-medium">Type</th>
              <th className="px-5 py-4 font-medium">Default language</th>
              <th className="px-5 py-4 font-medium">
                Additional languages
              </th>
              <th className="px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            <tr className="text-[#172033] text-[16px]!">
              <td className="px-8 py-5">New Ecom Store</td>
              <td className="px-5 py-5">Stencil</td>
              <td className="px-5 py-5">English (en)</td>

              <td className="px-5 py-5">
                <span className="inline-flex items-center gap-2">
                  NA
                  <HelpCircle size={17} className="text-slate-400" />
                </span>
              </td>

              <td className="px-5 py-5 text-blue-600">
                <div className="relative flex justify-center">
                  <button
                    type="button"
                    aria-label="Storefront language options"
                    title="Storefront language options"
                   
                    className="rounded-md p-1 transition-colors hover:bg-blue-50"
                  >
                    <MoreHorizontal size={24} />
                  </button>

                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StorefrontLanguagesSection;