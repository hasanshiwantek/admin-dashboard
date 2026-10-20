import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/ui/PageTitle";
import ConfigureShippingAddressModal from "@/Modals/ShippingModals/ConfigureShippingAddressModal/ConfigureShippingAddressModal";
import { originAddressFields } from "../constant";
import { ShippingOriginSectionProps } from "./type";

const ShippingOriginSection = ({
  address,
  loading,
}: ShippingOriginSectionProps) => (
  <section>
    <PageTitle
      title="Shipping origin"
      description="The shipping origin is the address where you ship your products from. It is also used to calculate the shipping rates displayed to your customers within the checkout."
      hideActionButton
      titleClassName="text-[20px]! font-bold! text-text-heading"
      descriptionClassName="text-[15px]! leading-relaxed text-muted-plum-gray!"
      containerClassName="mb-0"
      textContainerClassName="mb-0 gap-5"
    />

    <Card className="mt-10 rounded-none! bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <ListRenderer
          data={originAddressFields}
          keyExtractor={(field) => field}
          className="mt-5 space-y-0! leading-relaxed"
          renderItem={(field) => (
            <p className="text-[15px]! text-muted-plum-gray!">
              {address?.[field]}
            </p>
          )}
        />
        <ConfigureShippingAddressModal
          trigger={
            <Button type="button" variant="outline" disabled={loading}>
              {loading ? "Loading.." : "Edit"}
            </Button>
          }
        />
      </div>
    </Card>
  </section>
);

export default ShippingOriginSection;
