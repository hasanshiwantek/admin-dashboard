import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import ListRowSkeleton from "@/components/Skeletons/ListRowSkeleton";
import { cn } from "@/lib/utils";
import { SKELETON_ROW_COUNT } from "../constant";
import ShippingMethodRow from "./ShippingMethodRow";
import { ShippingMethodsSectionProps } from "./type";

const ShippingMethodsSection = ({
  title,
  methods,
  loading,
  onToggle,
  onMethodSaved,
}: ShippingMethodsSectionProps) => {
  // First load: no rows yet, show skeletons.
  // Refresh: rows stay mounted (an edit modal may be open inside one) and a
  // spinner overlays them instead.
  const firstLoad = !!loading && !methods.length;
  const refreshing = !!loading && methods.length > 0;

  return (
    <section>
      <h2 className="mb-3 text-[12px]! font-semibold! uppercase tracking-wide text-gray-400!">
        {title}
      </h2>

      <div className="relative overflow-hidden rounded-lg border border-border-light bg-white">
        <ListRenderer
          data={methods}
          keyExtractor={(method) => method.id}
          isLoading={firstLoad}
          skeletonCount={SKELETON_ROW_COUNT}
          renderSkeleton={() => (
            // Mirrors ShippingMethodRow: wide image, w-80 name, toggle + Edit
            <ListRowSkeleton
              className="gap-10 px-8 py-8"
              iconColumnClassName="w-20"
              iconClassName="h-[4.4rem] w-[5rem]"
              nameColumnClassName="w-80"
              lines={1}
              toggle="actions"
              actionWidths={["w-[4.4rem]"]}
            />
          )}
          emptyComponent={<p>No shipping methods.</p>}
          className={cn(
            "space-y-0! divide-y divide-border-light transition-opacity duration-200",
            refreshing && LOADING_DIM_CLASS,
          )}
          renderItem={(method) => (
            <ShippingMethodRow
              method={method}
              onToggle={onToggle}
              onSaved={onMethodSaved}
            />
          )}
        />

        {refreshing && <LoadingOverlay text="Updating..." />}
      </div>
    </section>
  );
};

export default ShippingMethodsSection;
