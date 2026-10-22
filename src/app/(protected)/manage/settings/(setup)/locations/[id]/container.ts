import {
  getFirstSectionWithErrors,
  getNavSections,
} from "@/components/SectionNav/utils";
import { ActionEnums } from "@/const/appConstants";
import useActiveSection from "@/hooks/useActiveSection";
import { LocationSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import {
  DEFAULT_COUNTRY,
  defaultLocations,
  DUPLICATE_LOCATION_PARAM,
  duplicateLocationRoute,
  locationDefaults,
  LocationFormNames,
  locationSections,
  LOCATIONS_ROUTE,
  NEW_LOCATION_ID,
  newSpecialHour,
} from "../constant";
import { Location, LocationFormValues } from "../type";
import {
  getLocationActions,
  toDateInputValue,
  transformGetLocation,
  transformPostLocation,
} from "../utils";
import { getSpecialHourColumns, openingHourColumns } from "./columns";

const SECTION_IDS = locationSections.map(({ id }) => id);

const useLocationFormPageContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: idParam } = useParams<{ id: string }>();

  const isEdit = idParam !== NEW_LOCATION_ID;
  const id = isEdit ? Number(idParam) : null;
  const duplicateId = Number(searchParams.get(DUPLICATE_LOCATION_PARAM)) || null;

  // Placeholder lookup until the locations API is available
  const record =
    defaultLocations.find((location) => location.id === (id ?? duplicateId)) ??
    null;
  if (isEdit && !record) notFound();

  const [isEnabled, setIsEnabled] = useState(record?.isEnabled ?? true);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const form = useForm<LocationFormValues>({
    resolver: yupResolver(LocationSchema),
    defaultValues: locationDefaults,
  });
  const { control, reset, setValue } = form;

  useEffect(() => {
    if (record) reset(transformGetLocation(record, { duplicate: !isEdit }));
  }, [record, isEdit, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: LocationFormNames.SpecialHours,
  });
  const country = useWatch({ control, name: LocationFormNames.Country });
  const openingHours = useWatch({
    control,
    name: LocationFormNames.OpeningHours,
  });
  const specialHours = useWatch({
    control,
    name: LocationFormNames.SpecialHours,
  });
  const { errors } = useFormState({ control });

  const { activeSection, scrollToSection } = useActiveSection(SECTION_IDS);
  const navSections = getNavSections(locationSections, errors);

  const specialHourRows = fields.map((field, index) => ({
    ...field,
    ...specialHours?.[index],
    id: field.id,
  }));

  const handleCountryChange = () => setValue(LocationFormNames.State, "");

  const handleAddSpecialHour = () =>
    append(newSpecialHour(toDateInputValue(new Date())));

  const handleLocationAction =
    (location: Location) => (action: ActionEnums) => {
      switch (action) {
        case ActionEnums.DUPLICATE:
          return router.push(duplicateLocationRoute(location.id));
        case ActionEnums.ENABLE:
          return setIsEnabled(true);
        case ActionEnums.DISABLE:
          return setIsEnabled(false);
        case ActionEnums.DELETE:
          return setDeleteOpen(true);
      }
    };

  const onSubmit = (values: LocationFormValues) =>
    transformPostLocation(values, isEnabled);

  const onInvalid = (formErrors: FieldErrors<LocationFormValues>) => {
    const section = getFirstSectionWithErrors(locationSections, formErrors);
    if (section) scrollToSection(section.id);
  };

  return {
    form,
    isEdit,
    record,
    isEnabled,
    title: isEdit && record ? `Edit ${record.name}` : "Add location",
    navSections,
    activeSection,
    isUnitedStates: country === DEFAULT_COUNTRY,
    openingHours: openingHours ?? [],
    openingHourColumns,
    specialHourRows,
    specialHourColumns: getSpecialHourColumns({ onRemove: remove }),
    scrollToSection,
    handleCountryChange,
    handleAddSpecialHour,
    locationActions: getLocationActions(isEnabled),
    handleLocationAction,
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => router.push(LOCATIONS_ROUTE),
    handleCancel: () => router.push(LOCATIONS_ROUTE),
    onSubmit,
    onInvalid,
  };
};

export default useLocationFormPageContainer;
