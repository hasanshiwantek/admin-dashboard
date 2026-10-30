import { ShipByWeightSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  useSaveShippingMethod,
  useShippingMethodById,
} from "../ShippingModalsContainer";
import { buildMethodPayload } from "../utils";
import {
  EMPTY_RANGE,
  RateSymbol,
  shipByWeightDefaults,
  ShipByWeightField,
} from "./constant";
import { ShipByWeightFormValues } from "./type";
import { transformGetShipByWeight, transformPostShipByWeight } from "./utils";

const useShipByWeightModalContainer = ({
  open,
  methodId,
  onSaved,
}: {
  open: boolean;
  methodId?: number | string;
  onSaved?: () => void;
}) => {
  const form = useForm<ShipByWeightFormValues>({
    resolver: yupResolver(ShipByWeightSchema),
    defaultValues: shipByWeightDefaults,
  });
  const { control, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: ShipByWeightField.Ranges,
  });
  const rateSymbol = useWatch({ control, name: ShipByWeightField.RateSymbol });

  // Fetched only while the modal is open
  const { method, loading, error, setError } = useShippingMethodById(
    open,
    methodId,
  );
  const { save } = useSaveShippingMethod(setError);

  useEffect(() => {
    if (open && method) reset(transformGetShipByWeight(method));
  }, [open, method, reset]);

  const addRange = () => append({ ...EMPTY_RANGE });

  // The last remaining row can't be removed
  const removeRange = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  // Returns false on failure so the modal stays open with the error shown
  const onSubmit = async (values: ShipByWeightFormValues) => {
    setError("");
    const saved = await save(
      methodId,
      buildMethodPayload(method, transformPostShipByWeight(values)),
    );
    if (saved) onSaved?.();
    return saved;
  };

  return {
    form,
    rangeFields: fields,
    // A percentage cost isn't a price, so it gets a "%" suffix instead
    isPercentageCost: rateSymbol === RateSymbol.Percentage,
    addRange,
    removeRange,
    loading,
    error,
    onSubmit,
  };
};

export default useShipByWeightModalContainer;
