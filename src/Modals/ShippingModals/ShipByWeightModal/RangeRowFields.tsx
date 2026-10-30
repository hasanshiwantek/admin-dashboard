import InputField from "@/components/form/InputField";
import PriceField from "@/components/form/PriceField";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { RateSymbol, ShipByWeightField } from "./constant";
import { RangeRowFieldsProps, ShipByWeightFormValues } from "./type";

// Fields come from the surrounding <Form> context, so no `control` prop needed
const RangeRowFields = ({
  index,
  isLast,
  isPercentageCost,
  onAdd,
  onRemove,
}: RangeRowFieldsProps) => {
  const name = <K extends "from" | "upTo" | "cost">(key: K) =>
    `${ShipByWeightField.Ranges}.${index}.${key}` as const;

  return (
    <div className="flex items-start gap-4">
      <InputField<ShipByWeightFormValues>
        name={name("from")}
        layout="vertical"
        containerClassName="flex-1"
        placeholder="0.00"
        className="h-14"
      />
      <InputField<ShipByWeightFormValues>
        name={name("upTo")}
        layout="vertical"
        containerClassName="flex-1"
        placeholder="1 000.00"
        className="h-14"
      />
      {isPercentageCost ? (
        <InputField<ShipByWeightFormValues>
          name={name("cost")}
          layout="vertical"
          containerClassName="flex-1"
          className="h-14"
          endIcon={RateSymbol.Percentage}
        />
      ) : (
        <PriceField<ShipByWeightFormValues>
          name={name("cost")}
          layout="vertical"
          containerClassName="flex-1"
          className="h-14"
        />
      )}

      {isLast ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onAdd}
          aria-label="Add range"
          className="h-14 w-14 shrink-0 rounded-none border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Plus size={44} />
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onRemove}
          aria-label="Remove range"
          className="h-14 w-14 shrink-0 rounded-none border-red-300 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={44} />
        </Button>
      )}
    </div>
  );
};

export default RangeRowFields;
