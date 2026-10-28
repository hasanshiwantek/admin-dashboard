import ActionButton from "@/components/ActionButton/ActionButton";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import { CATEGORIES_ROUTE } from "../constant";
import { CategoryFormHeaderProps } from "./type";

const CategoryFormHeader = <T,>({
  title,
  pager,
  record,
  actions,
  onAction,
}: CategoryFormHeaderProps<T>) => (
  <>
    <div className="flex items-center justify-between">
      <Link
        href={CATEGORIES_ROUTE}
        className="flex items-center gap-3 text-xl text-gray-500! hover:text-gray-700! 2xl:text-[1.6rem]!"
      >
        <ArrowLeft className="size-7" />
        Categories
      </Link>
      {pager && pager.total > 0 && (
        <div className="flex items-center gap-4 text-xl text-gray-700">
          <span>
            {pager.current} of {pager.total}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous category"
            className="text-gray-600 disabled:opacity-30"
            onClick={pager.onPrevious}
            disabled={!pager.onPrevious}
          >
            <ChevronLeft className="size-7!" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next category"
            className="text-gray-600 disabled:opacity-30"
            onClick={pager.onNext}
            disabled={!pager.onNext}
          >
            <ChevronRight className="size-7!" />
          </Button>
        </div>
      )}
    </div>

    <div className="flex items-center justify-between">
      <h1 className="text-5xl! font-light! text-gray-700 2xl:text-[3.2rem]!">
        {title}
      </h1>
      {record && (
        <ActionButton
          data={record}
          actions={actions}
          onAction={onAction}
          label="More actions"
          align="end"
          icon={<Ellipsis className="size-7!" />}
          triggerProps={{
            variant: "outline",
            className: "size-14 rounded-sm border-blue-600 text-blue-600",
          }}
        />
      )}
    </div>

    <div className="mb-4">
      <span className="inline-block border-b-4 border-blue-600 px-6 pb-2 text-xl! font-light! 2xl:text-[1.6rem]!">
        Details
      </span>
    </div>
  </>
);

export default CategoryFormHeader;
