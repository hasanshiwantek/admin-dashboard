import CheckboxField from "@/components/form/fields/CheckboxField";
import FileField from "@/components/form/fields/FileField";
import InputField from "@/components/form/InputField";
import PriceField from "@/components/form/PriceField";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  GiftWrappingFormNames,
  PREVIEW_IMAGE_MAX_SIZE_MB,
  PREVIEW_IMAGE_TYPES,
} from "../constant";

const GiftWrappingFormFields = () => (
  <SectionCard title="Gift Wrapping Settings">
    <InputField
      name={GiftWrappingFormNames.Name}
      label="Name"
      required
      controlClassName="max-w-[27rem]"
    />
    <InputField
      name={GiftWrappingFormNames.PreviewImage}
      label="Preview Image"
      Component={FileField}
      accept={PREVIEW_IMAGE_TYPES}
      maxSizeMb={PREVIEW_IMAGE_MAX_SIZE_MB}
    />
    <PriceField
      name={GiftWrappingFormNames.Price}
      label="Price per Product"
      required
      controlClassName="max-w-[16rem]"
    />
    <InputField
      name={GiftWrappingFormNames.AllowGiftMessages}
      label="Allow Gift Messages?"
      Component={CheckboxField}
      text="Yes, allow customers to add custom message"
    />
    <InputField
      name={GiftWrappingFormNames.IsVisible}
      label="Visible?"
      Component={CheckboxField}
      text="Yes, show this wrapping option to customers"
    />
  </SectionCard>
);

export default GiftWrappingFormFields;
