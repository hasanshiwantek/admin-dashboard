"use client";

import FormFooter from "@/components/form/FormFooter";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChipSelect from "@/components/ui/ChipSelect";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { promotionBannerSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  BANNER_LOCATION_OPTIONS,
  BANNER_TYPE_OPTIONS,
  PromotionBannerField,
} from "./constant";
import {
  CARD,
  CARD_DESCRIPTION,
  CARD_HEADER,
  CARD_TITLE,
  LABEL,
  LINK_BUTTON,
  TEXT,
} from "./styles";
import { PromotionBanner } from "./types";

type Props = {
  initialBanner: PromotionBanner;
  isCoupon: boolean;
  onSave: (banner: PromotionBanner) => void;
  onCancel: () => void;
};

/**
 * Edits one banner's content and locations; its type is chosen beforehand
 * in the "Add banner" dialog. Shown in place of the rest of the page.
 */
const BannerEditor = ({ initialBanner, isCoupon, onSave, onCancel }: Props) => {
  const form = useForm<PromotionBanner>({
    resolver: yupResolver(promotionBannerSchema),
    defaultValues: initialBanner,
  });
  const { control, getValues, setValue, handleSubmit, formState } = form;

  const typeMeta = BANNER_TYPE_OPTIONS.find(
    (option) => option.value === initialBanner[PromotionBannerField.Type],
  );
  // Coupon banners can only be placed on the cart page.
  const locationOptions = isCoupon
    ? BANNER_LOCATION_OPTIONS.filter((option) => option.value === "cart")
    : BANNER_LOCATION_OPTIONS;

  const insertPlaceholder = (token: string) =>
    setValue(
      PromotionBannerField.Content,
      `${getValues(PromotionBannerField.Content)}${token}`,
      { shouldValidate: formState.isSubmitted },
    );

  return (
    // Bottom margin keeps the card clear of the fixed footer.
    <Card className={cn(CARD, "mb-28")}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>{typeMeta?.label}</CardTitle>
        <CardDescription
          className={cn(CARD_DESCRIPTION, "flex flex-col gap-4 mt-4")}
        >
          <span>{typeMeta?.description}</span>
          <span>{typeMeta?.details}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          <div className="flex flex-col gap-1">
            <span className={LABEL}>Content</span>
            <Button
              type="button"
              variant="link"
              className={cn(
                LINK_BUTTON,
                "self-start text-lg! 2xl:text-[1.4rem]! [&_svg]:size-5! mb-2",
              )}
            >
              Which placeholders can I use in this message?
              <HelpCircle />
            </Button>
            <InputField
              control={control}
              name={PromotionBannerField.Content}
              layout="vertical"
              Component={Textarea}
              rows={6}
              className={cn(TEXT, "min-h-60 max-w-[42rem] resize-y")}
            />
          </div>

          <InputField
            control={control}
            name={PromotionBannerField.Locations}
            label="Locations"
            layout="vertical"
            labelClassName={LABEL}
            Component={ChipSelect}
            searchable={false}
            options={locationOptions}
            placeholder="Select banner locations"
          />
        </div>
      </CardContent>

      {/* The page footer is hidden while this editor is open; this one
          saves the banner instead of submitting the promotion. */}
      <FormFooter
        submitText="Save banner"
        onSubmit={handleSubmit(onSave)}
        onCancel={onCancel}
      />
    </Card>
  );
};

export default BannerEditor;
