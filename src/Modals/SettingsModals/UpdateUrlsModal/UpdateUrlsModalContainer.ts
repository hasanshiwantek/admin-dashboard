import { useAppDispatch } from "@/hooks/useReduxHooks";
import { updateExistingUrls } from "@/redux/slices/homeSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { UpdateUrlsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateUrlsDefaults } from "./constant";
import { UpdateUrlsFormValues, UpdateUrlsModalProps } from "./type";
import { transformPostUpdateUrls } from "./utils";

const useUpdateUrlsContainer = ({
  open,
  section,
}: Pick<UpdateUrlsModalProps, "section"> & { open: boolean }) => {
  const dispatch = useAppDispatch();
  const form = useForm<UpdateUrlsFormValues>({
    resolver: yupResolver(UpdateUrlsSchema),
    defaultValues: updateUrlsDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (!open) reset(updateUrlsDefaults);
  }, [open, reset]);

  // Returns false on failure so the modal stays open
  const onSubmit = async (values: UpdateUrlsFormValues) => {
    const result = await dispatch(
      updateExistingUrls({
        sectionName: section,
        data: transformPostUpdateUrls(values),
      }),
    );
    if (updateExistingUrls.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage("URLs updated");
    return true;
  };

  return { form, onSubmit };
};

export default useUpdateUrlsContainer;
