"use client";

import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";
import PromotionEditor from "@/app/components/marketing/Promotions/editor/PromotionEditor";
import { useParams } from "next/navigation";

const EditAutomaticPromotionPage = () => {
  const { id } = useParams<{ id: string }>();
  return <PromotionEditor kind={PromotionDisplay.Automatic} promotionId={id} />;
};

export default EditAutomaticPromotionPage;
