"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { sanitizeNumberInput } from "@/lib/productUtils";
import { cn } from "@/lib/utils";
import { updateProduct } from "@/redux/slices/productSlice";
import { useEffect, useRef, useState } from "react";
import ValidationTooltip from "./TableCellValidationTooltip";

const INVALID_STOCK_MESSAGE = "Please enter a whole number";

const STOCK_FIELDS = ["currentStock", "lowStock"] as const;

type StockField = (typeof STOCK_FIELDS)[number];

type Product = {
  id: string;
  name: string;
  sku: string;
  currentStock?: string | number;
  lowStock?: string | number;
  allowPurchase?: boolean;
};

type FormValues = {
  name: string;
  sku: string;
  currentStock: string;
  lowStock: string;
  allowPurchase: boolean;
};

type EditStockSheetProps = {
  trigger: React.ReactNode;
  product: Product;
  onSuccess?: () => void;
};

const createInitialValues = (product: Product): FormValues => ({
  name: product.name ?? "",
  sku: product.sku ?? "",
  currentStock: String(product.currentStock ?? ""),
  lowStock: String(product.lowStock ?? ""),
  allowPurchase: Boolean(product.allowPurchase),
});

const isInvalidStock = (value: string): boolean => {
  return value.startsWith("-");
};

type IntegerInputCellProps = {
  value: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
};

const IntegerInputCell = ({
  value,
  error,
  inputRef,
  onChange,
}: IntegerInputCellProps) => (
  <TableCell className="relative align-top">
    {error && <ValidationTooltip message={error} />}

    <Input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="-?[0-9]*"
      value={value}
      aria-invalid={Boolean(error)}
      aria-errormessage={error ? "validation-error" : undefined}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      className="
        border
        border-gray-300
        aria-invalid:border-red-500
        aria-invalid:bg-warning-cell-bg
      "
    />
  </TableCell>
);

export default function EditStockSheet({
  trigger,
  product,
  onSuccess,
}: EditStockSheetProps) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<FormValues>(() =>
    createInitialValues(product),
  );

  /**
   * Reset the form when a different product is provided.
   */
  useEffect(() => {
    setValues(createInitialValues(product));
  }, [product.id]);

  /**
   * Focus and select the first editable field
   * whenever the Sheet opens.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      firstInputRef.current?.focus();
      firstInputRef.current?.select();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [open]);

  const handleChange = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  /**
   * Validation is derived from the current values.
   * No separate error state is necessary.
   */
  const hasValidationErrors = STOCK_FIELDS.some((field) =>
    isInvalidStock(values[field]),
  );

  const handleSubmit = async (): Promise<boolean> => {
    if (hasValidationErrors || isSaving) {
      return false;
    }

    try {
      setIsSaving(true);

      await dispatch(
        updateProduct({
          body: {
            products: [
              {
                id: [product.id],
                fields: {
                  name: values.name,
                  sku: values.sku,
                  currentStock: values.currentStock,
                  lowStock: values.lowStock,
                  allowPurchase: values.allowPurchase,
                },
              },
            ],
          },
        }),
      ).unwrap();

      return true;
    } catch (error) {
      console.error("Error updating product:", error);

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    const success = await handleSubmit();
    if (success) onSuccess?.();
  };

  const handleSaveAndExit = async () => {
    const success = await handleSubmit();
    if (success) {
      onSuccess?.();
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="border-b p-6">
          <SheetTitle>Edit Inventory</SheetTitle>
        </SheetHeader>

        <div className="h-[calc(100vh-80px)] overflow-x-auto p-10">
          <Table className="min-h-[150px] min-w-[900px] border text-left">
            <TableHeader className="border-b font-semibold">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current stock</TableHead>
                <TableHead>Low stock</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="border-b">
                {/* Product name */}
                <TableCell className="align-top">
                  <Input
                    value={values.name}
                    readOnly
                    className="border border-gray-300"
                  />
                </TableCell>

                {/* SKU */}
                <TableCell className="align-top">
                  <Input
                    value={values.sku}
                    readOnly
                    className="border border-gray-300"
                  />
                </TableCell>

                {/* Current stock */}
                <IntegerInputCell
                  value={values.currentStock}
                  error={
                    isInvalidStock(values.currentStock)
                      ? INVALID_STOCK_MESSAGE
                      : undefined
                  }
                  inputRef={firstInputRef}
                  onChange={(value) => handleChange("currentStock", value)}
                />

                {/* Low stock */}
                <IntegerInputCell
                  value={values.lowStock}
                  error={
                    isInvalidStock(values.lowStock)
                      ? INVALID_STOCK_MESSAGE
                      : undefined
                  }
                  onChange={(value) => handleChange("lowStock", value)}
                />

                {/* Availability */}
                <TableCell className="align-top">
                  <Checkbox
                    checked={values.allowPurchase}
                    onCheckedChange={(checked) =>
                      handleChange("allowPurchase", checked === true)
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 flex w-full gap-3 border-t bg-white p-6">
          <Button
            size={"xl"}
            type="button"
            className={cn("btn-outline-primary w-1/2", {
              "cursor-not-allowed! opacity-60": hasValidationErrors,
            })}
            onClick={handleSave}
            disabled={isSaving || hasValidationErrors}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            size={"xl"}
            type="button"
            className={cn("btn-primary w-1/2", {
              "cursor-not-allowed! opacity-60": hasValidationErrors,
            })}
            onClick={handleSaveAndExit}
            disabled={isSaving || hasValidationErrors}
          >
            {isSaving ? "Saving..." : "Save and exit"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
