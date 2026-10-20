import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/ui/Table/Table";
import type { ColumnDef } from "@/components/ui/Table/types";
import { Button } from "@/components/ui/button";
import { HelpCircle, MoreHorizontal } from "lucide-react";
import { storeFrontLanguage } from "./constant";
import { StorefrontLanguage } from "./type";

const storefrontLanguages: StorefrontLanguage[] = [storeFrontLanguage];

const columns: ColumnDef<StorefrontLanguage>[] = [
  {
    key: "channel",
    header: "Channel",
    width: "25%",
    className: "px-8 py-5",
  },
  {
    key: "type",
    header: "Type",
    width: "15%",
    className: "px-5 py-5",
  },
  {
    key: "defaultLanguage",
    header: "Default language",
    width: "30%",
    className: "px-5 py-5",
  },
  {
    key: "additionalLanguages",
    header: "Additional languages",
    width: "25%",
    className: "px-5 py-5",
    render: (row) => (
      <span className="inline-flex items-center gap-2">
        {row.additionalLanguages}
        <HelpCircle size={17} className="text-slate-400" />
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    width: "15%",
    className: "px-5 py-5",
    render: () => (
      <div className="flex justify-center text-blue-600">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Storefront language options"
          title="Storefront language options"
          className="size-8 rounded-md p-1 text-blue-600 shadow-none hover:bg-blue-50 hover:text-blue-600"
        >
          <MoreHorizontal size={24} />
        </Button>
      </div>
    ),
  },
];

const StorefrontLanguagesSection = () => {
  return (
    <div className="overflow-hidden rounded-md border border-[#E1E4ED] bg-white shadow-sm">
      <PageTitle
        title="Storefront Languages"
        hideActionButton
        titleClassName="px-8 py-7 text-[24px]! font-normal text-gray-800"
        containerClassName="mb-0"
        textContainerClassName="mb-0"
      />

      <div className="text-[16px]! text-slite-500">
        <Table<StorefrontLanguage>
          bare
          data={storefrontLanguages}
          columns={columns}
          getRowId={(row) => row.id}
          hideRecordCount
          emptyMessage="No storefront languages found."
        />
      </div>
    </div>
  );
};

export default StorefrontLanguagesSection;
