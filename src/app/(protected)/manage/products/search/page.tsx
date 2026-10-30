"use client";

import Form from "@/components/form/Form";
import PageLayout from "@/components/ui/PageLayout";
import ProductSearchFormFields from "./_components/ProductSearchFormFields";
import useProductSearchPageContainer from "./container";

const ProductSearchPage = () => {
  const {
    form,
    brands,
    brandsLoading,
    onSubmit,
    handleCancel,
  } = useProductSearchPageContainer();

  return (
    <PageLayout
      title="Search"
      titleProps={{
        description:
          "Search for specific products using the advanced search options below.",
        titleClassName: "font-extralight! 2xl:text-[2.4rem]!",
        descriptionClassName: "2xl:text-2xl!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="gap-10 border-0 bg-transparent p-0"
        footer={{
          submitText: "Search",
          loadingText: "Searching...",
          onCancel: handleCancel,
        }}
      >
        <ProductSearchFormFields
          brands={brands}
          brandsLoading={brandsLoading}        />
      </Form>
    </PageLayout>
  );
};

export default ProductSearchPage;
