"use client";

import ActionButton from "@/components/ActionButton/ActionButton";
import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import SectionNav from "@/components/SectionNav/SectionNav";
import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import UnsavedChangesModal from "@/Modals/CommonModals/UnsavedChangesModal/UnsavedChangesModal";
import DeleteProductModal from "@/Modals/ProductModals/DeleteProductModal/DeleteProductModal";
import ProductBasicInfoSection from "../_components/ProductBasicInfoSection";
import ProductCustomFieldsSection from "../_components/ProductCustomFieldsSection";
import ProductCustomsSection from "../_components/ProductCustomsSection";
import ProductDescriptionSection from "../_components/ProductDescriptionSection";
import ProductDimensionsSection from "../_components/ProductDimensionsSection";
import ProductIdentifiersSection from "../_components/ProductIdentifiersSection";
import ProductInventorySection from "../_components/ProductInventorySection";
import ProductMediaSection from "../_components/ProductMediaSection";
import ProductOpenGraphSection from "../_components/ProductOpenGraphSection";
import ProductPricingSection from "../_components/ProductPricingSection";
import ProductPurchasabilitySection from "../_components/ProductPurchasabilitySection";
import ProductRelatedSection from "../_components/ProductRelatedSection";
import ProductSectionGroupHeading from "../_components/ProductSectionGroupHeading";
import ProductSeoSection from "../_components/ProductSeoSection";
import ProductShippingSection from "../_components/ProductShippingSection";
import ProductPageHeader from "../_components/ProductPageHeader";
import ProductStorefrontSection from "../_components/ProductStorefrontSection";
import { ProductSubmitAction } from "./constant";
import useProductFormPageContainer from "./container";

const ProductFormPage = () => {
  const {
    form,
    isEdit,
    record,
    title,
    storefrontUrl,
    headerRef,
    compactHeader,
    loading,
    saving,
    navSections,
    activeSection,
    scrollToSection,
    priceInputProps,
    brands,
    categories,
    handleIdentityChange,
    showAdvanced,
    toggleAdvanced,
    discountTypeOptions,
    bulkPricingTiers,
    bulkPricingColumns,
    handleAddTier,
    trackInventory,
    customFields,
    customFieldColumns,
    handleAddCustomField,
    freeShipping,
    showCallForPricing,
    showCallForPricingFields,
    manageCustoms,
    hsCodes,
    hsCodeColumns,
    handleAddHsCode,
    showRedirect,
    handleProductUrlChange,
    handleResetProductUrl,
    productActions,
    handleProductAction,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
    setSubmitAction,
    onSubmit,
    onInvalid,
    handleCancel,
    leaveOpen,
    setLeaveOpen,
    confirmLeave,
    stay,
  } = useProductFormPageContainer();

  return (
    <PageLayout>
      <ProductPageHeader
        compact={compactHeader}
        headerRef={headerRef}
        title={title}
        storefrontUrl={storefrontUrl}
        onBack={handleCancel}
        action={
          isEdit &&
          record && (
            <ActionButton
              data={record}
              actions={productActions}
              onAction={handleProductAction}
              label="Product actions"
              triggerProps={{ variant: "outline" }}
            />
          )
        }
      />
      <Form
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        bodyClassName="relative gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save & View Products",
          loadingText: "Saving...",
          onCancel: handleCancel,
          loading: saving,
          disabled: loading,
          extraActions: (
            <>
              <Button
                type="submit"
                variant="outline"
                size="xl"
                disabled={saving || loading}
                onClick={setSubmitAction(ProductSubmitAction.Save)}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="xl"
                disabled={saving || loading}
                onClick={setSubmitAction(ProductSubmitAction.Duplicate)}
              >
                Save & Duplicate
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="xl"
                disabled={saving || loading}
                onClick={setSubmitAction(ProductSubmitAction.AddAnother)}
              >
                Save & Add Another
              </Button>
            </>
          ),
        }}
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <SectionNav
            sections={navSections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            className={cn(
              "transition-[top] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              compactHeader && "top-[9.4rem]",
            )}
          />

          <div
            className={cn(
              "flex min-w-0 flex-col gap-8 transition-opacity duration-200",
              loading && LOADING_DIM_CLASS,
            )}
          >
            <ProductSectionGroupHeading
              title="Product Information"
              description="Information to help define a product."
            />
            <ProductBasicInfoSection
              priceInputProps={priceInputProps}
              brands={brands}
              categories={categories}
              onIdentityChange={handleIdentityChange}
            />
            <ProductDescriptionSection />
            <ProductMediaSection />
            <ProductIdentifiersSection
              onIdentityChange={handleIdentityChange}
            />
            <ProductPricingSection
              priceInputProps={priceInputProps}
              showAdvanced={showAdvanced}
              onToggleAdvanced={toggleAdvanced}
              discountTypeOptions={discountTypeOptions}
              bulkPricingTiers={bulkPricingTiers}
              bulkPricingColumns={bulkPricingColumns}
              onAddTier={handleAddTier}
            />
            <ProductInventorySection trackInventory={trackInventory} />
            <ProductSectionGroupHeading
              title="Storefront"
              description="Set up what customers will see on the storefront."
            />
            <ProductStorefrontSection />
            <ProductCustomFieldsSection
              customFields={customFields}
              customFieldColumns={customFieldColumns}
              onAddCustomField={handleAddCustomField}
            />
            <ProductRelatedSection />
            <ProductSectionGroupHeading
              title="Fulfillment"
              description="Set up shipping and inventory details for this product."
            />
            <ProductDimensionsSection />
            <ProductShippingSection
              priceInputProps={priceInputProps}
              freeShipping={freeShipping}
            />
            <ProductPurchasabilitySection
              showCallForPricing={showCallForPricing}
              showCallForPricingFields={showCallForPricingFields}
            />
            <ProductCustomsSection
              manageCustoms={manageCustoms}
              hsCodes={hsCodes}
              hsCodeColumns={hsCodeColumns}
              onAddHsCode={handleAddHsCode}
            />
            <ProductSectionGroupHeading
              title="SEO & Sharing"
              description="Boost traffic to your online business."
            />
            <ProductSeoSection
              showRedirect={showRedirect}
              onProductUrlChange={handleProductUrlChange}
              onResetProductUrl={handleResetProductUrl}
            />
            <ProductOpenGraphSection />
          </div>
        </div>
        {loading && <LoadingOverlay />}
      </Form>

      {record && (
        <DeleteProductModal
          products={[{ id: record.id, name: record.name }]}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onDeleted={handleDeleted}
        />
      )}
      <UnsavedChangesModal
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        onLeave={confirmLeave}
        onStay={stay}
      />
    </PageLayout>
  );
};

export default ProductFormPage;
