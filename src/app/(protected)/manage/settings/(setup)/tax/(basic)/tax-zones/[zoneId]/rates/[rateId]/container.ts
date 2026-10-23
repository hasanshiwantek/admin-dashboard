import { TaxRateSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { defaultTaxClasses } from "../../../../constant";
import {
  defaultTaxRates,
  NEW_TAX_RATE_ID,
  TaxRateFormNames,
  TaxZoneTab,
  taxZoneRatesRoute,
} from "../../../constant";
import { TaxRateFormValues } from "../../../type";
import { transformGetTaxRate, transformPostTaxRate } from "../../../utils";
import useTaxZoneShellContainer from "../../../zoneShellContainer";

const useTaxRateFormPageContainer = () => {
  const router = useRouter();
  const shell = useTaxZoneShellContainer(TaxZoneTab.Rates);
  const zoneId = shell.zoneId ?? 0;
  const { rateId: rateIdParam } = useParams<{ rateId: string }>();

  const isEdit = rateIdParam !== NEW_TAX_RATE_ID;
  const rateId = isEdit ? Number(rateIdParam) : null;

  // Placeholder lookup until the tax API is available
  const record = rateId
    ? (defaultTaxRates.find(
        (rate) => rate.id === rateId && rate.zoneId === zoneId,
      ) ?? null)
    : null;
  if (isEdit && !record) notFound();

  // Create mode starts with one empty rate per tax class
  const form = useForm<TaxRateFormValues>({
    resolver: yupResolver(TaxRateSchema),
    defaultValues: transformGetTaxRate(null, defaultTaxClasses),
  });
  const { control, reset } = form;

  useEffect(() => {
    if (record) reset(transformGetTaxRate(record, defaultTaxClasses));
  }, [record, reset]);

  const { fields } = useFieldArray({
    control,
    name: TaxRateFormNames.ClassRates,
  });

  const ratesRoute = taxZoneRatesRoute(zoneId);

  const onSubmit = (values: TaxRateFormValues) => {
    // No tax API yet: send transformPostTaxRate(values, zoneId) here
    transformPostTaxRate(values, zoneId);
    router.push(ratesRoute);
  };

  return {
    shell,
    form,
    isEdit,
    classRates: fields.map((field) => ({
      key: field.id,
      className: field.className,
    })),
    onSubmit,
    handleCancel: () => router.push(ratesRoute),
  };
};

export default useTaxRateFormPageContainer;
