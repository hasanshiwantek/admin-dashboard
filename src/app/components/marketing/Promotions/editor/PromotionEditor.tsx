"use client";

import Form from "@/components/form/Form";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createPromotion,
  getPromotionById,
  updatePromotion,
} from "@/redux/slices/marketingSlice";
import { fetchSingleProduct } from "@/redux/slices/productSlice";
import { promotionSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  PromotionDisplay,
  promotionEditPath,
  PROMOTIONS_BASE_PATH,
  PromotionStatus,
} from "../constant";
import {
  newCouponCode,
  promotionDefaultValues,
  PromotionField,
} from "./constant";
import usePromotionLookups from "./hooks/usePromotionLookups";
import CodesGeneratedDialog from "./modals/CodesGeneratedDialog";
import BannersSection, { EditingBanner } from "./sections/BannersSection";
import CouponCodeSection from "./sections/CouponCodeSection";
import RulesSection, { EditingRule } from "./sections/RulesSection";
import ScheduleSection from "./sections/ScheduleSection";
import SummarySection from "./sections/SummarySection";
import TargetingSection from "./sections/TargetingSection";
import UsageLimitsSection from "./sections/UsageLimitsSection";
import { PromotionEditorProps, PromotionFormValues } from "./types";
import {
  buildPromotionPayload,
  extractPromotion,
  promotionToFormValues,
  relabelProducts,
  unresolvedProductIds,
} from "./utils";

const PromotionEditor = ({
  kind: initialKind,
  promotionId,
  copy,
}: PromotionEditorProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lookups = usePromotionLookups();
  const isEdit = !!promotionId && !copy;

  const [loading, setLoading] = useState(!!promotionId);
  const [generated, setGenerated] = useState<{
    id: number | string;
    count: number;
  } | null>(null);
  // While a rule or banner is open in its editor, the page shows only that
  // section (as BigCommerce does); hidden sections keep their form values.
  const [editingRule, setEditingRule] = useState<EditingRule | null>(null);
  const [editingBanner, setEditingBanner] = useState<EditingBanner | null>(
    null,
  );
  const subEditorOpen = !!editingRule || !!editingBanner;

  // Opening or closing an editor swaps the page; start at the top.
  // (The layout scrolls <main>, not the window, so scroll to an anchor.)
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [subEditorOpen]);

  const form = useForm<PromotionFormValues>({
    resolver: yupResolver(promotionSchema),
    defaultValues: promotionDefaultValues(initialKind),
  });
  const { reset, setValue, getValues, watch } = form;

  // Editing takes the kind from the loaded promotion; create and copy keep
  // the kind of the route.
  console.log({ watch: watch() });
  const kind = watch(PromotionField.Kind);

  const listPath = `${PROMOTIONS_BASE_PATH}?display=${kind}`;
  const isCoupon = kind === PromotionDisplay.Coupon;

  useEffect(() => {
    if (!promotionId) return;

    const load = async () => {
      const result = await dispatch(getPromotionById({ id: promotionId }));
      if (!getPromotionById.fulfilled.match(result)) {
        toast.error((result.payload as string) || "Failed to load promotion");
        router.push(PROMOTIONS_BASE_PATH);
        return;
      }
      const promotion = extractPromotion(result.payload);
      const values = promotionToFormValues(
        promotion,
        promotionDefaultValues(initialKind),
      );
      // Opened under the wrong kind (e.g. a coupon at /automatic/{id}):
      // move to the matching URL, which loads the right form.
      if (!copy && values[PromotionField.Kind] !== initialKind) {
        router.replace(
          promotionEditPath(values[PromotionField.Kind], promotionId),
        );
        return;
      }
      if (copy) {
        values[PromotionField.Kind] = initialKind;
        values[PromotionField.Name] = `${values.name} (Copy)`;
        values[PromotionField.Code] = newCouponCode();
        values[PromotionField.Status] = PromotionStatus.Active;
        values[PromotionField.Priority] = null;
      }
      reset(values);
      setLoading(false);

      // The API returns product ids only; fetch their names for the chips.
      const ids = unresolvedProductIds(values.rule);
      if (!ids.length) return;
      const names: Record<string, string> = {};
      await Promise.all(
        ids.map(async (id) => {
          const product = await dispatch(fetchSingleProduct({ id }));
          const name = (product.payload as any)?.data?.name;
          if (fetchSingleProduct.fulfilled.match(product) && name)
            names[id] = name;
        }),
      );
      const rule = getValues(PromotionField.Rule);
      if (rule) setValue(PromotionField.Rule, relabelProducts(rule, names));
    };

    load();
  }, [
    promotionId,
    copy,
    initialKind,
    dispatch,
    reset,
    router,
    setValue,
    getValues,
  ]);

  const onSubmit = async (values: PromotionFormValues) => {
    const data = buildPromotionPayload(values);
    const result = isEdit
      ? await dispatch(updatePromotion({ id: promotionId, data }))
      : await dispatch(createPromotion({ data }));

    if (!(isEdit ? updatePromotion : createPromotion).fulfilled.match(result)) {
      toast.error(
        (result.payload as string) ||
          `Failed to ${isEdit ? "update" : "create"} promotion`,
      );
      return;
    }

    toast.success(isEdit ? "Promotion updated" : "Promotion created");
    const created = extractPromotion(result.payload);
    if (!isEdit && isCoupon && values.couponMode === "bulk" && created?.id) {
      setGenerated({ id: created.id, count: Number(values.codeCount) });
      return;
    }
    router.push(listPath);
  };

  return (
    <PageLayout>
      <div ref={topRef} />
      <PageTitle
        title={isEdit ? "Edit Promotion" : "Create Promotion"}
        titleClassName="font-light! 2xl:text-5xl!"
        hideActionButton
      />

      {loading ? (
        <div className="flex items-center justify-center py-40">
          <Loader2 className="size-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <Form
          form={form}
          onSubmit={onSubmit}
          onInvalid={() => toast.error("Please fix the highlighted fields")}
          bodyClassName="bg-transparent border-0 p-0 gap-8"
          footer={
            !subEditorOpen && {
              submitText: isEdit ? "Save" : "Create promotion",
              loadingText: isEdit ? "Saving..." : "Creating...",
              onCancel: () => router.push(listPath),
            }
          }
        >
          {!subEditorOpen && <SummarySection isCoupon={isCoupon} />}
          {!editingBanner && (
            <RulesSection
              lookups={lookups}
              editing={editingRule}
              setEditing={setEditingRule}
            />
          )}
          {!subEditorOpen && (
            <>
              {isCoupon && (
                <CouponCodeSection
                  promotionId={isEdit ? promotionId : undefined}
                />
              )}
              <TargetingSection />
              <ScheduleSection />
              <UsageLimitsSection isCoupon={isCoupon} />
            </>
          )}
          {!editingRule && (
            <BannersSection
              isCoupon={isCoupon}
              editing={editingBanner}
              setEditing={setEditingBanner}
            />
          )}
        </Form>
      )}

      {generated && (
        <CodesGeneratedDialog
          promotionId={generated.id}
          count={generated.count}
          onDone={() => router.push(listPath)}
        />
      )}
    </PageLayout>
  );
};

export default PromotionEditor;
