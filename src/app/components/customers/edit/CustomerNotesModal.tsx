"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchOrderById, updateOrder } from "@/redux/slices/orderSlice";
import { Label } from "@/components/ui/label";

interface CustomerNotesModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number | string | null;
}

export default function CustomerNotesModal({
  open,
  onClose,
  orderId,
}: CustomerNotesModalProps) {
  const dispatch = useAppDispatch();

  const { singleOrder, loading } = useAppSelector(
    (state: any) => state.order || {}
  );

  const order = singleOrder;

  const [comments, setComments] = useState("");
  const [staffNotes, setStaffNotes] = useState("");

  // Fetch order when modal opens
  useEffect(() => {
    if (orderId && open) {
      dispatch(fetchOrderById({ orderId }));
    }
  }, [orderId, open, dispatch]);

  // Set notes after order data is fetched
  useEffect(() => {
    if (order) {
      setComments(order?.comments || "");
      setStaffNotes(order?.staffNotes || "");
    }
  }, [order]);

  const handleSave = async () => {
    if (!orderId) return;

    const payload = {
      staff_notes: staffNotes,
      comments: comments,
    };

    await dispatch(
      updateOrder({
        id: orderId,
        data: payload,
      })
    );

    handleClose();
  };

  const handleClose = () => {
    setComments("");
    setStaffNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Order Comments and Notes
          </DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground mb-4">
          Use the text boxes below to make notes on this order.
        </p>

        {/* Order Comments */}
        <div className="space-y-2">
          <Label htmlFor="order-comments">
            Order Comments
          </Label>

          <Textarea
            id="order-comments"
            rows={6}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Type any comments about this order here..."
            className="min-h-[150px]"
          />

          <p className="text-xs text-muted-foreground">
            These will be visible on printed invoices.
          </p>
        </div>

        {/* Staff Notes */}
        <div className="space-y-2 mt-4">
          <Label htmlFor="staff-notes">
            Staff Notes
          </Label>

          <Textarea
            id="staff-notes"
            rows={6}
            value={staffNotes}
            onChange={(e) => setStaffNotes(e.target.value)}
            placeholder="Staff notes are internal and not visible to customers."
            className="min-h-[150px]"
          />

          <p className="text-xs text-muted-foreground">
            Only visible in the store control panel.
          </p>
        </div>

        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="!text-lg !p-6"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading || !orderId}
            className="!text-lg !p-6"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}