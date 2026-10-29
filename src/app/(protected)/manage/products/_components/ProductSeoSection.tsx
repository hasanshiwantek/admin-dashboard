import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { Button } from "@/components/ui/Button";
import { ProductFormNames, ProductSection } from "../[id]/constant";
import { ProductSeoSectionProps } from "./type";

const ProductSeoSection = ({
  showRedirect,
  onProductUrlChange,
  onResetProductUrl,
}: ProductSeoSectionProps) => (
  <SectionCard
    id={ProductSection.Seo}
    title="Search engine optimization"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.PageTitle}
      label="Page title"
      layout="vertical"
      controlClassName="max-w-[57rem]"
      className="max-w-none"
      labelEndComponent={
        <HelpTooltip content="Leave blank to use the product name as the page title." />
      }
    />
    <InputField
      name={ProductFormNames.ProductUrl}
      label="Product URL"
      required
      layout="vertical"
      controlClassName="max-w-[57rem]"
      getValueOnChange={onProductUrlChange}
      labelEndComponent={
        <HelpTooltip content="How people reach this product on your website. Reset returns it to the format set in Settings › URL structure." />
      }
      afterFieldComponent={
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onResetProductUrl}
        >
          Reset
        </Button>
      }
    />
    {showRedirect && (
      <InputField
        name={ProductFormNames.IsRedirect}
        Component={CheckboxField}
        text="Redirect old URLs to this URL automatically (recommended)"
        layout="vertical"
      />
    )}
    <InputField
      name={ProductFormNames.MetaDescription}
      label="Meta description"
      layout="vertical"
      className="max-w-none"
      labelEndComponent={
        <HelpTooltip content="The description used in this product's meta description tag." />
      }
    />
  </SectionCard>
);

export default ProductSeoSection;
