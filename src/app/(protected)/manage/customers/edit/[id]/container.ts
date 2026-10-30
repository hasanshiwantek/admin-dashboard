"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  addCustomer,
  customerAddressesDeleteMultiple,
  fetchCustomerAddresses,
  fetchCustomerById,
  updateCustomer,
} from "@/redux/slices/customerSlice";
import { useAlert } from "@/hooks/useAlert";
import { CUSTOMER_ROUTES, customerDefaultValues } from "./constant";
import type { CustomerFormValues } from "./type";
import { mapCustomerToForm, mapFormToPayload, validatePassword } from "./utils";
import { getAddressColumns } from "./columns"; // adjust path if needed

export const useCustomerFormContainer = () => {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlert, Alert } = useAlert();
  const { customerAddresses, addressesLoading } = useAppSelector(
    (state: any) => state.customer,
  );

  const isEdit = !!id;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAddressIds, setDeleteAddressIds] = useState<number[]>([]);

  const form = useForm<CustomerFormValues>({
    defaultValues: customerDefaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;

  useEffect(() => {
    if (!isEdit || !id) return;

    dispatch(fetchCustomerById({ id })).then((res: any) => {
      const c = res.payload?.data;
      if (c) {
        reset(mapCustomerToForm(c));
      }
    });
  }, [id, isEdit, dispatch, reset]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerAddresses({ customerId: Number(id) }));
    }
  }, [id, dispatch]);

  const toggleSelect = (addressId: number) => {
    setSelectedIds((prev) =>
      prev.includes(addressId)
        ? prev.filter((item) => item !== addressId)
        : [...prev, addressId],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === customerAddresses?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(customerAddresses.map((addr: any) => addr.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteAddressIds(selectedIds);
    setShowDeleteModal(true);
  };

  const confirmDeleteAddresses = async () => {
    try {
      const result = await dispatch(
        customerAddressesDeleteMultiple({
          data: { ids: deleteAddressIds },
        }),
      );

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchCustomerAddresses({ customerId: Number(id) }));
        setSelectedIds([]);
        setDeleteAddressIds([]);
        setShowDeleteModal(false);
      } else {
        showAlert({
          title: "Address Deletion Failed",
          message: "Failed to delete addresses.",
        });
      }
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Something Went Wrong",
        message: "Something went wrong.",
      });
    }
  };

  const onSubmit = async (values: CustomerFormValues, addAnother = false) => {
    if (values.password) {
      const passwordError = validatePassword(values.password);
      if (passwordError) {
        showAlert({ title: "Invalid Password", message: passwordError });
        return;
      }
      if (values.password !== values.confirmPassword) {
        showAlert({
          title: "Password Mismatch",
          message: "Passwords do not match",
        });
        return;
      }
    }

    const payload = mapFormToPayload(values);
    const action = isEdit
      ? updateCustomer({ id, data: payload })
      : addCustomer({ data: payload });

    const result = await dispatch(action);

    if (result.meta.requestStatus === "fulfilled") {
      if (addAnother && !isEdit) {
        reset(customerDefaultValues);
      } else {
        setTimeout(() => router.push("/manage/customers/"), 700);
      }
    } else {
      showAlert({
        title: "Customer Save Failed",
        message: "Customer save failed.",
      });
    }
  };

  const columns = useMemo(() => getAddressColumns(), []);
  const getRowActions = (address: any) => [
    {
      label: "Edit",
      onClick: () => router.push(CUSTOMER_ROUTES.EDIT_ADDRESS(id, address.id)),
    },
    {
      label: "Delete",
      onClick: () => {
        setDeleteAddressIds([address.id]);
        setShowDeleteModal(true);
      },
      className: "text-red-600 focus:text-red-600",
    },
  ];
  return {
    id,
    form,
    columns,
    control,
    isEdit,
    formState,
    handleSubmit,
    onSubmit,
    router,
    Alert,
    showAlert,
    customerAddresses: customerAddresses || [],
    addressesLoading,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    showDeleteModal,
    setShowDeleteModal,
    deleteAddressIds,
    setDeleteAddressIds,
    confirmDeleteAddresses,
    getRowActions,
  };
};
