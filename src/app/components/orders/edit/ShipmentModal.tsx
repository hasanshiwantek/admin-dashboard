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
  const [trackingId, setTrackingId] = useState("");

  const handleSubmit = () => {
    const payload = {
      orderId: order?.id,
      quantity: 5,
      weight: { lbs: 5, oz: 0 },
      dimensions: { width: 0, height: 0, depth: 0 },
      trackingId,
      shippingMethod: "Free Shipping",
      shipTo: {
        name: "David Gold",
        company: "Vishay Newport Ltd",
        address:
          "Vishay Newport Ltd, Cardiff Road, Newport, NP10 8YJ, United Kingdom",
      },
    };
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
            <h2>
            Create a shipment
            </h2>
            </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-6">
            <div>
              <Label>Quantity to ship</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input defaultValue={5} className="w-16" />
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
                  <Input defaultValue={5} className="w-16" /> <span>lbs</span>
                  <Input defaultValue={0} className="w-16" /> <span>oz</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Dimensions (inches)</Label>
              <div className="flex gap-2">
                <Input placeholder="Width" className="w-30" />
                <Input placeholder="Height" className="w-30" />
                <Input placeholder="Depth" className="w-30" />
              </div>
            </div>

            <div>
              <Label>Shipping to</Label>
              <p className="text-sm mt-1 leading-5">
                <strong>David Gold</strong>
                <br />
                Vishay Newport Ltd
                <br />
                Cardiff Road
                <br />
                Newport, NP10 8YJ
                <br />
                United Kingdom
              </p>
            </div>

            <div>
              <Label>Packing Slip Notes</Label> 
              <Textarea placeholder="Enter your notes" className="h-[70px]" />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <p>
              Customer paid <strong>£0.00</strong> for shipping
            </p>

            <div>
              <Label>How would you like to ship?</Label>
              <Select defaultValue="other">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Other Tracking Carrier Options</Label>
              <Input placeholder="Type to find a carrier..." />
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
              <Input defaultValue="Free Shipping" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox defaultChecked id="status-update" />
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
