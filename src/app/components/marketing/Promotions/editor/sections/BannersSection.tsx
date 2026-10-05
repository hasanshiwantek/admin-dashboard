"use client";

import { useFormContext } from "@/components/form/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import BannerEditor from "../BannerEditor";
import {
  BANNER_TYPE_OPTIONS,
  bannerDefaultValues,
  PromotionBannerField,
  PromotionField,
} from "../constant";
import BannerTypeDialog from "../modals/BannerTypeDialog";
import {
  CARD,
  CARD_DESCRIPTION,
  CARD_HEADER,
  CARD_TITLE,
  ICON_BUTTON,
  LINK_BUTTON,
  TEXT,
} from "../styles";
import { BannerType, PromotionBanner, PromotionFormValues } from "../types";

/**
 * The banner open in the editor: `index` is null for a new banner.
 * `key` remounts the editor for each banner.
 */
export type EditingBanner = {
  banner: PromotionBanner;
  index: number | null;
  key: number;
};

const HEAD = cn(TEXT, "font-semibold! text-gray-800 py-4 px-4");
const CELL = cn(TEXT, "py-4 px-4 text-gray-800 whitespace-normal");

const typeLabel = (type: BannerType) =>
  BANNER_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? type;

/**
 * `editing` is owned by the page, which shows only this section while a
 * banner is open in the editor (as BigCommerce does).
 */
const BannersSection = ({
  isCoupon,
  editing,
  setEditing,
}: {
  isCoupon: boolean;
  editing: EditingBanner | null;
  setEditing: (editing: EditingBanner | null) => void;
}) => {
  const { control } = useFormContext<PromotionFormValues>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: PromotionField.Banners,
  });
  const [choosingType, setChoosingType] = useState(false);

  const usedTypes = fields.map((banner) => banner[PromotionBannerField.Type]);

  const startEditing = (banner: PromotionBanner, index: number | null) =>
    setEditing({ banner, index, key: Date.now() });

  const commit = (banner: PromotionBanner) => {
    if (editing?.index != null) update(editing.index, banner);
    else append(banner);
    setEditing(null);
  };

  if (editing)
    return (
      <BannerEditor
        key={editing.key}
        initialBanner={editing.banner}
        isCoupon={isCoupon}
        onSave={commit}
        onCancel={() => setEditing(null)}
      />
    );

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Banners</CardTitle>
        <CardDescription className={CARD_DESCRIPTION}>
          Promotional banners display information about your promotion to
          customers as they shop on your storefront.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        {fields.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="border-t">
                <TableHead className={HEAD}>Type</TableHead>
                <TableHead className={HEAD}>Content</TableHead>
                <TableHead className={HEAD}>Locations</TableHead>
                <TableHead className={HEAD}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* `id` is useFieldArray's key, not part of the banner. */}
              {fields.map(({ id, ...banner }, index) => (
                <TableRow key={id}>
                  <TableCell className={CELL}>
                    {typeLabel(banner.type)}
                  </TableCell>
                  <TableCell className={cn(CELL, "max-w-[50rem]")}>
                    {banner.content}
                  </TableCell>
                  <TableCell className={CELL}>
                    {banner.locations
                      .map((location) => location.label)
                      .join(", ")}
                  </TableCell>
                  <TableCell className={CELL}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Edit banner"
                      className={ICON_BUTTON}
                      onClick={() => startEditing(banner, index)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Delete banner"
                      className={ICON_BUTTON}
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Each type can be used once, so stop offering once all are used. */}
        {usedTypes.length < BANNER_TYPE_OPTIONS.length && (
          <Button
            type="button"
            variant="link"
            className={cn(LINK_BUTTON, "self-start")}
            onClick={() => setChoosingType(true)}
          >
            <Plus />
            Add banner
          </Button>
        )}
      </CardContent>

      {choosingType && (
        <BannerTypeDialog
          usedTypes={usedTypes}
          onClose={() => setChoosingType(false)}
          onSelect={(type) => {
            setChoosingType(false);
            startEditing(bannerDefaultValues(type, isCoupon), null);
          }}
        />
      )}
    </Card>
  );
};

export default BannersSection;
