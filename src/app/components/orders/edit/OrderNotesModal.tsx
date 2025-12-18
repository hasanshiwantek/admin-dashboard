"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchOrderById, updateOrder } from "@/redux/slices/orderSlice";
import { Label } from "@/components/ui/label";

interface OrderNotesModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number | string | null;
}

export default function OrderNotesModal({
  open,
  onClose,
  orderId,
}: OrderNotesModalProps) {
  const dispatch = useAppDispatch();

  const { singleOrder, loading, error } = useAppSelector(
    (state: any) => state.order || {}
  );

  const order = singleOrder;
  const [comments, setComments] = useState("");
  const [staffNotes, setStaffNotes] = useState("");

  // Fetch order notes when modal opens
  useEffect(() => {
    if (orderId && open) {
      dispatch(fetchOrderById({ orderId }));
    }
  }, [orderId, open, dispatch]);

  // Set form values when order data loads
  useEffect(() => {
    if (order) {
      setComments(order?.comments || "");
      setStaffNotes(order?.staffNotes || "");
    }
  }, [order]);

  const handleSave = () => {
    const payload = {
      staff_notes: staffNotes,
      comments: comments,
    };
    dispatch(updateOrder({ id: orderId, data: payload }));
    handleClose();
  };

  // ✅ Enhanced close handler
  const handleClose = () => {
    // Reset form state
    setComments("");
    setStaffNotes("");
    
    // Close modal
    onClose();
    
    // ✅ Force remove any lingering overlays
    setTimeout(() => {
      document.body.style.pointerEvents = "";
      const overlay = document.querySelector('[data-radix-portal]');
      if (overlay) {
        overlay.remove();
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-3xl"
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Order Comments and Notes</DialogTitle>
        </DialogHeader>

        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 mb-4 text-lg rounded">
          Use the text boxes below to make notes on this order.
        </div>

        <div className="space-y-4">
          <div>
            <Label className="block mb-1">Order Comments</Label>
            <Textarea
              rows={5}
              placeholder="Type any comments about this order here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="h-[80px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              These will be visible on printed invoices.
            </p>
          </div>

          <div>
            <Label className="block mb-1">Staff Notes</Label>
            <Textarea
              rows={5}
              placeholder="Staff notes are internal and not visible to customers."
              value={staffNotes}
              className="h-[80px]"
              onChange={(e) => setStaffNotes(e.target.value)}
            />
            <p className="mt-1">Only visible in the store control panel.</p>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <Button variant="outline" onClick={handleClose} className="!text-lg !p-6">
            Cancel
          </Button>
          <Button onClick={handleSave} className="!text-lg !p-6">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}