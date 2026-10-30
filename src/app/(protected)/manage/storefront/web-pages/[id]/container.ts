"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createWebpage,
  getWebPageById,
  getWebPages,
  updateWebPage,
} from "@/redux/slices/storefrontSlice";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import { DefaultWebPageValues, LIST_PATH, WebPageField } from "./constants";
import { WebPageSchema } from "@/validations/formValidations";
import type { WebPageFormValues } from "./types";
import { generatePageUrl } from "./utils";

const useWebPageContainer = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const isEdit = !!id && id !== "add";

  const router = useRouter();
  const dispatch = useAppDispatch();

  const webPages = useAppSelector((s: any) => s.storefront.webPages) ?? [];
  const urlSettingData = useAppSelector((s: any) => s.home?.urlSettingData);

  const form = useForm<WebPageFormValues>({
    resolver: yupResolver(WebPageSchema),
    defaultValues: DefaultWebPageValues,
  });

  const { control, reset, setValue, watch } = form;
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState(false);
  const submitActionRef = useRef<"exit" | "keepEditing" | "addAnother">("exit");

  const pageType = useWatch({ control, name: WebPageField.PageType });
  const watchedName = useWatch({ control, name: WebPageField.PageName });
  const showTheseFields =
    useWatch({ control, name: WebPageField.ShowTheseFields }) ?? [];

  useEffect(() => {
    if (!isEdit || !id) return;
    dispatch(getWebPageById({ id }))
      .unwrap()
      .then((res) => reset(res?.data ?? res))
      .catch(console.error);
  }, [id, isEdit, dispatch, reset]);

  useEffect(() => {
    if (isUrlManuallyEdited || !watchedName) return;
    const url = generatePageUrl(watchedName, urlSettingData);
    if (url) setValue(WebPageField.PageUrl, url);
  }, [watchedName, isUrlManuallyEdited, urlSettingData, setValue]);

  useEffect(() => {
    dispatch(getWebPages());
    dispatch(fetchUrlSettings("webpage"));
  }, [dispatch]);

  useEffect(() => {
    if (id) setIsUrlManuallyEdited(true);
  }, [id]);

  const onSubmit = async (values: WebPageFormValues) => {
    try {
      const result = isEdit
        ? await dispatch(updateWebPage({ id, data: values }))
        : await dispatch(createWebpage({ data: values }));

      if ((isEdit ? updateWebPage : createWebpage).fulfilled.match(result)) {
        dispatch(getWebPages());

        if (submitActionRef.current === "keepEditing" && isEdit) {
          const refreshed = await dispatch(getWebPageById({ id }));
          if (getWebPageById.fulfilled.match(refreshed)) {
            reset(refreshed.payload.data);
          }
        } else if (submitActionRef.current === "addAnother") {
          reset(DefaultWebPageValues);
          setIsUrlManuallyEdited(false);
        } else {
          router.push(LIST_PATH);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleContactField = (fieldId: string) => {
    const current = showTheseFields;
    const updated = current.includes(fieldId)
      ? current.filter((f: any) => f !== fieldId)
      : [...current, fieldId];
    setValue(WebPageField.ShowTheseFields, updated, { shouldDirty: true });
  };

  const handleResetUrl = () => {
    setIsUrlManuallyEdited(false);
    const url = generatePageUrl(watchedName, urlSettingData);
    if (url) setValue(WebPageField.PageUrl, url);
  };

  const setSubmitAction = (action: "exit" | "keepEditing" | "addAnother") => {
    submitActionRef.current = action;
  };
  const handleCancel = () => {
    router.push(LIST_PATH);
  };
  return {
    form,
    isEdit,
    id,
    control,
    pageType,
    watchedName,
    showTheseFields,
    webPages,
    isUrlManuallyEdited,
    setIsUrlManuallyEdited,
    onSubmit,
    toggleContactField,
    handleResetUrl,
    setSubmitAction,
    watch,
    setValue,
    handleCancel,
  };
};

export default useWebPageContainer;
