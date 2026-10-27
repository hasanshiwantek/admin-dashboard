import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ColumnDef } from "@/components/ui/Table/types";
import DeleteBackorderMessageModal from "@/Modals/SettingsModals/DeleteBackorderMessageModal/DeleteBackorderMessageModal";
import { X } from "lucide-react";
import { BackorderMessageFormNames } from "./constant";
import { BackorderMessageRow } from "./type";
import { backorderMessagePath } from "./utils";

const CELL_TEXT = "text-[1.4rem]! font-normal! text-text-heading!";
const CELL_PADDING = "px-10 py-4 align-top";
const HEAD_PADDING = "px-10 py-4";
const TEXTAREA_CLASS = "min-h-[5.6rem] resize-none";

// Every row except the default message can be removed
export const getBackorderMessageColumns = ({
  onSetDefault,
  onRemove,
}: {
  onSetDefault: (index: number) => void;
  onRemove: (index: number) => void;
}): ColumnDef<BackorderMessageRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "90px",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (row) => (
      <span className={CELL_TEXT}>{row[BackorderMessageFormNames.MessageId]}</span>
    ),
  },
  {
    key: "name",
    header: "Name",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (_, index) => (
      <InputField
        name={backorderMessagePath(index, BackorderMessageFormNames.Name)}
        layout="vertical"
        isTextArea
        className={TEXTAREA_CLASS}
      />
    ),
  },
  {
    key: "message",
    header: "Message",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (_, index) => (
      <InputField
        name={backorderMessagePath(index, BackorderMessageFormNames.Message)}
        layout="vertical"
        isTextArea
        className={TEXTAREA_CLASS}
      />
    ),
  },
  {
    key: "default",
    header: "Default",
    width: "110px",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (row, index) => (
      <RadioGroup
        value={row[BackorderMessageFormNames.IsDefault] ? "default" : ""}
        onValueChange={() => onSetDefault(index)}
        aria-label="Default message"
      >
        <RadioGroupItem value="default" />
      </RadioGroup>
    ),
  },
  {
    key: "remove",
    width: "70px",
    className: CELL_PADDING,
    render: (row, index) =>
      !row[BackorderMessageFormNames.IsDefault] && (
        <DeleteBackorderMessageModal
          onDelete={() => onRemove(index)}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Remove message"
            >
              <X className="size-[2rem]! text-gray-600" />
            </Button>
          }
        />
      ),
  },
];
