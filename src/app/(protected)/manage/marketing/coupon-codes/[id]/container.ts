"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createCoupon,
  getCouponById,
  updateCouponCode,
} from "@/redux/slices/marketingSlice";
import { generateUniqueCode } from "@/lib/utils";
import { DefaultCouponCodeFormValues, values } from "../constant";
import { CouponCodeForm } from "../types";
import { CouponCodeSchema } from "@/validations/formValidations";
import { mapCouponDataToForm } from "../utils";

const useCouponFormContainer = () => {
  const params = useParams();
  const couponId = params?.id as string | undefined;
  const isEdit = !!couponId && couponId !== "add";

  const random = values[Math.floor(Math.random() * values.length)];

  const form = useForm<CouponCodeForm>({
    resolver: yupResolver(CouponCodeSchema),
    defaultValues: {
      ...DefaultCouponCodeFormValues,
      couponCode: generateUniqueCode(random),
    },
  });

  const { reset } = form;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && couponId) {
      fetchCouponData();
    }
  }, [couponId, isEdit]);

  const fetchCouponData = async () => {
    setLoading(true);
    try {
      const result = await dispatch(getCouponById({ id: couponId })).unwrap();
      const couponData = result?.couponcode || result?.data;
      if (couponData) {
        reset(mapCouponDataToForm(couponData));
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CouponCodeForm) => {
    setSaving(true);
    try {
      if (isEdit) {
        await dispatch(updateCouponCode({ id: couponId, data })).unwrap();
      } else {
        await dispatch(createCoupon({ data })).unwrap();
      }
      setTimeout(() => {
        router.push("/manage/marketing/coupon-codes");
      }, 2000);
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "creating"} coupon:`, error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (saving || loading) return;
    router.push("/manage/marketing/coupon-codes");
  };

  return {
    form,
    isEdit,
    loading,
    saving,
    activeTab,
    setActiveTab,
    onSubmit,
    handleCancel,
  };
};

export default useCouponFormContainer;