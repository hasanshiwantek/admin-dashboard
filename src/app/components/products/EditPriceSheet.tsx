"use client";

import { Button } from "@/components/ui/button";
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

const WARNING_CELL_BG = "#fff9e6";
const INVALID_PRICE_MESSAGE = "Please enter a whole number";

const PRICE_FIELDS = ["price", "salePrice", "costPrice", "msrp"] as const;

type PriceField = (typeof PRICE_FIELDS)[number];

type Product = {
  id: string;
  name: string;
  sku: string;
  price?: string | number;
  salePrice?: string | number;
  costPrice?: string | number;
  msrp?: string | number;
};

type FormValues = {
  id: string;
  name: string;
  sku: string;
  price: string;
  salePrice: string;
  costPrice: string;
  msrp: string;
};

type EditPriceSheetProps = {
  trigger: React.ReactNode;
  product: Product;
  onSuccess?: () => void;
};

const PRICE_COLUMNS: {
  key: PriceField;
  label: string;
}[] = [
  { key: "price", label: "Price" },
  { key: "salePrice", label: "Sale price" },
  { key: "costPrice", label: "Cost" },
  { key: "msrp", label: "MSRP" },
];

const createInitialValues = (product: Product): FormValues => ({
  id: product.id ?? "",
  name: product.name ?? "",
  sku: product.sku ?? "",
  price: String(product.price ?? ""),
  salePrice: String(product.salePrice ?? ""),
  costPrice: String(product.costPrice ?? ""),
  msrp: String(product.msrp ?? ""),
});

const isInvalidPrice = (value: string) => value.startsWith("-");

type PriceInputCellProps = {
  value: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
};

const PriceInputCell = ({
  value,
  error,
  inputRef,
  onChange,
}: PriceInputCellProps) => (
  <TableCell className="relative align-top">
    {error && <ValidationTooltip message={error} />}

    <Input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      pattern="-?[0-9]*[.]?[0-9]*"
      value={value}
      aria-invalid={Boolean(error)}
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

export default function EditPriceSheet({
  trigger,
  product,
  onSuccess,
}: EditPriceSheetProps) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<FormValues>(() =>
    createInitialValues(product),
  );

  /**
   * Keep the form synchronized when the product changes.
   */
  useEffect(() => {
    setValues(createInitialValues(product));
  }, [product.id]);

  /**
   * Focus the first editable field when the sheet opens.
   */
  useEffect(() => {
    if (!open) return;

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

  const hasValidationErrors = PRICE_FIELDS.some((field) =>
    isInvalidPrice(values[field]),
  );

  const handleSubmit = async () => {
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
                  price: values.price,
                  salePrice: values.salePrice,
                  costPrice: values.costPrice,
                  msrp: values.msrp,
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
          <SheetTitle>Edit prices</SheetTitle>
        </SheetHeader>

        <div className="h-[calc(100vh-80px)] overflow-x-auto p-10">
          <Table className="min-h-[150px] min-w-[900px] border text-left">
            <TableHeader className="border-b font-semibold">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>SKU</TableHead>

                {PRICE_COLUMNS.map(({ key, label }) => (
                  <TableHead key={key}>{label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="border-b">
                <TableCell className="align-top">
                  <Input
                    value={values.name}
                    readOnly
                    className="border border-gray-300"
                  />
                </TableCell>

                <TableCell className="align-top">
                  <Input
                    value={values.sku}
                    readOnly
                    className="border border-gray-300"
                  />
                </TableCell>

                {PRICE_COLUMNS.map(({ key }) => {
                  const error = isInvalidPrice(values[key])
                    ? INVALID_PRICE_MESSAGE
                    : undefined;

                  return (
                    <PriceInputCell
                      key={key}
                      value={values[key]}
                      error={error}
                      inputRef={key === "price" ? firstInputRef : undefined}
                      onChange={(value) => handleChange(key, value)}
                    />
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>

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
