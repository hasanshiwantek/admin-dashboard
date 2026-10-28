"use client";

import { useModal } from "@/components/Modal/ModalContainer";
import Table from "@/components/ui/Table/Table";
import ProductEditSheet from "../ProductEditSheet";
import useEditProductPricesContainer from "./EditProductPricesSheetContainer";
import { EditProductPricesSheetProps } from "./type";

const EditProductPricesSheet = ({
  product,
  currency,
  trigger,
  onSaved,
}: EditProductPricesSheetProps) => {
  const { open, modalProps } = useModal();
  const { form, columns, onSubmit } = useEditProductPricesContainer({
    open,
    product,
    currency,
    onSaved,
  });

  return (
    <ProductEditSheet
      {...modalProps}
      title="Edit prices"
      trigger={trigger}
      form={form}
      onSubmit={onSubmit}
    >
      <Table
        data={[product]}
        columns={columns}
        getRowId={(row) => row.id}
        selectable={false}
        hideRecordCount
        bare
        className="min-w-[90rem]"
      />
    </ProductEditSheet>
  );
};

export default EditProductPricesSheet;
