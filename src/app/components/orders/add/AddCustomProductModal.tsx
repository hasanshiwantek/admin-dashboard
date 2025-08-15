"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddCustomProductModal({
  onAdd,
}: {
  onAdd: (product: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [priceType, setPriceType] = useState("manual");
  const [price, setPrice] = useState("0.00");
  const [qty, setQty] = useState("1");

  const handleAdd = () => {
    if (!name || !price || !qty) return;
    const newProduct = {
      id: Date.now(), // simple unique ID
      name,
      sku,
      price,
      qty: parseInt(qty),
      image: [],
      isCustom: true,
    };
    onAdd(newProduct);
    setOpen(false); // Close modal
    setName("");
    setSku("");
    setPrice("0.00");
    setQty("1");
    setPriceType("manual");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Add a custom product</Button> */}
        <button className="!text-blue-600 my-2 whitespace-nowrap hover:border-b text-xl">
          Add a custom product
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md !max-w-2xl ">
        <DialogHeader>
          <DialogTitle>Customize</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="!max-w-full" />
          </div>

          <div>
            <Label>SKU</Label>
            <Input value={sku} onChange={(e) => setSku(e.target.value)} className="!max-w-full"/>
          </div>

          <div className="space-y-2">
            <Label>Item price</Label>
            <RadioGroup
              value={priceType}
              onValueChange={setPriceType}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="store" id="store" />
                <Label htmlFor="store">Use current store pricing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">
                  Manually set the price for this item
                </Label>
              </div>
            </RadioGroup>

            {priceType === "manual" && (
              <div className="flex items-center gap-2">
                <span>£</span>
                <Input
                  type="number"
                  value={price}
                  min="0"
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-32"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQty(e.target.value)}
              className="w-32"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)} className="p-5 text-lg">
            Close
          </Button>
          <Button onClick={handleAdd} className="p-5 text-lg">Add item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
