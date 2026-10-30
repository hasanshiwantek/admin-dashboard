"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import PageLayout from "@/components/ui/PageLayout";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Plus, Trash } from "lucide-react";
import { CUSTOMER_ROUTES, CustomerFormField } from "./constant";
import { useCustomerFormContainer } from "./container";
import CheckboxField from "@/components/form/fields/CheckboxField";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/ui/Table/Table";
export default function CustomerForm() {
  const {
    id,
    form,
    columns,
    isEdit,
    onSubmit,
    router,
    Alert,
    customerAddresses,
    addressesLoading,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    showDeleteModal,
    setShowDeleteModal,
    deleteAddressIds,
    confirmDeleteAddresses,
    getRowActions,
  } = useCustomerFormContainer();

  return (
    <PageLayout
      title={isEdit ? "Update customer" : "Add customer"}
      titleProps={{
        titleClassName: "!text-[30px] !font-normal text-[#313440]",
      }}
      className="mx-auto max-w-7xl"
    >
      <Form
        form={form}
        onSubmit={(values) => onSubmit(values)}
        footer={{
          submitText: isEdit ? "Save" : "Add Customer",
          loading: form.formState.isSubmitting,
          onCancel: () => router.push(CUSTOMER_ROUTES.LIST),
          extraActions: !isEdit ? (
            <Button
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() =>
                void form.handleSubmit(
                  (values) => onSubmit(values, true),
                  () => undefined,
                )()
              }
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : "Save and add another"}
            </Button>
          ) : null,
        }}
      >
        {/* Login details */}
        <section className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5 w-full shadow-sm">
          <PageTitle title="Login details" hideActionButton />

          <div className="space-y-5">
            <InputField
              name={CustomerFormField.Email}
              label="Address e-mail"
              type="email"
              disabled
              required
              layout="vertical"
              containerClassName="w-full"
              className="h-12 w-full max-w-none"
            />

            <div>
              <p className="text-[12px] text-[#5E637A] mb-1.5">
                Password must be at least 7 characters and contain both letters
                and numbers
              </p>
              <InputField
                name={CustomerFormField.Password}
                label="Password"
                type="password"
                layout="vertical"
                disabled={isEdit}
                containerClassName="w-full"
                className="h-12 w-full max-w-none"
                placeholder="••••••••"
              />
            </div>

            <InputField
              name={CustomerFormField.ConfirmPassword}
              label="Confirm Password"
              type="password"
              layout="vertical"
              disabled={isEdit}
              containerClassName="w-full"
              className="h-12 w-full max-w-none"
              placeholder="••••••••"
            />
            <InputField
              name={CustomerFormField.ForceReset}
              Component={CheckboxField}
              layout="vertical"
              text="Request customer to set their password on next login"
            />
          </div>
        </section>

        {/* Customer details */}
        <section className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5">
          <PageTitle title="Customer details" hideActionButton />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField
              name={CustomerFormField.FirstName}
              label="First name"
              required
              layout="vertical"
              className="h-12 max-w-none w-full"
            />

            <InputField
              name={CustomerFormField.LastName}
              label="Last name"
              required
              layout="vertical"
              className="h-12 max-w-none w-full"
            />

            <InputField
              name={CustomerFormField.Phone}
              label="Phone number"
              layout="vertical"
              className="h-12 max-w-none w-full"
            />

            <InputField
              name={CustomerFormField.CompanyName}
              label="Company name"
              layout="vertical"
              className="h-14 max-w-none w-full"
            />

            <div className="md:col-span-2">
              <InputField
                name={CustomerFormField.TaxCode}
                label="Tax exempt code"
                layout="vertical"
                className="h-12 max-w-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <InputField
              name={CustomerFormField.AcsEmail}
              Component={CheckboxField}
              layout="vertical"
              text="Consent to receive transactional and news/lifestyle emails"
            />
          </div>
        </section>

        {/* Address book */}
        {isEdit && (
          <section className="bg-white border border-[#e5e7eb] rounded-md p-6 mb-5">
            <div className="flex items-center justify-between mb-6">
              <PageTitle title="Address book" hideActionButton />
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1.5 h-9 px-4 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#eef3ff]"
                onClick={() => router.push(CUSTOMER_ROUTES.ADD_ADDRESS(id))}
              >
                <Plus size={14} />
                Add address
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              {selectedIds?.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 px-3 border border-[#4361ee] text-[#4361ee] text-[13px] rounded-sm hover:bg-[#eef3ff]"
                  onClick={handleBulkDelete}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              )}
              <span className="text-[13px] text-[#555]">
                {selectedIds?.length > 0
                  ? `${selectedIds?.length}/${customerAddresses.length} address`
                  : `${customerAddresses?.length} address`}
              </span>
            </div>

            <div className="bg-white shadow-md rounded-sm">
              <Table
                bare
                data={customerAddresses}
                columns={columns}
                getRowId={(address) => address?.id}
                loading={addressesLoading}
                emptyMessage="No addresses found."
                selectAllInHeader
                hideRecordCount
                selectedIds={selectedIds}
                onToggleRow={(addressId: any) => toggleSelect(addressId)}
                onToggleAll={toggleSelectAll}
                rowActions={getRowActions}
              />
            </div>
          </section>
        )}
      </Form>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete address?"
        description={`Are you sure you want to delete ${deleteAddressIds.length} address${deleteAddressIds.length > 1 ? "es" : ""}?`}
        onConfirm={confirmDeleteAddresses}
      />
      <Alert />
    </PageLayout>
  );
}
