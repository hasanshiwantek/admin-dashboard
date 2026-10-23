import { TaxZoneSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { usStateOptions } from "../../../../locations/constant";
import {
  BasicTaxTab,
  basicTaxTabRoute,
  defaultTaxZones,
} from "../../constant";
import {
  DUPLICATE_TAX_ZONE_PARAM,
  TaxZoneSettingsFormNames,
  taxZoneSettingsDefaults,
  TaxZoneTab,
  taxZoneRatesRoute,
} from "../constant";
import { TaxZoneSettingsFormValues } from "../type";
import { transformGetTaxZone, transformPostTaxZone } from "../utils";
import useTaxZoneShellContainer from "../zoneShellContainer";

const ZONES_ROUTE = basicTaxTabRoute(BasicTaxTab.Zones);

const useTaxZoneSettingsPageContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shell = useTaxZoneShellContainer(TaxZoneTab.Settings);
  const { isNew, zone } = shell;

  // Add prefills from ?duplicate=<id>; edit uses the zone itself
  const duplicateId = Number(searchParams.get(DUPLICATE_TAX_ZONE_PARAM)) || null;
  const source = isNew
    ? (defaultTaxZones.find((item) => item.id === duplicateId) ?? null)
    : zone;

  const form = useForm<TaxZoneSettingsFormValues>({
    resolver: yupResolver(TaxZoneSettingsSchema),
    defaultValues: taxZoneSettingsDefaults,
  });
  const { control, reset } = form;

  useEffect(() => {
    if (source) reset(transformGetTaxZone(source, { duplicate: isNew }));
  }, [source, isNew, reset]);

  const [basedOn, appliesTo, subdivisionCountry] = useWatch({
    control,
    name: [
      TaxZoneSettingsFormNames.BasedOn,
      TaxZoneSettingsFormNames.AppliesTo,
      TaxZoneSettingsFormNames.SubdivisionCountry,
    ],
  });

  const onSubmit = (values: TaxZoneSettingsFormValues) => {
    // No tax API yet: send transformPostTaxZone(values) here. A new zone then
    // goes straight to its Tax rates tab, using the id the API returns.
    transformPostTaxZone(values);
    if (isNew) return router.push(taxZoneRatesRoute(Date.now()));
    router.push(ZONES_ROUTE);
  };

  return {
    shell,
    form,
    basedOn: basedOn ?? "",
    appliesTo: appliesTo ?? "",
    // Subdivision lists only exist for the US so far
    subdivisionOptions: subdivisionCountry === "US" ? usStateOptions : [],
    onSubmit,
    handleCancel: () => router.push(ZONES_ROUTE),
  };
};

export default useTaxZoneSettingsPageContainer;
