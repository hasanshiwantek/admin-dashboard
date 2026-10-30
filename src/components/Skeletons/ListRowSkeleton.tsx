import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface ListRowSkeletonProps {
  className?: string;
  iconColumnClassName?: string;
  iconClassName?: string;
  nameColumnClassName?: string;
  lines?: number;
  toggle?: "middle" | "actions" | false;
  actionWidths?: string[];
}

// Varied widths so stacked lines look like real text
const LINE_WIDTHS = ["w-[18rem]", "w-[15rem]", "w-[46rem]", "w-[8rem]"];

const ToggleSkeleton = () => (
  <Skeleton className="h-[1.4rem] w-[3.5rem] shrink-0 rounded-full" />
);

// One placeholder row. Pass to ListRenderer's `renderSkeleton`;
// it repeats it `skeletonCount` times. Mirror the real row's layout via props.
const ListRowSkeleton = ({
  className,
  iconColumnClassName = "w-10",
  iconClassName = "h-[1.6rem] w-[2.6rem]",
  nameColumnClassName = "w-56",
  lines = 2,
  toggle = "middle",
  actionWidths = ["w-[4.4rem]", "w-[2.8rem]"],
}: ListRowSkeletonProps) => (
  <div className={cn("flex items-center gap-6 px-6 py-6", className)}>
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        iconColumnClassName,
      )}
    >
      <Skeleton className={cn("shrink-0", iconClassName)} />
    </div>

    <div className={cn("shrink-0", nameColumnClassName)}>
      <Skeleton className="h-[1.4rem] w-[9rem]" />
    </div>

    <div className="flex flex-1 items-center justify-between gap-4">
      <ListRenderer
        data={Array.from({ length: lines }, (_, i) => i)}
        keyExtractor={(i) => i}
        className="space-y-[1.1rem]!"
        renderItem={(i) => (
          <Skeleton
            className={cn("h-[1.3rem]", LINE_WIDTHS[i % LINE_WIDTHS.length])}
          />
        )}
      />

      {toggle === "middle" && <ToggleSkeleton />}

      <div className="flex shrink-0 items-center gap-3">
        {toggle === "actions" && <ToggleSkeleton />}
        <ListRenderer
          data={actionWidths}
          keyExtractor={(_, i) => i}
          orientation="horizontal"
          emptyComponent={<></>}
          className="space-x-0! gap-3 overflow-visible! p-0!"
          renderItem={(width) => <Skeleton className={cn("h-[3.4rem]", width)} />}
        />
      </div>
    </div>
  </div>
);

export default ListRowSkeleton;
