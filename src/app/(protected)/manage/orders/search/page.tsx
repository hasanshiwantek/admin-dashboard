"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import {
  OrderSearchField,
  OrderStatusOptions,
  PaymentMethodOptions,
  DateRangeOptions,
  SortByOptions,
  SortDirectionOptions,
  ORDER_ROUTES,
} from "./constant";
import { useOrderSearchContainer } from "./container";
import PageTitle from "@/components/ui/PageTitle";

export default function OrderSearch() {
  const { form, onSubmit, router } = useOrderSearchContainer();

  return (
    <PageLayout
      title="Search orders"
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        description:
          "Search for specific orders using the advanced search options below.",
      }}
      className="mx-auto max-w-[900px]"
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Search",
          loading: form.formState.isSubmitting,
          onCancel: () => router.push(ORDER_ROUTES.list),
        }}
      >
        <section className="flex w-full flex-col gap-8 pb-10">
          {/* Advanced Search */}
          <div className="space-y-6">
            <PageTitle title="Advanced Search" hideActionButton />

            <InputField
              name={OrderSearchField.keywords}
              label="Search Keywords"
            />

            <InputField
              name={OrderSearchField.status}
              label="Status"
              Component={SelectField}
              options={OrderStatusOptions}
              placeholder="-- Choose status --"
            />

            <InputField
              name={OrderSearchField.paymentMethod}
              label="Payment Method"
              Component={SelectField}
              options={PaymentMethodOptions}
              placeholder="-- Choose payment method --"
            />

            <InputField name={OrderSearchField.coupon} label="Coupon code" />
          </div>

          {/* Search by Range */}
          <div className="space-y-6">
            <PageTitle title="Search by Range" hideActionButton />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name={OrderSearchField.orderIdFrom}
                label="Order ID From"
                type="number"
              />

              <InputField
                name={OrderSearchField.orderIdTo}
                label="Order ID To"
                type="number"
              />

              <InputField
                name={OrderSearchField.orderTotalFrom}
                label="Order Total From"
                type="number"
              />

              <InputField
                name={OrderSearchField.orderTotalTo}
                label="Order Total To"
                type="number"
              />
            </div>
          </div>

          {/* Search by Date */}
          <div className="space-y-6">
            <PageTitle title="Search by date" hideActionButton />

            <InputField
              name={OrderSearchField.dateRange}
              label="Date range"
              Component={SelectField}
              options={DateRangeOptions}
              placeholder="-- Choose an order date --"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-6">
            <PageTitle title="Sort Order" hideActionButton />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name={OrderSearchField.sortBy}
                label="Sort by"
                Component={SelectField}
                options={SortByOptions}
              />

              <InputField
                name={OrderSearchField.sortDirection}
                label="Sort direction"
                Component={SelectField}
                options={SortDirectionOptions}
              />
            </div>
          </div>
        </section>
      </Form>
    </PageLayout>
  );
}
