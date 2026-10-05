"use client";

import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PickerRenderProps } from "@/components/ui/PickerField";
import { SelectOption } from "@/components/ui/select";
import { useState } from "react";
import { LINK_BUTTON, PRIMARY_BUTTON } from "../styles";

/** "Select Categories": the category tree in a dialog; Apply commits. */
const CategoryPickerDialog = ({
  value,
  onApply,
  onClose,
  categoryOptions,
}: PickerRenderProps & {
  /** Every category (flattened), for naming the picked ids. */
  categoryOptions: SelectOption[];
}) => {
  const [ids, setIds] = useState<string[]>(value.map((item) => item.value));

  const apply = () => {
    const names = new Map(
      categoryOptions.map((option) => [option.value, option.label]),
    );
    onApply(ids.map((id) => ({ value: id, label: names.get(id) ?? id })));
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[72rem] p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl! 2xl:text-[2.4rem]! font-normal!">
            Select Categories
          </DialogTitle>
        </DialogHeader>

        <CategoryTreeSm
          name="promotion-categories"
          value={ids}
          onChange={setIds}
          className="h-[44rem] border-0 shadow-none p-0 mt-4"
        />

        <DialogFooter className="mt-4 gap-4">
          <Button
            type="button"
            variant="link"
            className={LINK_BUTTON}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="xl"
            className={PRIMARY_BUTTON}
            onClick={apply}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryPickerDialog;
