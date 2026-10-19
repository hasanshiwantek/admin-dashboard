import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAddress, saveAddress } from "@/redux/slices/shippingSlice";
import { shippingAddressSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { shippingAddressDefaults } from "./constant";
import { ShippingAddressFormValues } from "./type";
import { transformGetShippingAddress } from "./utils";

const useConfigureShippingAddressContainer = ({
  open,
  onSaved,
}: {
  open: boolean;
  onSaved?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { loading, sourceAddress } = useAppSelector(
    (state) => state.shippingZone,
  );

  const form = useForm<ShippingAddressFormValues>({
    resolver: yupResolver(shippingAddressSchema),
    defaultValues: shippingAddressDefaults,
  });
  const { reset } = form;

  // Start from the saved address every time the modal opens
  useEffect(() => {
    if (open) reset(transformGetShippingAddress(sourceAddress));
  }, [open, sourceAddress, reset]);

  const onSubmit = async (data: ShippingAddressFormValues) => {
    await dispatch(saveAddress({ data }));
    await dispatch(fetchAddress());
    onSaved?.();
  };

  return { form, loading, onSubmit };
};

export default useConfigureShippingAddressContainer;
