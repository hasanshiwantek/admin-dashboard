"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

import { DATE_OPTIONS, SearchCustomerFields, SortByOptions, SortOrderOptions,} from "./constant";
import { useSearchCustomerContainer } from "./Container";
import PageTitle from "@/components/ui/PageTitle";

const SearchCustomer = () => {
  const {
    form,
    control,
    country,
    countryOptions,
    stateOptions,
    handleCountryChange,
    handleSearch,
    handleCancel,
  } = useSearchCustomerContainer();

  return (
    <Form
      form={form}
      onSubmit={handleSearch}
      footer={{
        submitText: "Search",
        onCancel: handleCancel,
      }}
    >
      <div className="mb-6">
        <PageTitle
          title="Search customers"
          hideActionButton
          titleClassName="my-4! font-light! 2xl:!text-5xl"
        />
      </div>

      {/* Advanced Search */}
      <section className="space-y-6 bg-muted/40 p-6">
        <PageTitle
          title="Advanced search (optional)"
          hideActionButton
          titleClassName="my-6 font-semibold! 2xl:text-[2.4rem]!"
        />

        <div className="space-y-7 rounded-md border bg-white p-6">
          <InputField
            name={SearchCustomerFields.SearchKeywords}
            label="Search keywords"
            control={control}
            layout="vertical"
            labelClassName="2xl:!text-2xl"
            labelEndComponent={
              <HelpTooltip
                side="right"
                content="Search across customer name, email, or tags."
                iconClassName="fill-muted-plum-gray"
              />
            }
          />

          <InputField
            name={SearchCustomerFields.StartsWith}
            label="Starts with"
            control={control}
            layout="vertical"
            labelClassName="2xl:!text-2xl"
            labelEndComponent={
              <HelpTooltip
                side="right"
                content="Filter customers whose name starts with this value."
                iconClassName="fill-muted-plum-gray"
              />
            }
          />

          <InputField
            name={SearchCustomerFields.Phone}
            label="Phone"
            control={control}
            type="tel"
            layout="vertical"
            labelClassName="2xl:!text-2xl"
          />

          <InputField
            name={SearchCustomerFields.Country}
            label="Country"
            control={control}
            Component={SelectField}
            options={countryOptions}
            placeholder="-- Choose a country --"
            layout="vertical"
            labelClassName="2xl:!text-2xl"
            getValueOnChange={handleCountryChange}
            runAfterOnChange
          />

          <InputField
            name={SearchCustomerFields.StateProvince}
            label="State/Province"
            control={control}
            Component={SelectField}
            options={stateOptions}
            placeholder="-- Choose a state/province --"
            disabled={!country}
            layout="vertical"
            labelClassName="2xl:!text-2xl"
          />
        </div>
      </section>

      {/* Search by Range */}
      <section className="space-y-6 bg-muted/40 p-6">
        <PageTitle
          title="Search by range (optional)"
          hideActionButton
          titleClassName="mb-4 font-semibold! 2xl:text-[2.4rem]!"
        />

        <div className="space-y-6 rounded-md border bg-white p-6">
          <div className="space-y-3">
            <PageTitle
              title="Customer ID"
              hideActionButton
              titleClassName="block font-normal! 2xl:text-2xl!"
            />

            <div className="grid max-w-md grid-cols-2 gap-4">
              <InputField
                name={SearchCustomerFields.CustomerIdFrom}
                control={control}
                placeholder="From"
                layout="vertical"
              />

              <InputField
                name={SearchCustomerFields.CustomerIdTo}
                control={control}
                placeholder="To"
                layout="vertical"
              />
            </div>
          </div>

          <div className="space-y-3">
            <PageTitle
              title="Number of orders"
              hideActionButton
              titleClassName="block font-normal! 2xl:text-2xl!"
            />

            <div className="grid max-w-md grid-cols-2 gap-4">
              <InputField
                name={SearchCustomerFields.OrdersFrom}
                control={control}
                placeholder="From"
                layout="vertical"
              />

              <InputField
                name={SearchCustomerFields.OrdersTo}
                control={control}
                placeholder="To"
                layout="vertical"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search by Date */}
      <section className="space-y-6 bg-muted/40 p-6">
        <PageTitle
          title="Search by date (optional)"
          hideActionButton
          titleClassName="mb-4 font-semibold! 2xl:text-[2.4rem]!"
        />

        <div className="rounded-md border bg-white p-6">
          <InputField
            name={SearchCustomerFields.DateJoined}
            label="Date joined"
            control={control}
            Component={SelectField}
            options={DATE_OPTIONS}
            placeholder="-- Choose a registration date --"
            layout="vertical"
            labelClassName="2xl:text-2xl!"
          />
        </div>
      </section>

      {/* Sort Order */}
      <section className="space-y-6 bg-muted/40 p-6">
        <PageTitle
          title="Sort order"
          hideActionButton
          titleClassName="mb-4 font-semibold! 2xl:text-[2.4rem]!"
        />

        <div className="grid grid-cols-1 gap-4 rounded-md border bg-white p-6 md:grid-cols-2">
          <InputField
            name={SearchCustomerFields.SortBy}
            label="Customer"
            control={control}
            Component={SelectField}
            options={SortByOptions}
            placeholder="ID"
            layout="vertical"
            labelClassName="2xl:text-2xl!"
          />

          <InputField
            name={SearchCustomerFields.SortOrder}
            label="in"
            control={control}
            Component={SelectField}
            options={SortOrderOptions}
            placeholder="Ascending order"
            layout="vertical"
            labelClassName="2xl:text-2xl!"
          />
        </div>
      </section>
    </Form>
  );
};

export default SearchCustomer;
