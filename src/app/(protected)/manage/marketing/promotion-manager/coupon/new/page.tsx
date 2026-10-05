import PromotionEditor from "@/app/components/marketing/Promotions/editor/PromotionEditor";
import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";

const CreateCouponPromotionPage = () => (
  <PromotionEditor kind={PromotionDisplay.Coupon} />
);

export default CreateCouponPromotionPage;
