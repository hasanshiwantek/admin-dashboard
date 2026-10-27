import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import ListRowSkeleton from "@/components/Skeletons/ListRowSkeleton";
import { Card } from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";
import { SKELETON_ROW_COUNT } from "../constant";
import ShippingZoneRow from "./ShippingZoneRow";
import { ShippingZonesSectionProps } from "./type";

const ShippingZonesSection = ({
  zones,
  loading,
  onToggle,
  onDelete,
}: ShippingZonesSectionProps) => (
  <section className="mt-10">
    <PageTitle
      title="Checkout shipping options"
      description="Manage your shipping zones, carriers and rules you want to offer to your customers within the checkout."
      hideActionButton
      titleClassName="text-[20px]! font-normal! text-text-heading"
      descriptionClassName="text-[15px]! leading-relaxed text-muted-plum-gray!"
      containerClassName="mb-0"
      textContainerClassName="mb-0 gap-5"
    />

    <Card className="mt-6 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-[15px]! font-semibold text-muted-plum-gray!">
        Configure your shipping rules
      </h3>

      <div className="overflow-hidden rounded-lg p-4">
        <div className="bg-white px-6 py-3">
          <span className="text-[15px]! font-semibold! text-black!">
            Basic shipping rules
          </span>
        </div>

        <ListRenderer
          data={zones}
          keyExtractor={(zone) => zone.id}
          isLoading={loading}
          skeletonCount={SKELETON_ROW_COUNT}
          renderSkeleton={() => <ListRowSkeleton lines={3} />}
          emptyComponent={<p>No shipping zones yet.</p>}
          className="space-y-0!"
          renderItem={(zone) => (
            <ShippingZoneRow zone={zone} onToggle={onToggle} onDelete={onDelete} />
          )}
        />
      </div>
    </Card>
  </section>
);

export default ShippingZonesSection;
