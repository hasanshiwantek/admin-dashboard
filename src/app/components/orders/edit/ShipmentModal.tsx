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
  // State for all dynamic form fields
  const [quantity, setQuantity] = useState(5);
  const [weightLbs, setWeightLbs] = useState(5);
  const [weightOz, setWeightOz] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [packingSlipNotes, setPackingSlipNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState("other");
  const [trackingCarrier, setTrackingCarrier] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [shippingMethodDescription, setShippingMethodDescription] =
    useState("Free Shipping");
  const [updateStatusAndNotify, setUpdateStatusAndNotify] = useState(true);

  console.log("Selected Order: ", order);

  const handleSubmit = () => {
    const payload = {
      orderId: order?.id,
      quantity: quantity,
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
      dateShipped: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      packingSlipNotes: packingSlipNotes,
      updateStatusAndNotify: updateStatusAndNotify,
      shipTo: {
        name: `${order.billingInformation.firstName} ${order.billingInformation.lastName}`,
        company: order.billingInformation.company || "",
        addressLine1: order.billingInformation.addressLine1 || "",
        addressLine2: order.billingInformation.addressLine2 || "",
        city: order.billingInformation.city || "",
        state: order.billingInformation.state || "",
        country: order.billingInformation.country || "",
        postalCode: order.billingInformation.postalCode || "",
      },
    };

    console.log("Shipment Payload:", payload);
    onSubmit(payload);
    onClose(); // Close the modal after submit
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogTrigger asChild>
        <Button variant="outline">Create shipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90rem]">
        <DialogHeader>
          <DialogTitle>
            <h2>Create a shipment</h2>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-6">
            <div>
              <Label>Quantity to ship</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="w-20"
                />
                <p className="text-sm text-muted-foreground">
                  LE180A - Black Box 10BASE-T to AUI RJ-45 Connector Transceiver
                  Module
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <Label>Package Weight</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={weightLbs}
                    onChange={(e) =>
                      setWeightLbs(parseFloat(e.target.value) || 0)
                    }
                    className="w-20"
                  />
                  <span>lbs</span>
                  <Input
                    type="number"
                    value={weightOz}
                    onChange={(e) =>
                      setWeightOz(parseFloat(e.target.value) || 0)
                    }
                    className="w-20"
                  />
                  <span>oz</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Dimensions (inches)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-30"
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-30"
                />
                <Input
                  type="number"
                  placeholder="Depth"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="w-30"
                />
              </div>
            </div>

            <div>
              <Label>Shipping to</Label>
              <p className="text-sm mt-1 leading-5">
                <strong>
                  {order.billingInformation.firstName}{" "}
                  {order.billingInformation.lastName}
                </strong>
                <br />
                {order.billingInformation.addressLine1 || "N/A"}
                <br />
                {order.billingInformation.addressLine2 || "N/A"}
                <br />
                {order.billingInformation.city || "N/A"} /{" "}
                {order.billingInformation.state || "N/A"}
                <br />
                {order.billingInformation.country || "N/A"}
              </p>
            </div>

            <div>
              <Label>Packing Slip Notes</Label>
              <Textarea
                placeholder="Enter your notes"
                className="h-[70px]"
                value={packingSlipNotes}
                onChange={(e) => setPackingSlipNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <p>
              Customer paid <strong>$10.00</strong> for shipping
            </p>

            <div>
              <Label>How would you like to ship?</Label>
              <Select value={shippingMethod} onValueChange={setShippingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="usps">USPS</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Other Tracking Carrier Options</Label>
              <Input
                placeholder="Type to find a carrier..."
                value={trackingCarrier}
                onChange={(e) => setTrackingCarrier(e.target.value)}
              />
            </div>

            <div>
              <Label>Tracking ID</Label>
              <Input
                placeholder="Enter tracking number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            <div>
              <Label>Shipping Method Description</Label>
              <Input
                value={shippingMethodDescription}
                onChange={(e) => setShippingMethodDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={updateStatusAndNotify}
                onCheckedChange={(checked) =>
                  setUpdateStatusAndNotify(checked as boolean)
                }
                id="status-update"
              />
              <Label htmlFor="status-update">
                Update status to Shipped & notify customer
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onClose}
            className="!p-6 !text-lg"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="!p-6 !text-lg">
            Create shipment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
