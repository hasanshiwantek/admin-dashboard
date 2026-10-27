import { useBrandNameMap } from "@/hooks/useFilterValueFormatter";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createBanner,
  getBannerById,
  updateBanner,
} from "@/redux/slices/marketingSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { BannerSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BANNERS_ROUTE, BannerLocation, NEW_BANNER_ID } from "../constant";
import { bannerDefaultValues, BannerFormNames } from "./constant";
import { BannerFormValues } from "./type";
import {
  defaultBannerDateRange,
  toBrandOptions,
  transformGetBannerPayload,
  transformPostBannerPayload,
} from "./utils";

const useBannerFormPageContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id: idParam } = useParams<{ id: string }>();
  const isEdit = idParam !== NEW_BANNER_ID;
  const id = isEdit ? Number(idParam) : null;

  const { banner, bannerLoading } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const form = useForm<BannerFormValues>({
    resolver: yupResolver(BannerSchema),
    defaultValues: bannerDefaultValues,
  });
  const { control, reset, setValue, getValues } = form;

  const locationType = useWatch({ control, name: BannerFormNames.LocationType });
  const dateType = useWatch({ control, name: BannerFormNames.DateType });

  const brandMap = useBrandNameMap(locationType === BannerLocation.Brand);
  const brandOptions = useMemo(() => toBrandOptions(brandMap), [brandMap]);

  useEffect(() => {
    if (id) dispatch(getBannerById({ id }));
  }, [dispatch, id]);

  // Ignore a banner left in the store from a previously opened page
  const data = banner?.banner ?? banner;
  const record = id && Number(data?.id) === id ? data : null;

  useEffect(() => {
    if (record) reset(transformGetBannerPayload(record));
  }, [record, reset]);

  const handleLocationTypeChange = () =>
    setValue(BannerFormNames.LocationId, null);

  const handleDateTypeChange = () => {
    if (getValues(BannerFormNames.StartDate)) return;
    const { startDate, endDate } = defaultBannerDateRange();
    setValue(BannerFormNames.StartDate, startDate);
    setValue(BannerFormNames.EndDate, endDate);
  };

  const onSubmit = async (values: BannerFormValues) => {
    const data = transformPostBannerPayload(values);
    const result = id
      ? await dispatch(updateBanner({ id, data }))
      : await dispatch(createBanner({ data }));

    if (
      updateBanner.rejected.match(result) ||
      createBanner.rejected.match(result)
    ) {
      errorMessage(
        (result.payload as string) ||
          `Failed to ${isEdit ? "update" : "create"} banner`,
      );
      return;
    }
    successMessage(isEdit ? "Banner updated" : "Banner created");
    router.push(BANNERS_ROUTE);
  };

  return {
    form,
    isEdit,
    loading: isEdit && bannerLoading && !record,
    saving: form.formState.isSubmitting,
    locationType,
    dateType,
    brandOptions,
    handleLocationTypeChange,
    handleDateTypeChange,
    onSubmit,
    handleCancel: () => router.push(BANNERS_ROUTE),
  };
};

export default useBannerFormPageContainer;
