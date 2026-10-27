import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { ValidationError } from "@/components/ui/validation-error";
import { ExternalLink, Plus, Rocket } from "lucide-react";
import Link from "next/link";
import SettingsCard from "../../../_components/SettingsCard";
import {
  advancedDisplayCheckboxes,
  BACKORDERS_LEARN_MORE_URL,
  backorderDisplayCheckboxes,
} from "../constant";
import InventoryCheckbox from "./InventoryCheckbox";
import { BackorderDisplaySectionProps } from "./type";

const BackorderDisplaySection = ({
  messages,
  columns,
  hasMessageErrors,
  onAddMessage,
}: BackorderDisplaySectionProps) => (
  <SettingsCard
    title="Backorder display"
    titleAdornment={
      <Badge
        variant="secondary"
        className="gap-1 bg-green-100 px-3 py-1 text-[1.2rem]! font-medium text-green-700"
      >
        <Rocket className="size-[2rem]" />
        New
      </Badge>
    }
    action={
      <Link
        href={BACKORDERS_LEARN_MORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[1.5rem] text-link hover:underline"
      >
        Learn more
        <ExternalLink className="size-[1.5rem]" />
      </Link>
    }
  >
    <ListRenderer
      data={backorderDisplayCheckboxes}
      keyExtractor={(option) => option.name}
      emptyComponent={<></>}
      className="space-y-5! p-0!"
      renderItem={(option) => <InventoryCheckbox option={option} />}
    />

    <div className="-mx-10 flex flex-col gap-4">
      <Table
        data={messages}
        columns={columns}
        getRowId={(message) => message.fieldKey}
        selectable={false}
        hideRecordCount
        bare
      />
      {hasMessageErrors && (
        <ValidationError
          message="Required fields must not be empty"
          className="px-10"
        />
      )}
      <Button
        type="button"
        variant="link"
        className="h-auto self-start px-10 text-[1.5rem] text-link"
        onClick={onAddMessage}
      >
        <Plus />
        Add new message
      </Button>
    </div>

    <h3 className="mt-2 text-[2rem] font-normal text-gray-800">
      Advanced display options
    </h3>
    <ListRenderer
      data={advancedDisplayCheckboxes}
      keyExtractor={(option) => option.name}
      emptyComponent={<></>}
      className="space-y-5! p-0!"
      renderItem={(option) => <InventoryCheckbox option={option} />}
    />
  </SettingsCard>
);

export default BackorderDisplaySection;
