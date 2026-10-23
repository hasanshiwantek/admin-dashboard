import { TaxClassesSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { TAX_ROUTE } from "../../constant";
import {
  BasicTaxTab,
  defaultTaxClasses,
  newTaxClassRow,
  TaxClassesFormNames,
  taxClassesDefaults,
} from "../constant";
import useBasicTaxShellContainer from "../sharedContainer";
import { TaxClassesFormValues } from "../type";
import { transformGetTaxClasses, transformPostTaxClasses } from "../utils";

const useTaxClassesPageContainer = () => {
  const router = useRouter();
  const shell = useBasicTaxShellContainer(BasicTaxTab.Classes);

  const form = useForm<TaxClassesFormValues>({
    resolver: yupResolver(TaxClassesSchema),
    defaultValues: taxClassesDefaults,
  });
  const { control, reset } = form;

  // Placeholder data until the tax API is available
  useEffect(() => {
    reset(transformGetTaxClasses(defaultTaxClasses));
  }, [reset]);

  const { fields, insert, remove } = useFieldArray({
    control,
    name: TaxClassesFormNames.Classes,
  });

  const onSubmit = (values: TaxClassesFormValues) =>
    transformPostTaxClasses(values);

  return {
    shell,
    form,
    rows: fields.map((field) => ({
      key: field.id,
      isDefault: field.isDefault,
      isSaved: !!field.classId,
    })),
    handleAddClass: (index: number) => insert(index + 1, newTaxClassRow),
    handleRemoveClass: remove,
    onSubmit,
    handleCancel: () => router.push(TAX_ROUTE),
  };
};

export default useTaxClassesPageContainer;
