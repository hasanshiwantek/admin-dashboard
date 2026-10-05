"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CircleCheck, Download } from "lucide-react";
import { TEXT } from "../styles";
import useDownloadCodes from "../hooks/useDownloadCodes";

/** Shown after a bulk coupon promotion is created. */
const CodesGeneratedDialog = ({
  promotionId,
  count,
  onDone,
}: {
  promotionId: number | string;
  count: number;
  onDone: () => void;
}) => {
  const { download, downloading } = useDownloadCodes();

  return (
    <Dialog open onOpenChange={(open) => !open && onDone()}>
      <DialogContent className="sm:max-w-[56rem] p-10">
        <DialogHeader className="items-center text-center! gap-4">
          <CircleCheck className="size-16 text-green-600" />
          <DialogTitle className="text-3xl! 2xl:text-[2.4rem]! font-normal!">
            Coupon codes generated
          </DialogTitle>
          <DialogDescription className={cn(TEXT, "text-gray-600")}>
            {count.toLocaleString()} coupon codes were generated for this
            promotion. Download them as a CSV file, or return to your
            promotions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-4 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            size="xl"
            className={TEXT}
            onClick={onDone}
          >
            Go to promotions
          </Button>
          <Button
            type="button"
            size="xl"
            className={cn("btn-primary", TEXT)}
            disabled={downloading}
            onClick={() => download(promotionId)}
          >
            <Download className="size-6" />
            {downloading ? "Downloading..." : "Download codes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CodesGeneratedDialog;
