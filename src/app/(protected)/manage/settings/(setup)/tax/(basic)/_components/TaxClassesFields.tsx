import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { TaxClassesFormNames, TaxClassRowFormNames } from "../constant";
import { TaxClassesFieldsProps, TaxClassRowProps } from "./type";

const ICON_BUTTON = "size-9 text-muted-plum-gray hover:text-text-heading";

const TaxClassRow = ({ index, isDefault, onAdd, onRemove }: TaxClassRowProps) => (
  <div className="flex items-start gap-2">
    <InputField
      name={`${TaxClassesFormNames.Classes}.${index}.${TaxClassRowFormNames.Label}`}
      layout="vertical"
      disabled={isDefault}
      containerClassName="mb-0 w-full"
      // The default row has no remove button, so it reaches under that slot
      className={cn(
        "max-w-none rounded-none",
        isDefault ? "w-[57rem] bg-gray-100 disabled:opacity-100" : "w-[54rem]",
      )}
    />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Add a tax class below"
      onClick={() => onAdd(index)}
      className={ICON_BUTTON}
    >
      <CirclePlus className="size-6" />
    </Button>
    {!isDefault && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove this tax class"
        onClick={() => onRemove(index)}
        className={ICON_BUTTON}
      >
        <CircleMinus className="size-6" />
      </Button>
    )}
  </div>
);

const TaxClassesFields = ({ rows, onAdd, onRemove }: TaxClassesFieldsProps) => (
  <div className="flex flex-col gap-2">
    <p className="text-[1.4rem]! text-muted-plum-gray!">Tax class label</p>
    <ListRenderer
      data={rows}
      keyExtractor={(row) => row.key}
      className="w-fit space-y-0!"
      renderItem={(row, index) => (
        <TaxClassRow
          index={index}
          isDefault={row.isDefault}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    />
  </div>
);

export default TaxClassesFields;
