import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { togglePermission } from "../utils";
import { PermissionGroupFieldProps } from "./type";

// Scrollable checkbox list for one permission group; plug into
// <InputField Component={PermissionGroupField} group={...}>
const PermissionGroupField = ({
  group,
  value = [],
  onChange,
  id,
}: PermissionGroupFieldProps) => (
  <div
    id={id}
    className="max-h-[17rem] w-full max-w-[42rem] overflow-y-auto rounded-sm border border-border-light bg-white"
  >
    <ListRenderer
      data={group.permissions ?? []}
      keyExtractor={(permission) => permission.id}
      emptyComponent={<></>}
      className="space-y-0! divide-y divide-border-light p-0!"
      renderItem={(permission) => {
        const checked = value.includes(permission.id);
        return (
          <label
            className={cn(
              "flex min-h-[4.2rem] cursor-pointer items-center gap-3 px-3 transition-colors",
              checked ? "bg-blue-50" : "hover:bg-gray-50",
            )}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={() =>
                onChange?.(togglePermission(value, permission.id))
              }
            />
            <span className="text-[1.3rem]! font-normal! text-gray-700! select-none">
              {permission.label}
            </span>
          </label>
        );
      }}
    />
  </div>
);

export default PermissionGroupField;
