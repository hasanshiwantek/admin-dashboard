import Link from "next/link";
import { convertOptionsToObject } from "@/lib/utils";
import { LIST_PATH, PageTypeOptions } from "./[id]/constants";
import EnableDisable from "@/components/common/EnableDisable";
import ActionButton from "@/components/ActionButton/ActionButton";
import { WEBPAGE_ROW_ACTION } from "./constant";
export const getWebPageColumns = (
  onToggleVisibility: (page: any) => void,
  onAction: (page: any) => (actionType: string) => void,
) => [
  {
    key: "pageName",
    header: "Page Name",
    width: "30%",
    headClassName: "2xl:!text-[1.6rem]",
    render: (page: any) => (
      <Link
        href={`${LIST_PATH}/${page.id}`}
        className="text-blue-600 hover:underline 2xl:text-2xl"
      >
        {page.pageName}
      </Link>
    ),
  },
  {
    key: "pageType",
    header: "Page Type",
    width: "40%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl whitespace-normal",
    render: (page: any) =>
      convertOptionsToObject(PageTypeOptions)[page.pageType] || "—",
  },
  {
    key: "isPageVisible",
    header: "Visible",
    width: "100px",
    headClassName: "2xl:!text-[1.6rem] text-center",
    className: "text-center",
    render: (page: any) => (
      <div className="flex justify-center">
        <EnableDisable
          enabled={page.isPageVisible}
          data={page}
          handleToggle={onToggleVisibility}
        />
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    headClassName: "2xl:!text-[1.6rem] text-center",
    className: "text-center",
    render: (page: any) => (
      <ActionButton
        data={page}
        actions={WEBPAGE_ROW_ACTION}
        onAction={onAction}
      />
    ),
  },
];
