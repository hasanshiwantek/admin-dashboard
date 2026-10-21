import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  fetchShippingMethodById,
  updateShippingMethod,
} from "@/redux/slices/shippingSlice";
import { useEffect, useState } from "react";
import { ShippingMethodApiData, ShippingMethodUpdatePayload } from "./type";
import { getErrorMessage } from "./utils";

// Loads one shipping method while the modal is open. Shared by the
// display-name and ship-by-weight modals.
export const useShippingMethodById = (
  open: boolean,
  methodId?: number | string,
) => {
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState<ShippingMethodApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setError("");
      return;
    }
    if (!methodId) return;

    let active = true;
    setLoading(true);
    setError("");

    dispatch(fetchShippingMethodById({ method_id: methodId }))
      .unwrap()
      .then((res) => {
        if (active) setMethod(res.data);
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, "Failed to load shipping method."));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open, methodId, dispatch]);

  return { method, loading, error, setError };
};

// Saves a shipping method; resolves true on success, sets `error` on failure
export const useSaveShippingMethod = (
  setError: (message: string) => void,
) => {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);

  const save = async (
    methodId: number | string | undefined,
    payload: ShippingMethodUpdatePayload,
  ) => {
    if (!methodId) {
      setError("Missing method id.");
      return false;
    }

    setSaving(true);
    try {
      await dispatch(
        updateShippingMethod({ method_id: Number(methodId), payload }),
      ).unwrap();
      return true;
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update shipping method."));
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saving, save };
};
