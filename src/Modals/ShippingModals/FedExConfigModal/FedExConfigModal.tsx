"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import CheckboxField from "@/components/form/fields/CheckboxField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import { countriesList, statesList } from "@/const/location";
import { ReactNode } from "react";
import {
  fedexDestinationTypeSelect,
  FedExField,
  fedexQuoteUnitFields,
  fedexSettingsSelects,
  FedExTab,
  fedexTabs,
} from "./constant";
import DeliveryServicesField from "./DeliveryServicesField";
import useFedExConfigModalContainer from "./FedExConfigModalContainer";
import { FedExConfigModalProps, FedExSelectFieldConfig } from "./type";
import UnitInput from "./UnitInput";

const FedExConfigModal = ({
  trigger,
  methodId,
  onSaved,
}: FedExConfigModalProps) => {
  const { open, modalProps } = useModal();
  const {
    form,
    activeTab,
    setActiveTab,
    configLoading,
    saving,
    isConnected,
    serviceList,
    onSubmit,
    onInvalid,
    handleDisconnect,
  } = useFedExConfigModalContainer({ open, methodId, onSaved });

  const fieldProps = { control: form.control, layout: "vertical" as const };

  const renderSelect = (field: FedExSelectFieldConfig) => (
    <InputField
      {...fieldProps}
      name={field.name}
      label={field.label}
      Component={SelectField}
      options={field.options}
    />
  );

  // One panel per tab; Modal renders the active tab's `content` in the body
  const tabPanels: Record<FedExTab, ReactNode> = {
    [FedExTab.Settings]: (
      <>
        <InputField
          {...fieldProps}
          name={FedExField.DisplayName}
          label="Display Name"
          required
          className="max-w-full"
        />

        <ListRenderer
          data={fedexSettingsSelects}
          keyExtractor={(field) => field.name}
          className="space-y-6!"
          renderItem={renderSelect}
        />

        <InputField
          {...fieldProps}
          name={FedExField.IncludePackageValue}
          Component={CheckboxField}
          text="Include Package Value"
        />

        {renderSelect(fedexDestinationTypeSelect)}

        <InputField
          {...fieldProps}
          name={FedExField.DeliveryServices}
          label="Delivery services"
          Component={DeliveryServicesField}
          services={serviceList}
          containerClassName="pt-4"
        />
      </>
    ),
    [FedExTab.Connection]: (
      <>
        <InputField
          {...fieldProps}
          name={FedExField.Key}
          label="Key"
          required
        />
        <InputField
          {...fieldProps}
          name={FedExField.Password}
          label="Password"
          type="password"
        />
        <InputField
          {...fieldProps}
          name={FedExField.AccountNumber}
          label="Account Number"
          required
        />
        <InputField
          {...fieldProps}
          name={FedExField.ApiBaseUrl}
          label="API Base URL"
          required
        />

        {isConnected && (
          <Button
            type="button"
            variant="outline"
            className="w-fit border-red-300 text-red-500 hover:bg-red-50"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        )}
      </>
    ),
    [FedExTab.Quote]: (
      <>
        <InputField
          {...fieldProps}
          name={FedExField.DestCountry}
          label="Destination country"
          Component={SelectField}
          options={countriesList}
          className="max-w-full"
        />
        <InputField
          {...fieldProps}
          name={FedExField.DestState}
          label="Destination state"
          Component={SelectField}
          options={statesList}
          className="max-w-full"
        />
        <InputField
          {...fieldProps}
          name={FedExField.DestZip}
          label="Destination Zip/Postcode"
          className="max-w-full"
        />
        <InputField
          {...fieldProps}
          name={FedExField.PkgWeight}
          label="Package weight"
          type="number"
          className="max-w-full"
        />

        <ListRenderer
          data={fedexQuoteUnitFields}
          keyExtractor={(field) => field.name}
          className="space-y-6!"
          renderItem={(field) => (
            <InputField
              {...fieldProps}
              name={field.name}
              label={field.label}
              Component={UnitInput}
              unit={field.unit}
              unitPosition={field.unitPosition}
            />
          )}
        />

        <Button type="button" variant="outline" className="w-fit">
          Get quote
        </Button>
      </>
    ),
  };

  const tabs = fedexTabs.map((tab) => ({
    ...tab,
    content: tabPanels[tab.key],
  }));

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Configure FedEx in United States"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      size="md"
      isForm
      form={form}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
      saveText="Submit"
      loading={saving}
      contentLoading={configLoading}
      footerClassName="sticky bottom-0 bg-gray-50"
    />
  );
};

export default FedExConfigModal;
