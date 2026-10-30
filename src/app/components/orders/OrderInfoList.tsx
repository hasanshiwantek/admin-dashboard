import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { cn } from "@/lib/utils";
import { OrderInfoItem, OrderInfoListProps } from "./types";

// Two columns: right-aligned labels/icons with a divider, values beside them
export default function OrderInfoList({ items }: OrderInfoListProps) {
  return (
    <ListRenderer
      data={items.filter(Boolean) as OrderInfoItem[]}
      keyExtractor={(item) => item.key}
      emptyComponent={<></>}
      className="grid! grid-cols-[auto_1fr] content-start space-y-0!"
      itemClassName="contents"
      renderItem={(item) => (
        <>
          <div
            className={cn(
              "flex items-start justify-end border-r py-1.5 pr-5 text-gray-500 [&_svg]:size-6",
              item.rowClassName,
            )}
          >
            {item.label}
          </div>
          <div
            className={cn(
              "min-w-0 py-1.5 pl-5 text-[1.3rem] break-words text-text-heading",
              item.rowClassName,
            )}
          >
            {item.content}
          </div>
        </>
      )}
    />
  );
}
