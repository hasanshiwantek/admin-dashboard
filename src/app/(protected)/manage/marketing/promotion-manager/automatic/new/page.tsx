import PromotionEditor from "@/app/components/marketing/Promotions/editor/PromotionEditor";
import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";

const CreateAutomaticPromotionPage = () => (
  <PromotionEditor kind={PromotionDisplay.Automatic} />
);

export default CreateAutomaticPromotionPage;
