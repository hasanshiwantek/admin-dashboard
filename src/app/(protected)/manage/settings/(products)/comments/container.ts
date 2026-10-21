import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchCommentSettings,
  updateCommentSettings,
} from "@/redux/slices/productSettingsSlice";
import { CommentSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { SETTINGS_ROUTE } from "../constant";
import {
  CommentSettingsFormNames,
  commentSettingsDefaults,
  CommentTab,
} from "./constant";
import { CommentSettingsFormValues } from "./type";
import {
  getVisibleTabs,
  transformGetCommentSettings,
  transformPostCommentSettings,
} from "./utils";

const useCommentSettingsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { commentSettings, commentLoading, commentSaving } = useAppSelector(
    (state) => state.productSettings,
  );

  const [selectedTab, setSelectedTab] = useState<string>(CommentTab.General);

  const form = useForm<CommentSettingsFormValues>({
    resolver: yupResolver(CommentSettingsSchema),
    defaultValues: commentSettingsDefaults,
  });
  const { control, reset } = form;

  const commentSystem = useWatch({
    control,
    name: CommentSettingsFormNames.CommentSystem,
  });
  const tabs = getVisibleTabs(commentSystem);
  const activeTab = tabs.some((tab) => tab.key === selectedTab)
    ? selectedTab
    : CommentTab.General;

  useEffect(() => {
    dispatch(fetchCommentSettings());
  }, [dispatch]);

  useEffect(() => {
    if (commentSettings)
      reset(transformGetCommentSettings(commentSettings));
  }, [commentSettings, reset]);

  const onSubmit = async (values: CommentSettingsFormValues) => {
    const result = await dispatch(
      updateCommentSettings(transformPostCommentSettings(values)),
    );
    if (updateCommentSettings.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Comment settings saved");
  };

  return {
    form,
    tabs,
    activeTab,
    setActiveTab: setSelectedTab,
    loading: commentLoading,
    saving: commentSaving,
    onSubmit,
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useCommentSettingsContainer;
