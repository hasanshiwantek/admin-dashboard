import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createStoreSettings,
  fetchStoreSettings,
  urlSettings,
} from "@/redux/slices/homeSlice";
import { generalSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  GeneralTab,
  generalSettingsDefaults,
  SETTINGS_ROUTE,
} from "../constant";
import { GeneralSettingsFormValues } from "../type";
import {
  getTabForErrors,
  isGeneralTab,
  transformGetGeneralSettings,
  transformPostGeneralSettings,
  transformPostUrlSettings,
} from "../utils";

const useGeneralSettingsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tab } = useParams<{ tab: string }>();
  const isValidTab = isGeneralTab(tab);

  const { storeSettings, settingsLoader } = useAppSelector(
    (state) => state.home,
  );

  const [activeTab, setActiveTabState] = useState<GeneralTab>(
    isValidTab ? tab : GeneralTab.Website,
  );

  const form = useForm<GeneralSettingsFormValues>({
    resolver: yupResolver(generalSettingsSchema),
    defaultValues: generalSettingsDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    dispatch(fetchStoreSettings());
  }, [dispatch]);

  // Prefill once saved settings arrive (the store starts as an empty array)
  useEffect(() => {
    const loaded = Array.isArray(storeSettings)
      ? storeSettings.length > 0
      : !!storeSettings;
    if (loaded) reset(transformGetGeneralSettings(storeSettings));
  }, [storeSettings, reset]);

  // Switching tabs updates the URL in place. A router navigation would
  // remount the page and drop unsaved edits on the other tabs.
  const setActiveTab = (key: string) => {
    if (!isGeneralTab(key)) return;
    setActiveTabState(key);
    window.history.replaceState(null, "", `${SETTINGS_ROUTE}/${key}`);
  };

  const onSubmit = async (values: GeneralSettingsFormValues) => {
    const result = await dispatch(
      createStoreSettings({ data: transformPostGeneralSettings(values) }),
    );
    if (createStoreSettings.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to save settings");
      return;
    }

    try {
      // Each URL type (product / category / web page) is saved separately
      await Promise.all(
        transformPostUrlSettings(values).map(({ section, data }) =>
          dispatch(urlSettings({ data, sectionName: section })).unwrap(),
        ),
      );
      toast.success("Settings saved");
    } catch {
      toast.error("Settings saved, but URL settings failed to update");
    }
  };

  // Hidden tabs can't show their errors, so jump to the first one with errors
  const onInvalid = (errors: FieldErrors<GeneralSettingsFormValues>) => {
    const errorTab = getTabForErrors(errors);
    if (errorTab) setActiveTab(errorTab);
  };

  return {
    isValidTab,
    form,
    activeTab,
    setActiveTab,
    loading: settingsLoader,
    onSubmit,
    onInvalid,
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useGeneralSettingsContainer;
