"use client";

import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import CheckboxField from "@/components/form/fields/CheckboxField";
import DateTimeField from "@/components/form/fields/DateTimeField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useBrandNameMap } from "@/hooks/useFilterValueFormatter";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createBanner,
  getBannerById,
  updateBanner,
} from "@/redux/slices/marketingSlice";
import { bannerSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BANNER_DATE_TYPES,
  BANNER_LOCATIONS,
  BANNER_PLACEMENTS,
  BannerDateType,
  BannerField,
  BannerLocation,
  bannerDefaultValues,
} from "./constant";
import { BannerFormProps, BannerFormValues } from "./types";
import {
  defaultBannerDateRange,
  transformGetBannerPayload,
  transformPostBannerPayload,
} from "./utils";

const LIST_PATH = "/manage/marketing/banners";

const toOptions = (map: Record<string, string>) =>
  Object.entries(map)
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));

const BannerForm = ({ bannerId }: BannerFormProps) => {
  const isEdit = !!bannerId;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { banner, bannerLoading } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const form = useForm<BannerFormValues>({
    resolver: yupResolver(bannerSchema),
    defaultValues: bannerDefaultValues,
  });
  const { control, reset, setValue, watch } = form;

  const locationType = useWatch({ control, name: BannerField.LocationType });
  const dateType = useWatch({ control, name: BannerField.DateType });

  const brandMap = useBrandNameMap(locationType === BannerLocation.Brand);
  const brandOptions = useMemo(() => toOptions(brandMap), [brandMap]);

  // A picked category/brand doesn't carry over when the user switches location.
  // (Only user changes: `reset` with the loaded banner has no event type.)
  useEffect(() => {
    const { unsubscribe } = watch((values, { name, type }) => {
      if (name === BannerField.LocationType && type === "change")
        setValue(BannerField.LocationId, null);
      // Choosing "specific dates" starts from a range instead of empty selects.
      if (
        name === BannerField.DateType &&
        type === "change" &&
        !values[BannerField.StartDate]
      ) {
        const { startDate, endDate } = defaultBannerDateRange();
        setValue(BannerField.StartDate, startDate);
        setValue(BannerField.EndDate, endDate);
      }
    });
    return unsubscribe;
  }, [watch, setValue]);

  useEffect(() => {
    if (bannerId) dispatch(getBannerById({ id: bannerId }));
  }, [bannerId, dispatch]);

  useEffect(() => {
    const data = banner?.banner ?? banner;
    if (isEdit && data && String(data.id) === String(bannerId)) {
      reset(transformGetBannerPayload(data));
    }
  }, [banner, bannerId, isEdit, reset]);

  const onSubmit = async (values: BannerFormValues) => {
    const data = transformPostBannerPayload(values);
    const result = isEdit
      ? await dispatch(updateBanner({ id: bannerId, data }))
      : await dispatch(createBanner({ data }));

    if ((isEdit ? updateBanner : createBanner).rejected.match(result)) {
      toast.error(
        (result.payload as string) ||
          `Failed to ${isEdit ? "update" : "create"} banner`,
      );
      return;
    }
    router.push(LIST_PATH);
  };

  return (
    <PageLayout>
      <PageTitle
        title={isEdit ? "Edit a banner" : "Create a banner"}
        description="Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and videos."
        descriptionClassName="text-xl! 2xl:text-2xl!"
        hideActionButton
      />
      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Save",
          onCancel: () => router.push(LIST_PATH),
          loading: form.formState.isSubmitting,
          disabled: isEdit && bannerLoading,
        }}
      >
        <InputField
          name={BannerField.Title}
          label="Name"
          required
          control={control}
        />

        <InputField
          name={BannerField.Content}
          label="Content"
          required
          Component={RichTextEditor}
          control={control}
          controlClassName="max-w-5xl"
        />

        <InputField
          name={BannerField.LocationType}
          label="Location"
          required
          Component={RadioGroupField}
          control={control}
          options={BANNER_LOCATIONS}
        />

        {locationType === BannerLocation.Category && (
          <InputField
            name={BannerField.LocationId}
            label="Category"
            required
            Component={CategoryTreeSm}
            control={control}
            single
            containerClassName="max-w-5xl"
          />
        )}

        {locationType === BannerLocation.Brand && (
          <InputField
            name={BannerField.LocationId}
            label="Brand"
            required
            Component={SelectField}
            control={control}
            options={brandOptions}
            placeholder="-- Choose a brand --"
          />
        )}

        <InputField
          name={BannerField.DateType}
          label="Date range"
          Component={RadioGroupField}
          control={control}
          options={BANNER_DATE_TYPES}
        />

        {/* Sits under the "Date range" radios, indented past the radio circle. */}
        {dateType === BannerDateType.Range && (
          <div className="flex flex-col gap-3 -mt-4">
            <InputField
              name={BannerField.StartDate}
              Component={DateTimeField}
              control={control}
              label="From"
              controlClassName="pl-10"
            />
            <InputField
              name={BannerField.EndDate}
              Component={DateTimeField}
              control={control}
              label="Through"
              controlClassName="pl-10"
            />
          </div>
        )}

        <InputField
          name={BannerField.Visible}
          label="Visible"
          Component={CheckboxField}
          control={control}
          text="Yes, this banner should be visible on my web site"
        />

        <InputField
          name={BannerField.Placement}
          label="Placement"
          required
          Component={SelectField}
          control={control}
          options={BANNER_PLACEMENTS}
          placeholder="-- Choose a location --"
        />
      </Form>
    </PageLayout>
  );
};

export default BannerForm;
