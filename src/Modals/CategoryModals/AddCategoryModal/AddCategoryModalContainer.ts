import { editCategoryRoute } from "@/app/(protected)/manage/products/categories/constant";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { addCategory } from "@/redux/slices/categorySlice";
import { errorMessage, successMessage } from "@/utils/message";
import { getSelectedStore } from "@/utils/storage";
import { AddCategorySchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCategoryDefaults, AddCategoryFormNames } from "./constant";
import type { AddCategoryFormValues, AddCategoryModalProps } from "./type";
import { getCreatedCategoryId, transformPostAddCategory } from "./utils";

const useAddCategoryContainer = ({
  open,
  onSaved,
}: Pick<AddCategoryModalProps, "onSaved"> & { open: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [storeName, setStoreName] = useState("");

  const form = useForm<AddCategoryFormValues>({
    resolver: yupResolver(AddCategorySchema),
    defaultValues: addCategoryDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (!open) return;
    const name = getSelectedStore()?.name ?? "";
    setStoreName(name);
    reset({ ...addCategoryDefaults, [AddCategoryFormNames.Channel]: name });
  }, [open, reset]);

  const onSubmit = async (values: AddCategoryFormValues) => {
    const result = await dispatch(
      addCategory({ data: transformPostAddCategory(values) }),
    );
    if (addCategory.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage("Category created");
    onSaved?.();
    const id = getCreatedCategoryId(result.payload);
    if (id) router.push(editCategoryRoute(id));
  };

  return {
    form,
    channelOptions: storeName ? [{ value: storeName, label: storeName }] : [],
    onSubmit,
  };
};

export default useAddCategoryContainer;
