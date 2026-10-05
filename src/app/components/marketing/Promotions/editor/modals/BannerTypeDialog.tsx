"use client";

import RadioGroupField from "@/components/form/fields/RadioGroupField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BANNER_TYPE_OPTIONS } from "../constant";
import { LINK_BUTTON, PRIMARY_BUTTON, TEXT } from "../styles";
import { BannerType } from "../types";

/**
 * "Add banner" step one: pick a banner type. Each type can be used once per
 * promotion, so types already added are shown as USED and can't be picked.
 */
const BannerTypeDialog = ({
  usedTypes,
  onClose,
  onSelect,
}: {
  usedTypes: BannerType[];
  onClose: () => void;
  onSelect: (type: BannerType) => void;
}) => {
  const [selected, setSelected] = useState(
    BANNER_TYPE_OPTIONS.find((option) => !usedTypes.includes(option.value))
      ?.value ?? "",
  );

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[72rem] p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl! 2xl:text-[2.4rem]! font-normal!">
            Add banner
          </DialogTitle>
        </DialogHeader>

        <RadioGroupField
          value={selected}
          onChange={setSelected}
          options={BANNER_TYPE_OPTIONS.map(({ value, label, description }) => {
            const used = usedTypes.includes(value);
            return {
              value,
              label,
              description,
              disabled: used,
              badge: used && (
                <Badge className="rounded-sm bg-gray-600 px-2 text-sm font-semibold uppercase">
                  Used
                </Badge>
              ),
            };
          })}
          className="gap-0 mt-4"
          optionClassName={cn(
            TEXT,
            "text-gray-800 py-4 gap-4 border-b border-gray-200",
          )}
        />

        <DialogFooter className="mt-4 gap-4">
          <Button
            type="button"
            variant="link"
            className={LINK_BUTTON}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="xl"
            className={PRIMARY_BUTTON}
            disabled={!selected}
            onClick={() => onSelect(selected as BannerType)}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BannerTypeDialog;
