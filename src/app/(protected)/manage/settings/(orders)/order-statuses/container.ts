import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchOrderStatuses,
  updateOrderStatuses,
} from "@/redux/slices/orderSettingsSlice";
import { RowAction } from "@/components/ui/Table/types";
import { OrderStatusesSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getOrderStatusColumns } from "./columns";
import {
  orderStatusesDefaults,
  OrderStatusesFormNames,
  RESTORE_DEFAULT_LABEL,
} from "./constant";
import { OrderStatusesFormValues, OrderStatusRow } from "./type";
import {
  restoreStatusName,
  toOrderStatusesFormValues,
  transformGetOrderStatuses,
  transformPostOrderStatuses,
} from "./utils";

const useOrderStatusesContainer = () => {
  const dispatch = useAppDispatch();

  const { orderStatuses, statusesLoading, statusesSaving } = useAppSelector(
    (state) => state.orderSettings,
  );

  const [isEditing, setIsEditing] = useState(false);

  const rows = useMemo(
    () => transformGetOrderStatuses(orderStatuses),
    [orderStatuses],
  );

  const form = useForm<OrderStatusesFormValues>({
    resolver: yupResolver(OrderStatusesSchema),
    defaultValues: orderStatusesDefaults,
    mode: "all",
  });
  const {
    reset,
    setValue,
    getValues,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    dispatch(fetchOrderStatuses());
  }, [dispatch]);

  useEffect(() => {
    reset(toOrderStatusesFormValues(rows));
  }, [rows, reset]);

  // Drop unsaved edits and go back to the read-only table
  const handleCancel = () => {
    reset(toOrderStatusesFormValues(rows));
    setIsEditing(false);
  };

  const handleRestoreDefault = (status: OrderStatusRow) => {
    setValue(
      OrderStatusesFormNames.Statuses,
      restoreStatusName(getValues(OrderStatusesFormNames.Statuses), status),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const rowActions = (): RowAction<OrderStatusRow>[] => [
    { label: RESTORE_DEFAULT_LABEL, onClick: handleRestoreDefault },
  ];

  const onSubmit = async (values: OrderStatusesFormValues) => {
    const result = await dispatch(
      updateOrderStatuses(transformPostOrderStatuses(values)),
    );
    if (updateOrderStatuses.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Order statuses saved");
    setIsEditing(false);
  };

  return {
    form,
    rows,
    columns: getOrderStatusColumns({ isEditing }),
    rowActions: isEditing ? rowActions : undefined,
    isEditing,
    isDirty,
    loading: statusesLoading,
    saving: statusesSaving,
    onSubmit,
    handleEdit: () => setIsEditing(true),
    handleCancel,
  };
};

export default useOrderStatusesContainer;
