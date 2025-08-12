// components/CategoryModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import CategoryTreeSm from "./add/CategoryTreeSm";
import CategoryDropdown from "./categories/CategoryDropdown";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";

type CategoryNode = {
  id: number;
  name: string;
  subcategories?: CategoryNode[];
};

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
  const dispatch = useAppDispatch();
  const catState = useAppSelector((s: any) => s.category?.categories);
  const categoriesData: CategoryNode[] = catState?.data || [];

  // fetch once when modal can be used
  useEffect(() => {
    if (!catState?.data?.length) dispatch(fetchCategories());
  }, [dispatch]);

  const methods = useForm<{ categories: string[] }>({
    defaultValues: { categories: defaultSelectedIds },
  });

  const { getValues, reset, setValue } = methods;

  // keep defaults synced on open
  useEffect(() => {
    if (open) reset({ categories: defaultSelectedIds });
  }, [open, defaultSelectedIds, reset]);

  // 🔹 Map store categories to CategoryDropdown's expected shape
  type DDCategory = {
    id: number;
    name: string;
    parent_id: number | null;
    subcategories?: DDCategory[];
  };
  const dropdownData: DDCategory[] = useMemo(() => {
    const mapTree = (
      nodes: CategoryNode[],
      parentId: number | null = null
    ): DDCategory[] =>
      nodes.map((n) => ({
        id: Number(n.id),
        name: n.name,
        parent_id: parentId,
        subcategories: n.subcategories
          ? mapTree(n.subcategories, Number(n.id))
          : [],
      }));
    return mapTree(categoriesData);
  }, [categoriesData]);

  // 🔎 Local state for the dropdown "selected" display (optional)
  const [ddValue, setDdValue] = useState<{ id: number | null; path: string }>({
    id: null,
    path: "",
  });

  const handleDropdownPick = (val: { id: number; path: string }) => {
    setDdValue(val);
    const idStr = String(val.id);

    // ✅ add to RHF selected list if not already there
    const current = getValues("categories") || [];
    if (!current.includes(idStr)) {
      setValue("categories", [...current, idStr], { shouldDirty: true });
    }

    // (Optional) If you later add a prop to CategoryTreeSm to expand/open a path,
    // you can trigger it here with ancestor IDs.
  };

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

        {/* 🔎 Search + pick (selects the checkbox in the tree) */}
        <div className="mb-4">
          <CategoryDropdown
            categoryData={dropdownData}
            value={ddValue}
            onChange={handleDropdownPick}
          />
        </div>

        <FormProvider {...methods}>
          {/* The tree reads from RHF and will show the checkbox as checked */}
          <CategoryTreeSm name="categories" />
        </FormProvider>

        <div className="flex justify-end mt-4 gap-4">
          <Button variant="outline" onClick={onClose} className="!text-xl">
            Cancel
          </Button>
          <Button onClick={handleApply} className="!text-xl">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
