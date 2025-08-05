"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addCategory } from "@/redux/slices/categorySlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import CategoryDropdown from "./CategoryDropdown";
export default function AddCategoryModal({
  open,
  onOpenChange,
  categoryData,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  categoryData: any;
}) {
  const [name, setDisplayName] = useState("");
  const [channel, setChannel] = useState("ctspoint");
  const [parentId, setParentCategory] = useState<number | null>(null);
  const [isVisible, setVisibility] = useState(false);
  const [showError, setShowError] = useState(false);
  console.log("Category Data from Modal: ", categoryData);

  const dispatch = useAppDispatch();

  const handleSave = async () => {
    if (!name.trim()) {
      setShowError(true);
      return;
    }

    try {
      const payload = {
        name,
        channel,
        parentId,
        isVisible,
      };

      await dispatch(addCategory({ data: payload })).unwrap(); // unwrap for error catching
      setParentCategory(null);
      console.log("Add Category Payload: ", payload);

      onOpenChange(false); // close modal on success
    } catch (error) {
      console.error("Failed to create category:", error);
      // optionally: show toast or error state
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[500px] p-10">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        {/* Display Name */}
        <div className="space-y-2">
          <Label>Display name</Label>
          <Input
            placeholder="New category"
            value={name}
            onChange={(e) => {
              setDisplayName(e.target.value);
              setShowError(false);
            }}
            className={`${cn(showError && "border-red-500")} !max-w-full`}
          />
          {showError && (
            <p className="text-sm text-red-500">Enter category display name</p>
          )}
        </div>

        {/* Channel */}
        <div className="space-y-2">
          <Label>
            Channel <span className="!text-red-500">*</span>
          </Label>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="!max-w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ctspoint">ctspoint</SelectItem>
              {/* Add more channels if needed */}
            </SelectContent>
          </Select>
        </div>

        {/* Parent Category */}
        <div className="space-y-2">
          <Label>Parent category</Label>
          <CategoryDropdown
            categoryData={categoryData}
            value={{
              id: parentId ? Number(parentId) : null,
              path: "", // optional: use if you want to show prefilled path
            }}
            onChange={(val) => {
              setParentCategory(val.id); // keep it as number
            }}
          />
          <p className="text-sm text-muted-foreground">
            Leave empty to add to the root category
          </p>
        </div>

        {/* Enable Visibility */}
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="visibility"
            checked={isVisible}
            onCheckedChange={(val) => setVisibility(!!val)}
          />
          <Label htmlFor="visibility">Enable visibility</Label>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          Makes new categories immediately available on the storefront.
        </p>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-6">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-lg p-5"
            type="button"
          >
            Cancel
          </Button>
          {/* <Button disabled variant="outline">
            Save and add another
          </Button> */}
          <Button
            disabled={!name.trim()}
            onClick={handleSave}
            className="text-lg p-5"
          >
            Save and edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
