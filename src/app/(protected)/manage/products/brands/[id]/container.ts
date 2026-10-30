import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { addBrand, getBrandById, updateBrand } from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { BrandSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BRANDS_ROUTE, NEW_BRAND_ID } from "../constant";
import type { Brand } from "../type";
import { brandDefaults } from "./constant";
import type { BrandFormValues } from "./type";
import { transformGetBrand, transformPostBrand } from "./utils";

const useBrandFormPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: idParam } = useParams<{ id: string }>();
  const isEdit = idParam !== NEW_BRAND_ID;
  const id = isEdit ? Number(idParam) : null;
  if (isEdit && !id) notFound();

  const { selectedBrand, selectedBrandLoading } = useAppSelector(
    (state) => state.product,
  ) as { selectedBrand: Brand | null; selectedBrandLoading: boolean };

  const form = useForm<BrandFormValues>({
    resolver: yupResolver(BrandSchema),
    defaultValues: brandDefaults,
  });
  const { reset, formState } = form;

  useEffect(() => {
    if (id) dispatch(getBrandById(id));
  }, [dispatch, id]);

  // Ignore a brand left in the store from a previously opened page
  const record = id && selectedBrand?.id === id ? selectedBrand : null;

  useEffect(() => {
    if (record) reset(transformGetBrand(record));
  }, [record, reset]);

  const onSubmit = async (values: BrandFormValues) => {
    const data = transformPostBrand(values, isEdit);
    const result = id
      ? await dispatch(updateBrand({ id, formData: data }))
      : await dispatch(addBrand(data));

    if (
      updateBrand.rejected.match(result) ||
      addBrand.rejected.match(result)
    ) {
      errorMessage(result.payload as string);
      return;
    }
    successMessage(isEdit ? "Brand updated" : "Brands added");
    router.push(BRANDS_ROUTE);
  };

  return {
    form,
    isEdit,
    loading: isEdit && selectedBrandLoading && !record,
    saving: formState.isSubmitting,
    onSubmit,
    handleCancel: () => router.push(BRANDS_ROUTE),
  };
};

export default useBrandFormPageContainer;
