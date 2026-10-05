"use client";

import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";
import PromotionEditor from "@/app/components/marketing/Promotions/editor/PromotionEditor";
import { useParams } from "next/navigation";

const EditCouponPromotionPage = () => {
  const { id } = useParams<{ id: string }>();
  return <PromotionEditor kind={PromotionDisplay.Coupon} promotionId={id} />;
};

export default EditCouponPromotionPage;
