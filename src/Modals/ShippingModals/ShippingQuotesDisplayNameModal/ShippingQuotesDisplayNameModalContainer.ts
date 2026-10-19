import { displayNameSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useSaveShippingMethod,
  useShippingMethodById,
} from "../ShippingModalsContainer";
import { buildMethodPayload } from "../utils";
import { DisplayNameField, displayNameDefaults } from "./constant";
import { DisplayNameFormValues } from "./type";

const useShippingQuotesDisplayNameContainer = ({
  open,
  methodId,
  onSaved,
}: {
  open: boolean;
  methodId?: number | string;
  onSaved?: () => void;
}) => {
  const form = useForm<DisplayNameFormValues>({
    resolver: yupResolver(displayNameSchema),
    defaultValues: displayNameDefaults,
  });
  const { reset } = form;

  // Fetched only while the modal is open
  const { method, loading, error, setError } = useShippingMethodById(
    open,
    methodId,
  );
  const { save } = useSaveShippingMethod(setError);

  useEffect(() => {
    if (open && method) {
      reset({ [DisplayNameField.DisplayName]: method.display_name ?? "" });
    }
  }, [open, method, reset]);

  // Returns false on failure so the modal stays open with the error shown
  const onSubmit = async (values: DisplayNameFormValues) => {
    setError("");

    // Only the display name changes; everything else is sent back as fetched
    const saved = await save(
      methodId,
      buildMethodPayload(method, { display_name: values.displayName }),
    );
    if (saved) onSaved?.();
    return saved;
  };

  return { form, loading, error, onSubmit };
};

export default useShippingQuotesDisplayNameContainer;
