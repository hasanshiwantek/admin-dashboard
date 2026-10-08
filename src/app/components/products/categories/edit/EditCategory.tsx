"use client";

import Spinner from "@/app/components/loader/Spinner";
import ConfirmationModal from "@/app/components/orders/edit/CaptuedPaymentModal";
import OrderActionsDropdown from "@/app/components/orders/OrderActionsDropdown";
import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import SelectField from "@/components/form/fields/SelectField";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import PageLayout from "@/components/ui/PageLayout";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import CategoryImageField from "./CategoryImageField";
import {
  CATEGORIES_LIST_PATH,
  CATEGORY_DESCRIPTION_TOOLBAR,
  CategoryField,
  DEFAULT_PRODUCT_SORT_OPTIONS,
  TEMPLATE_LAYOUT_OPTIONS,
} from "./constant";
import useEditCategoryContainer from "./EditCategoryContainer";
import SortOrderStepper from "./SortOrderStepper";

const LABEL_CLASS =
  "font-semibold text-gray-800 text-xl 2xl:text-[1.6rem]! my-0";

type FieldLabelProps = {
  text: string;
  optional?: boolean;
  tooltip?: string;
  description?: string;
};

const FieldLabel = ({
  text,
  optional,
  tooltip,
  description,
}: FieldLabelProps) => (
  <span className="flex flex-col items-start gap-2">
    <span className="flex items-center gap-2 text-2xl!">
      {text}
      {optional && (
        <span className="text-2xl! font-light! text-gray-500">(Optional)</span>
      )}
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-400 cursor-help">
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
      <span className="font-light! text-lg text-gray-500">{description}</span>
    )}
  </span>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-8 bg-white rounded-sm shadow-sm border border-gray-100 p-10">
    <h2 className="text-[2.4rem]! font-light! text-gray-800">{title}</h2>
    {children}
  </section>
);

const EditCategory = () => {
  const {
    form,
    control,
    loading,
    catTree,
    channelOptions,
    pager,
    onResetSlug,
    blockInvalidSlugKey,
    blockInvalidSlugPaste,
    onSubmit,
    onCancel,
    moreActions,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleting,
    onConfirmDelete,
    Alert,
  } = useEditCategoryContainer();

  if (loading) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <PageLayout className="w-full max-w-[100rem] mx-auto px-10 py-14!">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={CATEGORIES_LIST_PATH}
          className="flex items-center gap-3 text-xl 2xl:text-[1.6rem] text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="size-7" />
          Categories
        </Link>
        {pager.total > 0 && (
          <div className="flex items-center gap-4 text-xl text-gray-700">
            <span>
              {pager.current} of {pager.total}
            </span>
            <button
              type="button"
              aria-label="Previous category"
              className="p-1 text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-default"
              onClick={pager.onPrev}
              disabled={!pager.hasPrev}
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              aria-label="Next category"
              className="p-1 text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-default"
              onClick={pager.onNext}
              disabled={!pager.hasNext}
            >
              <ChevronRight className="size-7" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-5xl! 2xl:text-[3.2rem]! font-light! text-gray-700">
          Edit category
        </h1>
        <OrderActionsDropdown
          actions={moreActions}
          trigger={
            <button
              type="button"
              aria-label="More actions"
              className="flex items-center justify-center size-14 rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
            >
              <Ellipsis className="size-7" />
            </button>
          }
        />
      </div>

      <div className="mb-4">
        <span className="font-light! inline-block px-6 pb-2 border-b-4 border-blue-600 text-xl! 2xl:text-[1.6rem]!">
          Details
        </span>
      </div>

      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="bg-transparent border-0 rounded-none p-0 gap-8"
        footer={{
          submitText: "Save",
          onCancel,
          loading: form.formState.isSubmitting,
        }}
      >
        <Section title="Category details">
          <InputField
            name={CategoryField.Name}
            label={<FieldLabel text="Display name" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
          />

          <div className="flex items-end gap-12">
            <InputField
              name={CategoryField.Slug}
              label={
                <FieldLabel
                  text="URL"
                  tooltip="The URL of this category on your storefront. Click Reset to regenerate it from the display name."
                />
              }
              layout="vertical"
              labelClassName={LABEL_CLASS}
              containerClassName="w-full max-w-md"
              control={control}
              onKeyDown={blockInvalidSlugKey}
              onPaste={blockInvalidSlugPaste}
            />
            <button
              type="button"
              className="h-13 text-xl 2xl:text-[1.6rem] text-blue-600 hover:underline cursor-pointer"
              onClick={onResetSlug}
            >
              Reset
            </button>
          </div>

          <InputField
            name={CategoryField.Description}
            label={<FieldLabel text="Description" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={RichTextEditor}
            control={control}
            menubar="file edit insert view format table"
            toolbar={CATEGORY_DESCRIPTION_TOOLBAR}
          />

          <InputField
            name={CategoryField.Channel}
            label={<FieldLabel text="Channel" />}
            required
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={SelectField}
            control={control}
            options={channelOptions}
            disabled
            className="max-w-md bg-gray-100"
          />

          <InputField
            name={CategoryField.Parent}
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
            control={control}
            categoryData={catTree}
          />

          <InputField
            name={CategoryField.TemplateLayout}
            label={
              <FieldLabel
                text="Template layout file"
                tooltip="The template file used to display this category on your storefront."
              />
            }
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={SelectField}
            control={control}
            options={TEMPLATE_LAYOUT_OPTIONS}
            className="max-w-md"
          />

          <InputField
            name={CategoryField.SortOrder}
            label={
              <FieldLabel
                text="Sort order"
                tooltip="Categories are displayed in ascending order of this number."
              />
            }
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={SortOrderStepper}
            control={control}
          />

          <InputField
            name={CategoryField.DefaultProductSort}
            label={
              <FieldLabel
                text="Default product sort"
                tooltip="How products in this category are sorted by default on your storefront."
              />
            }
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={SelectField}
            control={control}
            options={DEFAULT_PRODUCT_SORT_OPTIONS}
            className="max-w-md"
          />

          <InputField
            name={CategoryField.Image}
            label={
              <FieldLabel
                text="Category Image"
                description="File types: ICO, JPG, GIF, PNG, maximum 8MB."
              />
            }
            layout="vertical"
            labelClassName={LABEL_CLASS}
            Component={CategoryImageField}
            control={control}
          />
        </Section>

        <Section title="Search engine optimization">
          <InputField
            name={CategoryField.SeoHomeTitle}
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
            control={control}
          />
          <InputField
            name={CategoryField.SeoMetaKeywords}
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
            control={control}
          />
          <InputField
            name={CategoryField.SeoMetaDescription}
            label={
              <FieldLabel
                text="Meta description"
                optional
                tooltip="A short summary of this category shown in search engine results."
              />
            }
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
          />
          <InputField
            name={CategoryField.SeoSearchKeywords}
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
            control={control}
          />
        </Section>
      </Form>

      <ConfirmationModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onConfirmDelete}
        title="Delete category?"
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        loading={deleting}
      />
      <Alert />
    </PageLayout>
  );
};

export default EditCategory;
