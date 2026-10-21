import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createGiftWrapping,
  fetchGiftWrappingById,
  updateGiftWrapping,
} from "@/redux/slices/productSettingsSlice";
import { GiftWrappingSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  GIFT_WRAPPING_ROUTE,
  giftWrappingDefaults,
  NEW_GIFT_WRAPPING_ID,
} from "../constant";
import { GiftWrappingFormValues } from "../type";
import { transformGetGiftWrapping, transformPostGiftWrapping } from "../utils";

const useGiftWrappingFormContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: idParam } = useParams<{ id: string }>();
  const isEdit = idParam !== NEW_GIFT_WRAPPING_ID;
  const id = isEdit ? Number(idParam) : null;

  const { selectedGiftWrapping, giftWrappingLoading, giftWrappingSaving } =
    useAppSelector((state) => state.productSettings);

  const form = useForm<GiftWrappingFormValues>({
    resolver: yupResolver(GiftWrappingSchema),
    defaultValues: giftWrappingDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (id) dispatch(fetchGiftWrappingById(id));
  }, [dispatch, id]);

  // Ignore an option left in the store from a previously opened page
  const giftWrapping =
    id && selectedGiftWrapping?.id === id ? selectedGiftWrapping : null;

  useEffect(() => {
    if (giftWrapping) reset(transformGetGiftWrapping(giftWrapping));
  }, [giftWrapping, reset]);

  const onSubmit = async (values: GiftWrappingFormValues) => {
    const data = transformPostGiftWrapping(values);
    const result = id
      ? await dispatch(updateGiftWrapping({ id, data }))
      : await dispatch(createGiftWrapping(data));

    if (
      updateGiftWrapping.rejected.match(result) ||
      createGiftWrapping.rejected.match(result)
    ) {
      toast.error(result.payload as string);
      return;
    }
    toast.success(
      isEdit ? "Gift wrapping option updated" : "Gift wrapping option added",
    );
    router.push(GIFT_WRAPPING_ROUTE);
  };

  return {
    form,
    isEdit,
    loading: isEdit && giftWrappingLoading && !giftWrapping,
    saving: giftWrappingSaving,
    onSubmit,
    handleCancel: () => router.push(GIFT_WRAPPING_ROUTE),
  };
};

export default useGiftWrappingFormContainer;
