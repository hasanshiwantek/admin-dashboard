"use client";

import { useModal } from "@/components/Modal/ModalContainer";
import Table from "@/components/ui/Table/Table";
import ProductEditSheet from "../ProductEditSheet";
import { stockColumns } from "./columns";
import useEditProductStockContainer from "./EditProductStockSheetContainer";
import { EditProductStockSheetProps } from "./type";

const EditProductStockSheet = ({
  product,
  trigger,
  onSaved,
}: EditProductStockSheetProps) => {
  const { open, modalProps } = useModal();
  const { form, onSubmit } = useEditProductStockContainer({
    open,
    product,
    onSaved,
  });

  return (
    <ProductEditSheet
      {...modalProps}
      title="Edit inventory"
      trigger={trigger}
      form={form}
      onSubmit={onSubmit}
    >
      <Table
        data={[product]}
        columns={stockColumns}
        getRowId={(row) => row.id}
        selectable={false}
        hideRecordCount
        bare
        className="min-w-[90rem]"
      />
    </ProductEditSheet>
  );
};

export default EditProductStockSheet;
