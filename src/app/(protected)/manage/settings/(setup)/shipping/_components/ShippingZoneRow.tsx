"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/Switch";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SHIPPING_ROUTE, US_FLAG_URL, US_ZONE_ID } from "../constant";
import { ShippingZoneRowProps } from "./type";

const ShippingZoneRow = ({
  zone,
  onToggle,
  onDelete,
}: ShippingZoneRowProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isUsZone = zone.id === US_ZONE_ID;
  const activeMethods = (zone.shipping_methods || []).filter(
    (m) => m.is_active,
  );

  const handleDelete = () => {
    onDelete(zone).finally(() => setConfirmOpen(false));
  };

  return (
    <div className="flex items-center gap-6 px-6 py-6 hover:bg-gray-50">
      <div className="flex h-8 w-10 shrink-0 items-center justify-center overflow-hidden">
        {isUsZone ? (
          <img
            src={US_FLAG_URL}
            alt="US"
            className="h-full w-full object-cover"
          />
        ) : (
          <Globe size={16} className="text-gray-400" />
        )}
      </div>

      <p className="w-56 shrink-0 text-[15px]! font-medium text-muted-plum-gray!">
        {zone.name}
      </p>

      <div className="flex flex-1 items-center justify-between gap-4">
        <ListRenderer
          data={activeMethods}
          keyExtractor={(method) => method.id}
          // Zones without active methods just leave the column blank
          emptyComponent={<></>}
          className="items-start! p-0! space-y-0! leading-relaxed"
          renderItem={(method) => (
            <p className="text-[15px]! text-muted-plum-gray!">
              {method.display_name}
            </p>
          )}
        />

        {isUsZone && (
          <Switch
            checked={!!zone.is_active}
            onCheckedChange={() => onToggle(zone)}
          />
        )}

        <div className="flex shrink-0 items-center gap-3">
          <Button asChild variant="outline">
            <Link href={`${SHIPPING_ROUTE}/${zone.id}`}>Edit</Link>
          </Button>

          <Popover open={confirmOpen} onOpenChange={setConfirmOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                aria-label={`Delete ${zone.name}`}
              >
                X
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3">
              <div className="space-y-3">
                <p className="text-sm font-medium">Delete this zone?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="bg-danger-red"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ShippingZoneRow;
