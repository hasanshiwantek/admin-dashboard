"use client";

import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";
import PromotionEditor from "@/app/components/marketing/Promotions/editor/PromotionEditor";
import { useParams } from "next/navigation";

const CopyAutomaticPromotionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PromotionEditor kind={PromotionDisplay.Automatic} promotionId={id} copy />
  );
};

export default CopyAutomaticPromotionPage;
