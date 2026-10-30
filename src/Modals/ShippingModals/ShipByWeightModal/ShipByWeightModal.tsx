"use client";

import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import PriceField from "@/components/form/PriceField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/components/Modal/ModalContainer";
import { Label } from "@/components/ui/label";
import { SETTINGS_TAB } from "../constant";
import {
  chargeShippingOptions,
  LABEL_CLASS,
  RANGE_FIELD_LABELS,
  RateSymbol,
  rateSymbolOptions,
  ShipByWeightField,
} from "./constant";
import RangeRowFields from "./RangeRowFields";
import useShipByWeightModalContainer from "./ShipByWeightModalContainer";
import { ShipByWeightModalProps } from "./type";

const ShipByWeightModal = ({
  trigger,
  methodId,
  onSaved,
}: ShipByWeightModalProps) => {
  const { open, modalProps } = useModal();
  const {
    form,
    rangeFields,
    isPercentageCost,
    addRange,
    removeRange,
    loading,
    error,
    onSubmit,
  } = useShipByWeightModalContainer({ open, methodId, onSaved });

  // The form lives in the "Settings" tab's content
  const settingsPanel = (
    <>
      <InputField
        control={form.control}
        name={ShipByWeightField.DisplayName}
        label="Display name"
        required
        layout="vertical"
        labelClassName={LABEL_CLASS}
        placeholder="Flat Rate for under 10 LBS*"
        className="h-15 max-w-[470px]"
      />

      <InputField
        control={form.control}
        name={ShipByWeightField.ChargeShipping}
        label="Charge shipping"
        Component={SelectField}
        options={chargeShippingOptions}
        placeholder="Select"
        layout="vertical"
        labelClassName={LABEL_CLASS}
        className="!h-16 w-full sm:w-[280px]"
      />

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        {isPercentageCost ? (
          <InputField
            control={form.control}
            name={ShipByWeightField.DefaultShippingCost}
            label="Default shipping cost (optional)"
            layout="vertical"
            containerClassName="flex-1"
            labelClassName={LABEL_CLASS}
            endIcon={RateSymbol.Percentage}
          />
        ) : (
          <PriceField
            control={form.control}
            name={ShipByWeightField.DefaultShippingCost}
            label="Default shipping cost (optional)"
            layout="vertical"
            containerClassName="flex-1"
            labelClassName={LABEL_CLASS}
          />
        )}
        <InputField
          control={form.control}
          name={ShipByWeightField.RateSymbol}
          label="Type"
          Component={SelectField}
          options={rateSymbolOptions}
          placeholder="Select"
          layout="vertical"
          containerClassName="w-full sm:w-[220px]"
          labelClassName={LABEL_CLASS}
          className="w-full"
        />
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-9 !text-[20px] !font-semibold text-text-heading">
          Ranges
        </h3>

        <div className="mb-2 flex gap-4">
          <Label className={`flex-1 ${LABEL_CLASS}`}>
            {RANGE_FIELD_LABELS.from}
          </Label>
          <Label className={`flex-1 ${LABEL_CLASS}`}>
            {RANGE_FIELD_LABELS.upTo}
          </Label>
          <Label className={`flex-1 ${LABEL_CLASS}`}>
            {RANGE_FIELD_LABELS.cost}
          </Label>
          <div className="w-[44px]" />
        </div>

        <ListRenderer
          data={rangeFields}
          keyExtractor={(field) => field.id}
          renderItem={(_, index) => (
            <RangeRowFields
              index={index}
              isLast={index === rangeFields.length - 1}
              isPercentageCost={isPercentageCost}
              onAdd={addRange}
              onRemove={() => removeRange(index)}
            />
          )}
        />
      </div>
    </>
  );

  return (
    <Modal
      {...modalProps}
      trigger={trigger}
      title="Ship by weight or order total options"
      titleClassName="!text-[20px]"
      tabs={[{ ...SETTINGS_TAB, content: settingsPanel }]}
      size="xl"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText="Submit"
      loadingText="Saving…"
      contentLoading={loading}
      error={error}
    />
  );
};

export default ShipByWeightModal;
