"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import {
  OrderSearchField,
  orderStatusOptions,
  paymentMethodOptions,
  dateRangeOptions,
  sortByOptions,
  sortDirectionOptions,
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
              name={OrderSearchField.Keywords}
              label="Search Keywords"
            />

            <InputField
              name={OrderSearchField.Status}
              label="Status"
              Component={SelectField}
              options={orderStatusOptions}
              placeholder="-- Choose status --"
            />

            <InputField
              name={OrderSearchField.PaymentMethod}
              label="Payment Method"
              Component={SelectField}
              options={paymentMethodOptions}
              placeholder="-- Choose payment method --"
            />

            <InputField name={OrderSearchField.Coupon} label="Coupon code" />
          </div>

          {/* Search by Range */}
          <div className="space-y-6">
            <PageTitle title="Search by Range" hideActionButton />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name={OrderSearchField.OrderIdFrom}
                label="Order ID From"
                type="number"
              />

              <InputField
                name={OrderSearchField.OrderIdTo}
                label="Order ID To"
                type="number"
              />

              <InputField
                name={OrderSearchField.OrderTotalFrom}
                label="Order Total From"
                type="number"
              />

              <InputField
                name={OrderSearchField.OrderTotalTo}
                label="Order Total To"
                type="number"
              />
            </div>
          </div>

          {/* Search by Date */}
          <div className="space-y-6">
            <PageTitle title="Search by date" hideActionButton />

            <InputField
              name={OrderSearchField.DateRange}
              label="Date range"
              Component={SelectField}
              options={dateRangeOptions}
              placeholder="-- Choose an order date --"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-6">
            <PageTitle title="Sort Order" hideActionButton />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name={OrderSearchField.SortBy}
                label="Sort by"
                Component={SelectField}
                options={sortByOptions}
              />

              <InputField
                name={OrderSearchField.SortDirection}
                label="Sort direction"
                Component={SelectField}
                options={sortDirectionOptions}
              />
            </div>
          </div>
        </section>
      </Form>
    </PageLayout>
  );
}
