import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsQuestionCircleFill } from "react-icons/bs";
import {
  CATEGORY_DESCRIPTION_MENUBAR,
  CATEGORY_DESCRIPTION_TOOLBAR,
  CategoryFormNames,
  CategoryTemplateLayoutOptions,
  DefaultProductSortOptions,
} from "../[id]/constant";
import { blockInvalidSlugKey, blockInvalidSlugPaste } from "../[id]/utils";
import CategoryImageField from "./CategoryImageField";
import SortOrderStepper from "./SortOrderStepper";
import {
  CategoryFieldLabelProps,
  CategoryFormFieldsProps,
  CategoryFormSectionProps,
} from "./type";


const LABEL_CLASS =
  "font-semibold text-gray-800 text-xl 2xl:text-[1.6rem]! my-0";

const FieldLabel = ({
  text,
  optional,
  tooltip,
  description,
}: CategoryFieldLabelProps) => (
  <span className="flex flex-col items-start gap-2">
    <span className="flex items-center gap-2 text-2xl!">
      {text}
      {optional && (
        <span className="text-2xl! font-light! text-gray-500">(Optional)</span>
      )}
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help text-gray-400">
              <BsQuestionCircleFill className="size-[1.3rem]" />
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm text-lg" align="start">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </span>
    {description && (
      <span className="text-lg font-light! text-gray-500">{description}</span>
    )}
  </span>
);

const Section = ({ title, children }: CategoryFormSectionProps) => (
  <section className="flex flex-col gap-8 rounded-sm border border-gray-100 bg-white p-10 shadow-sm">
    <h2 className="text-[2.4rem]! font-light! text-gray-800">{title}</h2>
    {children}
  </section>
);

const CategoryFormFields = ({
  categoryTree,
  channelOptions,
  onNameChange,
  onSlugChange,
  onResetSlug,
}: CategoryFormFieldsProps) => (
  <>
    <Section title="Category details">
      <InputField
        name={CategoryFormNames.Name}
        label={<FieldLabel text="Display name" />}
        layout="vertical"
        labelClassName={LABEL_CLASS}
        getValueOnChange={onNameChange}
        runAfterOnChange
      />

      <InputField
        name={CategoryFormNames.Slug}
        label={
          <FieldLabel
            text="URL"
            tooltip="The URL of this category on your storefront. Click Reset to regenerate it from the display name."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        controlClassName="max-w-[40rem]"
        onKeyDown={blockInvalidSlugKey}
        onPaste={blockInvalidSlugPaste}
        getValueOnChange={onSlugChange}
        afterFieldComponent={
          <Button
            type="button"
            variant="link"
            className="h-13 px-10 text-xl 2xl:text-[1.6rem]!"
            onClick={onResetSlug}
          >
            Reset
          </Button>
        }
      />

      <InputField
        name={CategoryFormNames.Description}
        label={<FieldLabel text="Description" />}
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={RichTextEditor}
        menubar={CATEGORY_DESCRIPTION_MENUBAR}
        toolbar={CATEGORY_DESCRIPTION_TOOLBAR}
      />

      <InputField
        name={CategoryFormNames.Channel}
        label={<FieldLabel text="Channel" />}
        required
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={SelectField}
        options={channelOptions}
        disabled
        className="max-w-md bg-gray-100"
      />

      <InputField
        name={CategoryFormNames.Parent}
        label={
          <FieldLabel
            text="Parent category"
            description="Leave empty to add to the root category"
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        containerClassName="max-w-md"
        Component={CategoryDropdown}
        categoryData={categoryTree}
      />

      <InputField
        name={CategoryFormNames.TemplateLayout}
        label={
          <FieldLabel
            text="Template layout file"
            tooltip="The template file used to display this category on your storefront."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={SelectField}
        options={CategoryTemplateLayoutOptions}
        className="max-w-md"
      />

      <InputField
        name={CategoryFormNames.SortOrder}
        label={
          <FieldLabel
            text="Sort order"
            tooltip="Categories are displayed in ascending order of this number."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={SortOrderStepper}
      />

      <InputField
        name={CategoryFormNames.DefaultProductSort}
        label={
          <FieldLabel
            text="Default product sort"
            tooltip="How products in this category are sorted by default on your storefront."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={SelectField}
        options={DefaultProductSortOptions}
        className="max-w-md"
      />

      <InputField
        name={CategoryFormNames.Image}
        label={
          <FieldLabel
            text="Category Image"
            description="File types: ICO, JPG, GIF, PNG, maximum 8MB."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
        Component={CategoryImageField}
      />
    </Section>

    <Section title="Search engine optimization">
      <InputField
        name={CategoryFormNames.SeoHomeTitle}
        label={
          <FieldLabel
            text="Home page title"
            optional
            tooltip="The title shown in the browser tab and search results for this category."
            description="When blank, category name is used as a page title"
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CategoryFormNames.SeoMetaKeywords}
        label={
          <FieldLabel
            text="Meta keywords"
            optional
            tooltip="Keywords added to the page's meta keywords tag."
            description="You can enter multiple keywords separated by a comma"
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CategoryFormNames.SeoMetaDescription}
        label={
          <FieldLabel
            text="Meta description"
            optional
            tooltip="A short summary of this category shown in search engine results."
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CategoryFormNames.SeoSearchKeywords}
        label={
          <FieldLabel
            text="Search keywords"
            optional
            tooltip="Keywords that help shoppers find this category using your store's search."
            description="You can enter multiple keywords separated by a comma"
          />
        }
        layout="vertical"
        labelClassName={LABEL_CLASS}
      />
    </Section>
  </>
);

export default CategoryFormFields;
