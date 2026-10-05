import type {
  promotionBannerSchema,
  promotionRuleSchema,
  promotionSchema,
} from "@/validations/formValidations";
import * as yup from "yup";
import type { PromotionDisplay } from "../constant";
import type {
  BANNER_LOCATIONS,
  BANNER_TYPES,
  CODE_FORMATS,
  ITEM_FILTER_TYPES,
  REWARD_TYPES,
} from "./constant";

export type PromotionEditorProps = {
  kind: PromotionKind;
  promotionId?: string;
  copy?: boolean;
};

export type PromotionFormValues = yup.InferType<typeof promotionSchema>;

/** One condition → reward rule, as edited in the rule builder. */
export type RuleValues = yup.InferType<typeof promotionRuleSchema>;

export type PromotionBanner = yup.InferType<typeof promotionBannerSchema>;

export type ItemFilter = RuleValues["include"][number];

export type ItemFilterType = (typeof ITEM_FILTER_TYPES)[number];
export type RewardType = (typeof REWARD_TYPES)[number];
export type CodeFormat = (typeof CODE_FORMATS)[number];
export type BannerType = (typeof BANNER_TYPES)[number];
export type BannerLocation = (typeof BANNER_LOCATIONS)[number];

export type PromotionKind = PromotionDisplay;
