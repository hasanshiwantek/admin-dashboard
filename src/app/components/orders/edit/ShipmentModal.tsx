"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown, X } from "lucide-react";

export function ShipmentModal({
  order,
  open,
  onClose,
  onSubmit,
}: {
  order: any;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  // Initialize product quantities from order
  const [productQuantities, setProductQuantities] = useState<any>(
    order?.products?.reduce((acc: any, product: any, index: number) => {
      acc[index] = product.quantity || 1;
      return acc;
    }, {}) || {},
  );

  const [weightLbs, setWeightLbs] = useState(12);
  const [weightOz, setWeightOz] = useState(0);
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [depth, setDepth] = useState("0");

  const [packingSlipNotes, setPackingSlipNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Other");
  const [trackingCarrier, setTrackingCarrier] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [carrierDropdownOpen, setCarrierDropdownOpen] = useState(false);
  const [shippingMethodDescription, setShippingMethodDescription] =
    useState("");
  const [updateStatusAndNotify, setUpdateStatusAndNotify] = useState(true);

  console.log("Selected Order: ", order);

  // Calculate total left to ship
  const totalLeftToShip =
    order?.products?.reduce((total: number, product: any, index: number) => {
      return total + (productQuantities[index] || 0);
    }, 0) || 0;

  const handleQuantityChange = (index: number, value: number) => {
    setProductQuantities((prev: any) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      orderId: order?.id,

      products: order?.products?.map((product: any, index: number) => ({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        quantity: productQuantities[index] || 0,
      })),

      weight: {
        lbs: weightLbs,
        oz: weightOz,
      },

      dimensions: {
        width: parseFloat(width) || 0,
        height: parseFloat(height) || 0,
        depth: parseFloat(depth) || 0,
      },

      trackingId: trackingId,
      trackingCarrier: trackingCarrier,
      shippedBy: shippingMethod,
      shippingMethod: shippingMethodDescription,
      dateShipped: new Date().toISOString().split("T")[0],
      packingSlipNotes: packingSlipNotes,
      updateStatusAndNotify: updateStatusAndNotify,

      shipTo: {
        name: `${order?.billingInformation?.firstName || ""} ${
          order?.billingInformation?.lastName || ""
        }`,
        company: order?.billingInformation?.company || "",
        addressLine1: order?.billingInformation?.addressLine1 || "",
        addressLine2: order?.billingInformation?.addressLine2 || "",
        city: order?.billingInformation?.city || "",
        state: order?.billingInformation?.state || "",
        country: order?.billingInformation?.country || "",
        postalCode: order?.billingInformation?.postalCode || "",
      },
    };

    onSubmit(payload);
    onClose();
  };

  useEffect(() => {
    if (order?.billingInformation?.shippingData) {
      setShippingMethodDescription(order.billingInformation.shippingData);
    }
  }, [order?.billingInformation?.shippingData]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogTrigger asChild>
        <Button variant="outline">Create shipment</Button>
      </DialogTrigger>

      <DialogContent
        className="
    !w-[calc(100vw-16px)]
    !max-w-[1290px]
    !h-[calc(100vh-16px)]
    !max-h-[720px]
    p-0
    gap-0
    overflow-hidden
    rounded-[4px]
    border-0
    shadow-2xl
    [&>button]:hidden
  "
      >
        <DialogHeader
          className="
            relative
            h-[60px]
            min-h-[60px]
            px-[18px]
            flex
            flex-row
            items-center
            justify-between
            bg-[#29283A]
            border-0
          "
        >
          <DialogTitle
            className="
              text-[22px]
              leading-none
              font-normal
              !text-white
              tracking-[-0.2px]
            "
          >
            Create a shipment
          </DialogTitle>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              absolute
              right-[22px]
              top-1/2
              -translate-y-1/2
              w-[32px]
              h-[32px]
              flex
              items-center
              justify-center
              text-[#b9b9c1]
              hover:text-white
              transition-colors
            "
          >
            <X size={31} strokeWidth={1.7} />
          </button>
        </DialogHeader>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}
        <div
          className="
            flex
            flex-1
            min-h-0
            overflow-hidden
          "
        >
          {/* =======================================================
              LEFT COLUMN
          ======================================================= */}
          <div
            className="
    w-1/2
    min-w-0
    bg-[#f5f6f8]
    border-r
    border-[#e1e1e1]
    px-[22px]
    pt-[27px]
    pb-[24px]
    overflow-y-auto
    overflow-x-hidden
  "
          >
            {/* -----------------------------------------------------
                QUANTITY + LEFT TO SHIP
            ----------------------------------------------------- */}
            <div
              className="
                grid
                grid-cols-[1fr_auto]
                items-start
                pb-[34px]
                border-b
                border-[#d7d7d7]
              "
            >
              {/* Quantity */}
              <div>
                <Label
                  className="
                    block
                    text-[16px]
                    font-normal
                    text-[#202b4c]
                    mb-[27px]
                  "
                >
                  Quantity to ship
                </Label>

                {order?.products?.map((product: any, index: number) => (
                  <div
                    key={product.id || index}
                    className="
                        flex
                        items-center
                        gap-[33px]
                      "
                  >
                    <Input
                      type="number"
                      value={productQuantities[index] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      min={0}
                      max={product.quantity}
                      className="
                          w-[67px]
                          h-[50px]
                          rounded-[2px]
                          border-[#d4d7dc]
                          bg-white
                          px-3
                          text-center
                          text-[15px]
                          text-[#26314e]
                          shadow-none
                          focus-visible:ring-1
                          focus-visible:ring-[#4c6fff]
                        "
                    />

                    <p
                      className="
                          text-[15px]
                          font-normal
                          text-[#26314e]
                          leading-none
                        "
                    >
                      {product.sku} - {product.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Left to ship */}
              <div
                className="
                  flex
                  flex-col
                  items-end
                  pr-[4px]
                "
              >
                <Label
                  className="
                    text-[16px]
                    font-normal
                    text-[#202b4c]
                    mb-[27px]
                  "
                >
                  Left to ship
                </Label>

                <div
                  className="
                    text-[16px]
                    font-normal
                    text-[#111827]
                    pr-[5px]
                  "
                >
                  {totalLeftToShip}
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                PACKAGE WEIGHT
            ----------------------------------------------------- */}
          <div className="grid grid-cols-[173px_1fr] items-start mb-4 mt-3">
  <Label
    className="
      text-[16px]
      font-normal
      leading-[20px]
      text-[#202b4c]
      text-right
      pr-[26px]
      pt-[3px]
    "
  >
    Package weight
  </Label>

  <div className="flex items-center gap-[9px]">
    <Input
      type="number"
      value={weightLbs}
      onChange={(e) => setWeightLbs(Number(e.target.value))}
      className="
        w-[62px]
        h-[40px]
        text-center
        text-[15px]
        font-semibold
      "
    />

    <span className="text-[14px] font-semibold text-[#5c6372]">
      lbs
    </span>

    <Input
      type="number"
      value={weightOz}
      onChange={(e) => setWeightOz(Number(e.target.value))}
      className="
        w-[62px]
        h-[40px]
        text-center
        text-[15px]
        font-semibold
      "
    />

    <span className="text-[14px] font-semibold text-[#5c6372]">
      oz
    </span>
  </div>
</div>

            {/* -----------------------------------------------------
                DIMENSIONS
            ----------------------------------------------------- */}
            <div
              className="
                grid
                grid-cols-[150px_1fr]
                items-start
                pb-[46px]
              "
            >
              <Label
                className="
                  text-[16px]
                  font-normal
                  leading-[20px]
                  text-[#202b4c]
                  text-right
                  pr-[26px]
                  pt-[3px]
                "
              >
                Dimensions
                <br />
                (Centimeters)
              </Label>

              <div className="flex items-center gap-[15px] min-w-0">
                {/* Width */}
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="
                      w-[55px]
                      h-[50px]
                      rounded-l-[2px]
                      rounded-r-none
                      border-r-0
                      border-[#d4d7dc]
                      bg-white
                      text-center
                      text-[15px]
                      shadow-none
                      focus-visible:ring-0
                    "
                  />

                  <div
                    className="
                      h-[50px]
                      w-[78px]
                      flex
                      items-center
                      justify-center
                      bg-[#f4f5f7]
                      border
                      border-[#d4d7dc]
                      rounded-r-[2px]
                      text-[15px]
                      text-[#26314e]
                    "
                  >
                    Width
                  </div>
                </div>

                {/* Height */}
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="
                      w-[62px]
                      h-[50px]
                      rounded-l-[2px]
                      rounded-r-none
                      border-r-0
                      border-[#d4d7dc]
                      bg-white
                      text-center
                      text-[15px]
                      shadow-none
                      focus-visible:ring-0
                    "
                  />

                  <div
                    className="
                      h-[50px]
                      w-[78px]
                      flex
                      items-center
                      justify-center
                      bg-[#f4f5f7]
                      border
                      border-[#d4d7dc]
                      rounded-r-[2px]
                      text-[15px]
                      text-[#26314e]
                    "
                  >
                    Height
                  </div>
                </div>

                {/* Depth */}
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="
                      w-[62px]
                      h-[50px]
                      rounded-l-[2px]
                      rounded-r-none
                      border-r-0
                      border-[#d4d7dc]
                      bg-white
                      text-center
                      text-[15px]
                      shadow-none
                      focus-visible:ring-0
                    "
                  />

                  <div
                    className="
                      h-[50px]
                      w-[78px]
                      flex
                      items-center
                      justify-center
                      bg-[#f4f5f7]
                      border
                      border-[#d4d7dc]
                      rounded-r-[2px]
                      text-[15px]
                      text-[#26314e]
                    "
                  >
                    Depth
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                SHIPPING TO
            ----------------------------------------------------- */}
            <div
              className="
                grid
                grid-cols-[173px_1fr]
                items-start
                pb-[35px]
                border-b
                border-[#d7d7d7]
              "
            >
              <Label
                className="
                  text-[16px]
                  font-normal
                  text-[#202b4c]
                  text-right
                  pr-[26px]
                  pt-[2px]
                "
              >
                Shipping to
              </Label>

              <div
                className="
                  text-[16px]
                  text-[#24304e]
                  leading-[25px]
                  min-w-0
                "
              >
                <div className="font-semibold">
                  {order?.billingInformation?.firstName || ""}{" "}
                  {order?.billingInformation?.lastName || ""}
                </div>

                {order?.billingInformation?.company && (
                  <div>{order.billingInformation.company}</div>
                )}

                {order?.billingInformation?.addressLine1 && (
                  <div>{order.billingInformation.addressLine1}</div>
                )}

                {order?.billingInformation?.addressLine2 && (
                  <div>{order.billingInformation.addressLine2}</div>
                )}

                <div>
                  {order?.billingInformation?.city || ""}
                  {order?.billingInformation?.city &&
                  order?.billingInformation?.state
                    ? ", "
                    : ""}
                  {order?.billingInformation?.state || ""}
                  {order?.billingInformation?.postalCode
                    ? `, ${order.billingInformation.postalCode}`
                    : ""}
                </div>

                <div>{order?.billingInformation?.country || ""}</div>
              </div>
            </div>

            {/* -----------------------------------------------------
                PACKING SLIP NOTES
            ----------------------------------------------------- */}
            <div
              className="
                grid
                grid-cols-[173px_1fr]
                items-start
                pt-[25px]
              "
            >
              <Label
                className="
                  text-[16px]
                  font-normal
                  text-[#202b4c]
                  text-right
                  pr-[26px]
                  pt-[4px]
                "
              >
                Packing Slip Notes
              </Label>

              <Textarea
                placeholder="Enter your notes"
                value={packingSlipNotes}
                onChange={(e) => setPackingSlipNotes(e.target.value)}
                className="
                  w-[326px]
                  h-[124px]
                  min-h-[124px]
                  resize-none
                  rounded-[2px]
                  border-[#d4d7dc]
                  bg-white
                  px-[11px]
                  py-[10px]
                  text-[15px]
                  text-[#26314e]
                  shadow-none
                  focus-visible:ring-1
                  focus-visible:ring-[#4c6fff]
                "
              />
            </div>
          </div>

          {/* =======================================================
              RIGHT COLUMN
          ======================================================= */}
          <div
            className="
    w-1/2
    min-w-0
    bg-white
    px-[24px]
    pt-[27px]
    pb-[24px]
    flex
    flex-col
    overflow-y-auto
    overflow-x-hidden
  "
          >
            {/* -----------------------------------------------------
                CUSTOMER PAID
            ----------------------------------------------------- */}
            <div
              className="
                pb-[27px]
                border-b
                border-[#d7d7d7]
              "
            >
              <div
                className="
                  text-[16px]
                  font-normal
                  text-[#292d3c]
                "
              >
                Customer paid{" "}
                <span className="font-semibold">
                  ${parseFloat(order?.shippingCost || "0").toFixed(2)}
                </span>{" "}
                for shipping
              </div>
            </div>

            {/* -----------------------------------------------------
                HOW WOULD YOU LIKE TO SHIP
            ----------------------------------------------------- */}
            <div className="pt-[27px]">
              <Label
                className="
                  block
                  text-[16px]
                  font-normal
                  text-[#343746]
                  mb-[19px]
                "
              >
                How would you like to ship?
              </Label>

              <Select value={shippingMethod} onValueChange={setShippingMethod}>
                <SelectTrigger
                  className="
                    w-[445px]
                    max-w-full
                    h-[43px]
                    rounded-[2px]
                    border-[#cfd2d8]
                    bg-white
                    px-[12px]
                    text-[15px]
                    text-[#343746]
                    shadow-none
                    focus:ring-0
                  "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Other">Other</SelectItem>

                  <SelectItem value="USPS Priority Mail">
                    Print a USPS Priority Mail International Label
                  </SelectItem>

                  <SelectItem value="3-5 days Express — Flat Rate Envelope">
                    3-5 days Express — Flat Rate Envelope
                  </SelectItem>

                  <SelectItem value="3-5 days Express — Flat Rate Legal Envelope">
                    3-5 days Express — Flat Rate Legal Envelope
                  </SelectItem>

                  <SelectItem value="3-5 days Express — Flat Rate Padded Envelope">
                    3-5 days Express — Flat Rate Padded Envelope
                  </SelectItem>

                  <SelectItem value="3-5 days Express — Parcel">
                    3-5 days Express — Parcel
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Envelope">
                    6-10 days — Flat Rate Envelope
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Legal Envelope">
                    6-10 days — Flat Rate Legal Envelope
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Padded Envelope">
                    6-10 days — Flat Rate Padded Envelope
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Box Small">
                    6-10 days — Flat Rate Box Small
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Box Medium">
                    6-10 days — Flat Rate Box Medium
                  </SelectItem>

                  <SelectItem value="6-10 days — Flat Rate Box Large">
                    6-10 days — Flat Rate Box Large
                  </SelectItem>

                  <SelectItem value="6-10 days — Parcel">
                    6-10 days — Parcel
                  </SelectItem>

                  <SelectItem value="USPS International Label (Misc)">
                    Print a USPS International Label (Misc)
                  </SelectItem>

                  <SelectItem value="First Class Package / Parcel International">
                    First Class Package / Parcel International
                  </SelectItem>

                  <SelectItem value="FedEx">FedEx</SelectItem>

                  <SelectItem value="UPS">UPS®</SelectItem>

                  <SelectItem value="USPS Other">USPS Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* -----------------------------------------------------
                OTHER TRACKING CARRIER
            ----------------------------------------------------- */}
            {shippingMethod === "Other" && (
        <div className="pt-[31px]">
  <Label
    className="
      block
      text-[16px]
      font-normal
      text-[#343746]
      mb-[20px]
    "
  >
    Other Tracking Carrier options
  </Label>

  <div className="relative w-[445px] max-w-full">
    {/* Input / Dropdown Trigger */}
    <div
      onClick={() =>
        setCarrierDropdownOpen((prev) => !prev)
      }
      className="
        relative
        w-full
        h-[36px]
        border
        border-[#cfd2d8]
        bg-white
        rounded-[2px]
        cursor-pointer
      "
    >
      <Input
        placeholder="Type to find a carrier..."
        value={trackingCarrier}
        onChange={(e) =>
          setTrackingCarrier(e.target.value)
        }
        onClick={(e) => {
          e.stopPropagation();
          setCarrierDropdownOpen(true);
        }}
        className="
          w-full
          h-full
          border-0
          rounded-[2px]
          bg-transparent
          pr-[32px]
          pl-[10px]
          text-[15px]
          text-[#343746]
          shadow-none
          placeholder:text-[#8d9099]
          focus-visible:ring-0
        "
      />

      {/* Arrow */}
      <div
        className="
          absolute
          right-0
          top-0
          h-[35px]
          w-[27px]
          flex
          items-center
          justify-center
          bg-[#eeeeee]
          border-l
          border-[#cfd2d8]
          rounded-r-[2px]
          pointer-events-none
        "
      >
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`
            text-[#777]
            transition-transform
            duration-200
            ${carrierDropdownOpen ? "rotate-180" : ""}
          `}
        />
      </div>
    </div>

    {/* Empty Dropdown */}
    {carrierDropdownOpen && (
      <div
        className="
          absolute
          left-0
          top-[36px]
          z-50
          w-full
          h-[120px]
          bg-white
          border
          border-[#4c6fff]
          rounded-b-[2px]
          shadow-md
        "
      />
    )}
  </div>
</div>
            )}

            {/* -----------------------------------------------------
                TRACKING ID
            ----------------------------------------------------- */}
            <div className="pt-[31px]">
              <Label
                className="
                  block
                  text-[16px]
                  font-normal
                  text-[#343746]
                  mb-[20px]
                "
              >
                Tracking ID
              </Label>

              <Input
                placeholder="Enter tracking number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="
                  w-[445px]
                  max-w-full
                  h-[43px]
                  rounded-[2px]
                  border-[#cfd2d8]
                  bg-white
                  px-[10px]
                  text-[15px]
                  text-[#343746]
                  shadow-none
                  placeholder:text-[#999da6]
                  focus-visible:ring-1
                  focus-visible:ring-[#4c6fff]
                "
              />
            </div>

            {/* -----------------------------------------------------
                SHIPPING METHOD DESCRIPTION
            ----------------------------------------------------- */}
            <div className="pt-[31px]">
              <Label
                className="
                  block
                  text-[16px]
                  font-normal
                  text-[#343746]
                  mb-[20px]
                "
              >
                Shipping Method Description
              </Label>

              <Input
                value={shippingMethodDescription}
                onChange={(e) => setShippingMethodDescription(e.target.value)}
                className="
                  w-[445px]
                  max-w-full
                  h-[43px]
                  rounded-[2px]
                  border-[#cfd2d8]
                  bg-white
                  px-[10px]
                  text-[15px]
                  text-[#343746]
                  shadow-none
                  focus-visible:ring-1
                  focus-visible:ring-[#4c6fff]
                "
              />
            </div>

            {/* -----------------------------------------------------
                CHECKBOX
            ----------------------------------------------------- */}
            <div
              className="
                flex
                items-start
                gap-[14px]
                pt-[29px]
              "
            >
              <Checkbox
                checked={updateStatusAndNotify}
                onCheckedChange={(checked) =>
                  setUpdateStatusAndNotify(checked as boolean)
                }
                id="status-update"
                className="
                  mt-[1px]
                  h-[30px]
                  w-[30px]
                  rounded-[3px]
                  border-[#4c6fff]
                  data-[state=checked]:bg-[#4c6fff]
                  data-[state=checked]:border-[#4c6fff]
                  shrink-0
                "
              />

              <div className="pt-[1px]">
                <Label
                  htmlFor="status-update"
                  className="
                    block
                    font-normal
                    cursor-pointer
                    text-[16px]
                    leading-[24px]
                    text-[#343746]
                  "
                >
                  Update the order status to Shipped, and notify the customer
                  via email.
                </Label>

                <button
                  type="button"
                  className="
                    block
                    mt-[2px]
                    text-[16px]
                    leading-[23px]
                    text-[#5275ff]
                    hover:underline
                  "
                >
                  Order status email settings
                </button>
              </div>
            </div>

            {/* Push footer to bottom */}
            <div className="flex-1 min-h-[20px]" />

            {/* -----------------------------------------------------
                FOOTER SEPARATOR
            ----------------------------------------------------- */}
            <div
              className="
                border-t
                border-[#d7d7d7]
                pt-[25px]
              "
            >
              {/* Buttons */}
              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-[27px]
                "
              >
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="
                    h-[41px]
                    px-[0px]
                    min-w-[51px]
                    rounded-[2px]
                    text-[16px]
                    font-normal
                    text-[#5275ff]
                    hover:bg-transparent
                    hover:text-[#3f63eb]
                  "
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="
                    h-[41px]
                    w-[196px]
                    rounded-[2px]
                    bg-[#4c6fff]
                    hover:bg-[#4265ec]
                    text-[16px]
                    font-medium
                    text-white
                    shadow-none
                  "
                >
                  Create shipment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            HIDDEN DEFAULT FOOTER
            We are using our own footer inside the right column
        ========================================================= */}
        <DialogFooter className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
