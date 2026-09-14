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

  const order = singleOrder?.[0];

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

  // Enhanced close handler
  const handleClose = () => {
    // Reset form state
    setComments("");
    setStaffNotes("");

    // Close modal
    onClose();

    // Force remove any lingering overlays
    setTimeout(() => {
      document.body.style.pointerEvents = "";

      const overlay = document.querySelector("[data-radix-portal]");

      if (overlay) {
        overlay.remove();
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          !w-[calc(100%-24px)]
          !max-w-[600px]
           !max-h-[80vh]
          p-0
          gap-0
          overflow-y-auto
          rounded-none
          border-0
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          bg-white

          [&>button]:top-[17px]
          [&>button]:right-[18px]
          [&>button]:h-7
          [&>button]:w-7
          [&>button]:rounded-none
          [&>button]:text-white
          [&>button]:opacity-100
          [&>button]:hover:bg-transparent
          [&>button]:hover:text-white
          [&>button]:focus:ring-0
          [&>button]:focus:ring-offset-0
        "
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        {/* ================= HEADER ================= */}
        <DialogHeader
          className="
            h-[60px]
            min-h-[60px]
            px-[18px]
            flex
            flex-row
            items-center
            justify-start
            bg-[#302d3b]
            space-y-0
          "
        >
          <DialogTitle
            className="
              m-0
              p-0
              !text-white
              !text-[18px]
              !leading-[26px]
              !font-semibold
            "
          >
            Order Comments and Notes
          </DialogTitle>
        </DialogHeader>

        {/* ================= CONTENT ================= */}
        <div
          className="
            bg-white
            px-[39px]
            pt-[20px]
            pb-[20px]
           
            max-h-[calc(100vh-145px)]
          "
        >
          {/* Info Box */}
          <div
            className="
              min-h-[63px]
              flex
              items-center
              bg-[#e3f2fd]
              border-l-[10px]
              border-[#4d70ff]
              px-[21px]
              py-[12px]
              mb-[25px]
              shadow-[0_2px_7px_rgba(0,0,0,0.08)]
            "
          >
            <p
              className="
                m-0
                text-[16px]
                leading-[24px]
                text-[#34495e]
                font-normal
              "
            >
              Use the text boxes below to make notes on this order.
            </p>
          </div>

          <div className="space-y-[4px]">
            {/* ================= ORDER COMMENTS ================= */}
            <div>
              <Label
                className="
                  block
                  mb-[3px]
                  text-[14px]
                  leading-[18px]
                  font-semibold
                  text-[#18375d]
                "
              >
                Order Comments
              </Label>

              <Textarea
                rows={5}
                placeholder="Type any comments about this order here..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="
                  w-full
                  h-[165px]
                  min-h-[165px]
                  resize
                  rounded-none
                  border
                  border-[#c9c9c9]
                  bg-white
                  px-[11px]
                  py-[10px]
                  text-[16px]
                  leading-[22px]
                  text-[#26384d]
                  shadow-none
                  focus-visible:ring-0
                  focus-visible:ring-offset-0
                  focus:border-[#999]
                "
              />

              <p
                className="
                  mt-[5px]
                  mb-[0px]
                  text-[12px]
                  leading-[16px]
                  text-[#777]
                "
              >
                These will be visible on printed invoices.
              </p>
            </div>

            {/* ================= STAFF NOTES ================= */}
            <div className="mt-[3px]">
              <Label
                className="
                  block
                  mb-[3px]
                  text-[14px]
                  leading-[18px]
                  font-semibold
                  text-[#18375d]
                "
              >
                Staff Notes
              </Label>

              <Textarea
                rows={5}
                placeholder="Staff notes are internal and not visible to customers."
                value={staffNotes}
                className="
                  w-full
                  h-[203px]
                  min-h-[203px]
                  resize
                  rounded-none
                  border
                  border-[#c9c9c9]
                  bg-white
                  px-[11px]
                  py-[10px]
                  text-[16px]
                  leading-[22px]
                  text-[#26384d]
                  shadow-none
                  focus-visible:ring-0
                  focus-visible:ring-offset-0
                  focus:border-[#999]
                "
                onChange={(e) => setStaffNotes(e.target.value)}
              />

              <p
                className="
                  mt-[5px]
                  mb-0
                  text-[12px]
                  leading-[16px]
                  text-[#333]
                "
              >
                Only visible in the store control panel.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <DialogFooter
          className="
            h-[81px]
            min-h-[81px]
            px-[18px]
            py-0
            flex
            flex-row
            items-center
            justify-end
            gap-0
            bg-[#f5f6f8]
            border-t
            border-[#e1e4e8]
            sm:justify-end
          "
        >
          <Button
            variant="ghost"
            onClick={handleClose}
            className="
              h-[42px]
              min-w-[82px]
              mr-[14px]
              rounded-none
              bg-transparent
              px-[14px]
              text-[16px]
              font-normal
              text-[#526dff]
              shadow-none
              hover:bg-transparent
              hover:text-[#526dff]
            "
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="
              h-[42px]
              min-w-[112px]
              rounded-none
              bg-[#4d70ff]
              px-[22px]
              text-[16px]
              font-normal
              text-white
              shadow-none
              hover:bg-[#4164f5]
            "
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}