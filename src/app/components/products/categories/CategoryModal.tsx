// components/CategoryModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import CategoryTreeSm from "../add/CategoryTreeSm";

export default function CategoryModal({
  open,
  onClose,
  defaultSelectedIds,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  defaultSelectedIds: string[];
  onApply: (selectedIds: string[]) => void;
}) {
  const methods = useForm({
    defaultValues: {
      categories: defaultSelectedIds,
    },
  });

  const { getValues } = methods;

  const handleApply = () => {
    const selected = getValues("categories") || [];
    onApply(selected);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Choose Categories</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <CategoryTreeSm name="categories" />
        </FormProvider>

        <div className="flex justify-end mt-4 gap-4">
          <Button variant="outline" onClick={onClose} className="!text-xl">
            Cancel
          </Button>
          <Button onClick={handleApply} className="!text-xl">Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
