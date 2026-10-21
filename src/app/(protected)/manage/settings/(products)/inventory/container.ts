import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchInventorySettings,
  updateInventorySettings,
} from "@/redux/slices/productSettingsSlice";
import { InventorySettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { SETTINGS_ROUTE } from "../constant";
import { getBackorderMessageColumns } from "./columns";
import {
  InventoryFormNames,
  inventorySettingsDefaults,
  newBackorderMessage,
} from "./constant";
import { InventorySettingsFormValues } from "./type";
import {
  isOptionMarkedOutOfStock,
  isStockLevelShown,
  isStockUpdatedOnCompletion,
  setDefaultMessage,
  transformGetInventorySettings,
  transformPostInventorySettings,
} from "./utils";

const useInventorySettingsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { inventorySettings, inventoryLoading, inventorySaving } =
    useAppSelector((state) => state.productSettings);

  const form = useForm<InventorySettingsFormValues>({
    resolver: yupResolver(InventorySettingsSchema),
    defaultValues: inventorySettingsDefaults,
  });
  const {
    control,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = form;

  const {
    fields: backorderMessages,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: InventoryFormNames.BackorderMessages,
    keyName: "fieldKey",
  });

  const optionUnavailableAction = useWatch({
    control,
    name: InventoryFormNames.OptionUnavailableAction,
  });
  const updateStockLevels = useWatch({
    control,
    name: InventoryFormNames.UpdateStockLevels,
  });
  const stockLevelDisplay = useWatch({
    control,
    name: InventoryFormNames.StockLevelDisplay,
  });

  useEffect(() => {
    dispatch(fetchInventorySettings());
  }, [dispatch]);

  useEffect(() => {
    if (inventorySettings)
      reset(transformGetInventorySettings(inventorySettings));
  }, [inventorySettings, reset]);

  const handleSetDefaultMessage = (index: number) =>
    replace(
      setDefaultMessage(getValues(InventoryFormNames.BackorderMessages), index),
    );

  const onSubmit = async (values: InventorySettingsFormValues) => {
    const result = await dispatch(
      updateInventorySettings(transformPostInventorySettings(values)),
    );
    if (updateInventorySettings.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Inventory settings saved");
  };

  return {
    form,
    backorderMessages,
    backorderMessageColumns: getBackorderMessageColumns({
      onSetDefault: handleSetDefaultMessage,
      onRemove: remove,
    }),
    hasMessageErrors: !!errors[InventoryFormNames.BackorderMessages],
    showHideInFiltering: isOptionMarkedOutOfStock(optionUnavailableAction),
    showBackorderNotice: isStockUpdatedOnCompletion(updateStockLevels),
    showPreOrderInventory: isStockLevelShown(stockLevelDisplay),
    isDirty,
    loading: inventoryLoading,
    saving: inventorySaving,
    onSubmit,
    handleAddMessage: () => append(newBackorderMessage),
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useInventorySettingsContainer;
