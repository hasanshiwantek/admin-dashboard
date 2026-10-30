import SectionCard from "@/components/SectionCard/SectionCard";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { Plus } from "lucide-react";
import { ProductSection } from "../[id]/constant";
import { ProductCustomFieldsSectionProps } from "./type";

const ProductCustomFieldsSection = ({
  customFields,
  customFieldColumns,
  onAddCustomField,
}: ProductCustomFieldsSectionProps) => (
  <SectionCard
    id={ProductSection.CustomFields}
    title="Custom fields"
    description="Custom fields show extra information in the product's details on its page. Remove them all to show none."
    className="scroll-mt-24"
  >
    {customFields.length > 0 && (
      <Table
        data={customFields}
        columns={customFieldColumns}
        getRowId={(row) => row.id}
        selectable={false}
        hideRecordCount
        bare
      />
    )}
    <Button
      type="button"
      variant="link"
      onClick={onAddCustomField}
      className="h-auto w-fit p-0"
    >
      <Plus className="size-5" />
      Add custom field
    </Button>
  </SectionCard>
);

export default ProductCustomFieldsSection;
