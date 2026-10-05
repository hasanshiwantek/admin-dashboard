"use client";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { downloadFile } from "@/lib/utils";
import { downloadPromotionCodes } from "@/redux/slices/marketingSlice";
import { useState } from "react";
import { toast } from "react-toastify";

/** Downloads a promotion's bulk coupon codes as a CSV file. */
const useDownloadCodes = () => {
  const dispatch = useAppDispatch();
  const [downloading, setDownloading] = useState(false);

  const download = async (promotionId: number | string) => {
    setDownloading(true);
    const result = await dispatch(downloadPromotionCodes({ id: promotionId }));
    setDownloading(false);
    if (downloadPromotionCodes.fulfilled.match(result)) {
      downloadFile(result.payload, `promotion-${promotionId}-coupon-codes.csv`);
    } else {
      toast.error((result.payload as string) || "Failed to download codes");
    }
  };

  return { download, downloading };
};

export default useDownloadCodes;
