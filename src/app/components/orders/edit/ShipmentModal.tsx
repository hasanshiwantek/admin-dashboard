"use client";
import { useState } from "react";
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
    }, {}) || {}
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
  const [shippingMethodDescription, setShippingMethodDescription] = useState(
    "I will provide the shipping label/others (Mentions the detai)"
  );
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
      shippingMethod: shippingMethodDescription,
      dateShipped: new Date().toISOString().split("T")[0],
      packingSlipNotes: order?.staffNotes,
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

    console.log("Shipment Payload:", payload);
    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogTrigger asChild>
        <Button variant="outline">Create shipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            Create a shipment
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8 py-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Quantity to ship - Handle multiple products */}
            <div className="space-y-3">
              <Label className="font-medium">Quantity to ship</Label>
              {order?.products?.map((product: any, index: number) => (
                <div
                  key={product.id || index}
                  className="flex items-center gap-3"
                >
                  <Input
                    type="number"
                    value={productQuantities[index] || 0}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 0)
                    }
                    min={0}
                    max={product.quantity}
                    className="w-20 text-center"
                  />
                  <p className="text-gray-600 flex-1 text-sm">
                    {product.sku} - {product.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Package Weight */}
            <div className="space-y-2">
              <Label className="font-medium">Package weight</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={weightLbs}
                  onChange={(e) =>
                    setWeightLbs(parseFloat(e.target.value) || 0)
                  }
                  className="w-20 text-center"
                />
                <span className="text-sm">lbs</span>
                <Input
                  type="number"
                  value={weightOz}
                  onChange={(e) => setWeightOz(parseFloat(e.target.value) || 0)}
                  className="w-20 text-center"
                />
                <span className="text-sm">oz</span>
              </div>
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <Label className="font-medium">Dimensions (Inches)</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-20 text-center"
                />
                <span className="text-sm">Width</span>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-20 text-center"
                />
                <span className="text-sm">Height</span>
                <Input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="w-20 text-center"
                />
                <span className="text-sm">Depth</span>
              </div>
            </div>

            {/* Shipping to */}
            <div className="space-y-2">
              <Label className="font-medium">Shipping to</Label>
              <div className="text-xl text-gray-700 leading-relaxed">
                <div className="font-semibold">
                  {order?.billingInformation?.firstName || ""}{" "}
                  {order?.billingInformation?.lastName || ""}
                </div>
                {order?.billingInformation?.addressLine1 && (
                  <div>{order.billingInformation.addressLine1}</div>
                )}
                {order?.billingInformation?.addressLine2 && (
                  <div>{order.billingInformation.addressLine2}</div>
                )}
                <div>
                  {order?.billingInformation?.city || ""},{" "}
                  {order?.billingInformation?.postalCode || ""}
                </div>
                <div>{order?.billingInformation?.country || ""}</div>
              </div>
            </div>

            {/* Packing Slip Notes */}
            <div className="space-y-2">
              <Label className="font-medium">Packing Slip Notes</Label>
              <Textarea
                placeholder="Enter your notes"
                value={packingSlipNotes}
                onChange={(e) => setPackingSlipNotes(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Left to ship header */}
            <div className="text-center">
              <Label className="font-medium">Left to ship</Label>
              <div className="text-2xl font-semibold mt-1">
                {totalLeftToShip}
              </div>
            </div>

            {/* Customer paid info */}
            <div className="text-xl">
              Customer paid{" "}
              <span className="font-semibold">
                ${parseFloat(order?.shippingCost || "0").toFixed(2)}
              </span>{" "}
              for shipping
            </div>

            {/* How would you like to ship */}
            <div className="space-y-2">
              <Label className="font-medium">How would you like to ship?</Label>
              <Select value={shippingMethod} onValueChange={setShippingMethod}>
                <SelectTrigger className="w-full">
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

            {/* Other Tracking Carrier Options */}
            <div className="space-y-2">
              <Label className="font-medium">
                Other Tracking Carrier options
              </Label>
              <Input
                placeholder="Type to find a carrier..."
                value={trackingCarrier}
                onChange={(e) => setTrackingCarrier(e.target.value)}
              />
            </div>

            {/* Tracking ID */}
            <div className="space-y-2">
              <Label className="font-medium">Tracking ID</Label>
              <Input
                placeholder="Enter tracking number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            {/* Shipping Method Description */}
            <div className="space-y-2">
              <Label className="font-medium">Shipping Method Description</Label>
              <Input
                value={shippingMethodDescription}
                onChange={(e) => setShippingMethodDescription(e.target.value)}
              />
            </div>

            {/* Update status checkbox */}
            <div className="flex items-center gap-5 pt-2">
              <Checkbox
                checked={updateStatusAndNotify}
                onCheckedChange={(checked) =>
                  setUpdateStatusAndNotify(checked as boolean)
                }
                id="status-update"
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="status-update"
                  className="font-normal cursor-pointer leading-relaxed"
                >
                  Update the order status to Shipped, and notify the customer
                  via email.
                </Label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline block mt-1"
                >
                  Order status email settings
                </a>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className=" !p-5 !text-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="!p-5 !text-xl bg-blue-600 hover:bg-blue-700"
          >
            Create shipment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
